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
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace !important;
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
  .suggestion-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.25rem;
    cursor: pointer;
    outline: none;
  }
  .suggestion-item:hover, .suggestion-item.selected {
    background-color: rgb(59 130 246 / 0.1);
    color: rgb(59 130 246);
  }
  .suggestion-item .dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background-color: rgb(59 130 246);
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);


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

  // Reset selected suggestion index when suggestions appear
  useEffect(() => {
    if (showSuggestions) {
      setSelectedSuggestionIndex(0);
    }
  }, [showSuggestions]);

  // Handle suggestions when typing '<'
  const handleEditorChange = (newValue: string) => {
    const textarea = editorRef.current;
    if (textarea) {
      const position = textarea.selectionStart;
      const currentChar = newValue[position - 1];
      
      // Get cursor position for suggestions popup
      const textBeforeCursor = newValue.substring(0, position);
      const lines = textBeforeCursor.split('\n');
      const currentLineNumber = lines.length - 1;
      const currentLineStart = position - lines[currentLineNumber].length;
      
      const rect = textarea.getBoundingClientRect();
      const lineHeight = 20; // Approximate line height
      
      setCursorPosition({
        top: rect.top + (currentLineNumber * lineHeight),
        left: rect.left + ((position - currentLineStart) * 8) // Approximate character width
      });
      
      // Check if the last character typed was '<' and there are placeholders
      if (currentChar === '<' && placeholders.length > 0) {
        setShowSuggestions(true);
        setSelectedSuggestionIndex(0); // Reset selection when showing suggestions
      } else if (currentChar !== '<') {
        setShowSuggestions(false);
      }
    }
    onChange(newValue);
  };

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle undo/redo first
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

    // Handle suggestions navigation
    if (showSuggestions) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedSuggestionIndex((prev) => 
            prev < placeholders.length - 1 ? prev + 1 : 0
          );
          return; // Add return to prevent event propagation
        case 'ArrowUp':
          e.preventDefault();
          setSelectedSuggestionIndex((prev) => 
            prev > 0 ? prev - 1 : placeholders.length - 1
          );
          return; // Add return to prevent event propagation
        case 'Enter':
        case 'Tab':
          e.preventDefault();
          if (placeholders[selectedSuggestionIndex]) {
            handleInsertPlaceholder(placeholders[selectedSuggestionIndex].name);
          }
          return; // Add return to prevent event propagation
        case 'Escape':
          e.preventDefault();
          setShowSuggestions(false);
          return; // Add return to prevent event propagation
      }
    }
  };

  // Insert a placeholder at the current cursor position
  const handleInsertPlaceholder = (name: string) => {
    if (editorRef.current) {
      const textarea = editorRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Get the text before and after the cursor
      const textBefore = value.substring(0, Math.max(0, start - 1)); // Remove the triggering '<'
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
      
      setShowSuggestions(false);
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

  // Render suggestions list
  const renderSuggestions = () => {

    
    if (!showSuggestions || placeholders.length === 0) return null;

    return (
      <div 
        className="fixed z-50 w-64 bg-popover border rounded-md shadow-md overflow-hidden"
        style={{
          top: `${cursorPosition.top + 24}px`,
          left: `${cursorPosition.left}px`
        }}
      >
        <div className="py-1">
          {placeholders.map((placeholder, index) => (
            <div
              key={placeholder.id}
              className={`suggestion-item${index === selectedSuggestionIndex ? ' selected' : ''}`}
              onClick={() => handleInsertPlaceholder(placeholder.name)}
              onMouseEnter={() => setSelectedSuggestionIndex(index)}
              role="button"
              tabIndex={0}
            >
              <span className="dot" />
              {placeholder.name}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <aside className="w-full h-full flex flex-col bg-background/90">
      <div className="p-4 border-b border-border flex justify-between items-center">
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
                fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
                minHeight: '200px',
                width: '100%',
              }}
              className="min-h-[200px] text-base leading-relaxed resize-none border-0 shadow-none focus-visible:ring-0 w-full p-0"
              data-color-mode="light"
              data-gramm="false"
            />
            
            {/* Suggestions popover */}
            {renderSuggestions()}
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