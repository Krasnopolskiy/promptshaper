import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlusCircle, Undo, Redo } from 'lucide-react';
import { Placeholder } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useTheme } from '@/hooks/useTheme';

// Add custom styles for syntax highlighting
const editorStyles = `
  .w-tc-editor {
    background: transparent !important;
    font-variant-ligatures: none;
  }
  .w-tc-editor-text > div {
    font-family: inherit !important;
  }
  .w-tc-editor-text {
    color: inherit !important;
  }
  .w-tc-editor-preview {
    word-break: break-word !important;
  }
  .w-tc-editor-text span {
    color: inherit !important;
  }
  .w-tc-editor [data-placeholder] {
    font-weight: 500;
  }
`;

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholders: Placeholder[];
  onInsertPlaceholder?: (name: string, position: number) => number;
}

export function PromptEditor({ 
  value, 
  onChange, 
  placeholders,
  onInsertPlaceholder 
}: PromptEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isUndoRedo, setIsUndoRedo] = useState<boolean>(false);
  const { theme } = useTheme();

  // Add to history stack when value changes (except during undo/redo)
  useEffect(() => {
    if (!isUndoRedo && value !== historyStack[historyStack.length - 1 - historyIndex]) {
      const newStack = historyStack.slice(0, historyStack.length - historyIndex);
      setHistoryStack([...newStack, value]);
      setHistoryIndex(0);
    }
    setIsUndoRedo(false);
  }, [value]);

  // Add custom styles to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = editorStyles;
    document.head.appendChild(styleElement);
    
    // Add dynamic styles for each placeholder
    placeholders.forEach(placeholder => {
      const placeholderStyle = `
        .placeholder-${placeholder.id} {
          color: ${placeholder.color} !important;
          background-color: ${placeholder.color}10 !important;
          border: 1px solid ${placeholder.color}30;
          border-radius: 4px;
          padding: 2px 4px;
          margin: 0 1px;
          font-weight: 500;
        }
      `;
      styleElement.textContent += placeholderStyle;
    });
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [placeholders]);

  // Apply placeholder styling to the editor content
  useEffect(() => {
    const applyPlaceholderStyling = () => {
      const editorElements = document.querySelectorAll('.w-tc-editor-text');
      editorElements.forEach(editor => {
        // Find all spans that might contain placeholders
        const spans = editor.querySelectorAll('span');
        spans.forEach(span => {
          const text = span.textContent || '';
          // Check if this span contains a placeholder pattern <n>
          if (text.match(/<([\p{L}0-9]+)>/u)) {
            // Find which placeholder this is
            const placeholderName = text.replace(/[<>]/g, '');
            const placeholder = placeholders.find(p => p.name === placeholderName);
            if (placeholder) {
              // Apply the placeholder's color
              span.style.color = placeholder.color;
              span.style.backgroundColor = `${placeholder.color}10`;
              span.style.border = `1px solid ${placeholder.color}30`;
              span.style.borderRadius = '4px';
              span.style.padding = '2px 4px';
              span.style.margin = '0 1px';
              span.style.fontWeight = '500';
            }
          }
        });
      });
    };
    
    // Set up a MutationObserver to detect changes in the editor
    const observer = new MutationObserver(() => {
      setTimeout(applyPlaceholderStyling, 10);
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // Initial application
    setTimeout(applyPlaceholderStyling, 100);
    
    return () => {
      observer.disconnect();
    };
  }, [placeholders]);

  // Simple editor change handler
  const handleEditorChange = (newValue: string) => {
    // Check if a new placeholder was manually added
    const placeholderRegex = /<([\p{L}0-9]+)>/gu;
    const existingPlaceholderNames = new Set(placeholders.map(p => p.name));
    
    // Find all placeholders in the new text
    let match;
    const foundPlaceholders = new Set<string>();
    
    while ((match = placeholderRegex.exec(newValue)) !== null) {
      const placeholderName = match[1];
      foundPlaceholders.add(placeholderName);
      
      // If this placeholder doesn't exist yet, create it
      if (!existingPlaceholderNames.has(placeholderName) && onInsertPlaceholder) {
        // Create a new placeholder with empty content
        onInsertPlaceholder(placeholderName, match.index);
      }
    }
    
    // Check if any placeholders with empty content were removed
    if (value !== newValue) {
      const removedPlaceholders = [...existingPlaceholderNames].filter(name => 
        !foundPlaceholders.has(name) && 
        placeholders.find(p => p.name === name)?.content === ''
      );
      
      // If any empty placeholders were removed, notify parent component
      if (removedPlaceholders.length > 0 && onInsertPlaceholder) {
        // We use onInsertPlaceholder as a way to communicate with the parent component
        // The parent component can check if the placeholder exists and remove it if needed
        removedPlaceholders.forEach(name => {
          onInsertPlaceholder(name, -1); // Use -1 as a signal that the placeholder was removed
        });
      }
    }
    
    onChange(newValue);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle undo/redo
    if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      handleUndo();
      return;
    } 
    
    if ((e.ctrlKey && e.shiftKey && e.key === 'z') || (e.ctrlKey && e.key === 'y')) {
      e.preventDefault();
      handleRedo();
      return;
    }
  };

  // Insert a placeholder at the current cursor position
  const handleInsertPlaceholder = (name: string) => {
    if (editorRef.current) {
      const textarea = editorRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Get the text before and after the cursor
      const textBefore = value.substring(0, start);
      const textAfter = value.substring(end);
      
      // Create the new text with the placeholder
      const tag = '<' + name + '>';
      const newValue = textBefore + tag + textAfter;
      
      // Calculate new cursor position (after the inserted tag)
      const newPosition = textBefore.length + tag.length;
      
      // Update the value
      onChange(newValue);
      
      // Set cursor position after the tag
      requestAnimationFrame(() => {
        if (editorRef.current) {
          editorRef.current.focus();
          editorRef.current.setSelectionRange(newPosition, newPosition);
        }
      });
      
      // Notify parent component if callback provided
      if (onInsertPlaceholder) {
        onInsertPlaceholder(name, textBefore.length);
      }
    }
  };

  // Undo the last change
  const handleUndo = () => {
    if (historyIndex < historyStack.length - 1) {
      setIsUndoRedo(true);
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onChange(historyStack[historyStack.length - 1 - newIndex]);
    }
  };

  // Redo the last undone change
  const handleRedo = () => {
    if (historyIndex > 0) {
      setIsUndoRedo(true);
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onChange(historyStack[historyStack.length - 1 - newIndex]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <style>{editorStyles}</style>
      
      <div className="flex items-center gap-2 p-2 border-b border-border/50">
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={handleUndo} 
          disabled={historyIndex >= historyStack.length - 1}
          className="text-sm gap-1.5"
        >
          <Undo size={14} />
          Undo
        </Button>
        
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={handleRedo} 
          disabled={historyIndex <= 0}
          className="text-sm gap-1.5"
        >
          <Redo size={14} />
          Redo
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-sm gap-1.5"
            >
              <PlusCircle size={14} />
              Insert
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="end">
            {placeholders.length > 0 ? (
              <div className="grid gap-1">
                {placeholders.map((placeholder) => (
                  <Button
                    key={placeholder.id}
                    variant="ghost"
                    size="sm"
                    className="justify-start font-normal"
                    onClick={() => handleInsertPlaceholder(placeholder.name)}
                  >
                    <span 
                      className="mr-2 h-2 w-2 rounded-full"
                      style={{ backgroundColor: placeholder.color }}
                    />
                    {placeholder.name}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-2 text-sm text-muted-foreground">
                No placeholders available
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <CodeEditor
            value={value}
            language="text"
            placeholder="Write your prompt here..."
            onChange={(e) => handleEditorChange(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={editorRef as any}
            style={{
              fontSize: "14px",
              fontFamily: "inherit",
              minHeight: "200px",
            }}
            className="w-full"
            data-color-mode={theme}
          />
        </div>
      </ScrollArea>
    </div>
  );
}