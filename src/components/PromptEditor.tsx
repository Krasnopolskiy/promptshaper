import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlusCircle, Undo, Redo } from 'lucide-react';
import { Placeholder } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import CodeEditor from '@uiw/react-textarea-code-editor';

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
  .placeholder-tag {
    color: rgb(59 130 246) !important;
    font-weight: 500;
  }
  .w-tc-editor [data-placeholder] {
    color: rgb(59 130 246) !important;
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
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Simple editor change handler
  const handleEditorChange = (newValue: string) => {
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
    <aside className="w-full h-full flex flex-col bg-background/90">
      <div className="p-4 border-b border-border flex flex-col gap-2">
        <div>
          <h2 className="text-lg font-medium">Editor</h2>
          <p className="text-sm text-muted-foreground">
            Create and edit your prompt template
          </p>
        </div>
        
        <div className="flex items-center gap-2">
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
                      <span className="w-2 h-2 rounded-full mr-2 bg-blue-500" />
                      {placeholder.name}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground p-2 text-center">
                  No placeholders available yet
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <ScrollArea className="flex-1 relative">
        <div className="p-4">
          <div className="relative min-h-[200px]">
            <CodeEditor
              value={value}
              language="markdown"
              placeholder="Enter your prompt here..."
              onChange={(e) => handleEditorChange(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={editorRef}
              padding={0}
              style={{
                fontSize: 14,
                backgroundColor: 'transparent',
                fontFamily: 'inherit',
                minHeight: '200px',
                width: '100%',
              }}
              className="min-h-[200px] text-base leading-relaxed resize-none border-0 shadow-none focus-visible:ring-0 w-full p-0"
              data-color-mode="light"
              data-gramm="false"
            />
          </div>
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t border-border text-xs text-muted-foreground flex justify-between items-center">
        <div>
          {value.length} characters
        </div>
        <div>
          ~{Math.ceil(value.length / 4)} tokens
        </div>
      </div>
    </aside>
  );
}