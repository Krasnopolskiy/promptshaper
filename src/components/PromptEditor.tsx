
import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
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
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  useEffect(() => {
    // Auto-resize the textarea based on content
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleSelectionChange = () => {
    if (textareaRef.current) {
      setCursorPosition(textareaRef.current.selectionStart);
    }
  };

  const handleInsertPlaceholder = (name: string) => {
    if (onInsertPlaceholder && textareaRef.current) {
      const newPosition = onInsertPlaceholder(name, cursorPosition);
      
      // Focus and set cursor position after insertion
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(newPosition, newPosition);
          setCursorPosition(newPosition);
        }
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Prompt Editor</h2>
          <p className="text-sm text-muted-foreground">
            Write your main prompt text here
          </p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline" className="gap-1">
              <PlusCircle size={16} />
              Insert Placeholder
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="end">
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Available Placeholders</h3>
              {placeholders.length > 0 ? (
                <div className="max-h-[200px] overflow-y-auto">
                  {placeholders.map((placeholder) => (
                    <Button
                      key={placeholder.id}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left"
                      onClick={() => handleInsertPlaceholder(placeholder.name)}
                    >
                      <span className="text-xs font-mono text-primary">{`<${placeholder.name}>`}</span>
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  No placeholders available. Create one first.
                </p>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onSelect={handleSelectionChange}
          onClick={handleSelectionChange}
          placeholder="Enter your prompt here..."
          className="min-h-[200px] text-base resize-none border-0 shadow-none focus-visible:ring-0 bg-transparent p-0"
        />
      </ScrollArea>
      
      <div className="p-3 border-t border-border text-xs text-muted-foreground flex justify-between items-center">
        <div>
          {value.length} characters
        </div>
        <div>
          ~{Math.ceil(value.length / 4)} tokens
        </div>
      </div>
    </div>
  );
}
