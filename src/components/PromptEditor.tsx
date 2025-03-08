import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusCircle, Undo, Redo } from 'lucide-react';
import { Placeholder } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isUndoRedo, setIsUndoRedo] = useState<boolean>(false);

  // Add to history stack when value changes (except during undo/redo)
  useEffect(() => {
    if (!isUndoRedo && value !== historyStack[historyStack.length - 1 - historyIndex]) {
      // If we're in the middle of the history, truncate the future history
      const newStack = historyStack.slice(0, historyStack.length - historyIndex);
      setHistoryStack([...newStack, value]);
      setHistoryIndex(0);
    }
    setIsUndoRedo(false);
  }, [value]);

  // Insert a placeholder at the current cursor position
  const handleInsertPlaceholder = (name: string) => {
    if (textareaRef.current) {
      const position = textareaRef.current.selectionStart;
      const tag = `<${name}>`;
      
      // Use the callback if provided, otherwise insert directly
      if (onInsertPlaceholder) {
        const newPosition = onInsertPlaceholder(name, position);
        // Focus and set cursor position after the inserted tag
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(newPosition, newPosition);
          }
        }, 0);
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

  // Handle keyboard shortcuts
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Z for undo
    if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      handleUndo();
    }
    
    // Ctrl+Shift+Z or Ctrl+Y for redo
    if ((e.ctrlKey && e.shiftKey && e.key === 'z') || (e.ctrlKey && e.key === 'y')) {
      e.preventDefault();
      handleRedo();
    }
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
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="relative min-h-[200px]">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your prompt here..."
              className="min-h-[200px] text-base leading-relaxed resize-none border-0 shadow-none focus-visible:ring-0 w-full p-0 font-mono"
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
