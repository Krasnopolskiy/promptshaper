
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
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [formattedContent, setFormattedContent] = useState<string>('');
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isUndoRedo, setIsUndoRedo] = useState<boolean>(false);

  // Generate a unique color for each placeholder even within the same category
  const getPlaceholderColor = (placeholder: Placeholder) => {
    // Base colors per category
    const categoryBaseColors: Record<string, string[]> = {
      'style': ['bg-blue-100 text-blue-800 border-blue-200', 'bg-indigo-100 text-indigo-800 border-indigo-200'],
      'tone': ['bg-purple-100 text-purple-800 border-purple-200', 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200'],
      'format': ['bg-green-100 text-green-800 border-green-200', 'bg-emerald-100 text-emerald-800 border-emerald-200'],
      'terminology': ['bg-amber-100 text-amber-800 border-amber-200', 'bg-orange-100 text-orange-800 border-orange-200'],
      'other': ['bg-gray-100 text-gray-800 border-gray-200', 'bg-slate-100 text-slate-800 border-slate-200']
    };
    
    // Use placeholder ID to determine which color variation to use
    const colorSet = categoryBaseColors[placeholder.category] || categoryBaseColors.other;
    const colorIndex = placeholder.id.charCodeAt(0) % colorSet.length;
    return colorSet[colorIndex];
  };

  // Update the formatted display with highlighted placeholders
  useEffect(() => {
    let formatted = value;
    
    // Sort placeholders by name length (descending) to ensure longer names are replaced first
    const sortedPlaceholders = [...placeholders].sort(
      (a, b) => b.name.length - a.name.length
    );
    
    // Replace placeholder tags with highlighted spans
    sortedPlaceholders.forEach(placeholder => {
      const pattern = new RegExp(`<${placeholder.name}>`, 'g');
      const colorClasses = getPlaceholderColor(placeholder);
      formatted = formatted.replace(pattern, 
        `<span class="placeholder-tag ${colorClasses}" data-placeholder-id="${placeholder.id}">&lt;${placeholder.name}&gt;</span>`
      );
    });
    
    setFormattedContent(formatted);
  }, [value, placeholders]);

  // Handle history stack for undo/redo
  useEffect(() => {
    if (isUndoRedo) {
      setIsUndoRedo(false);
      return;
    }
    
    if (value && (historyStack.length === 0 || value !== historyStack[historyIndex])) {
      const newStack = historyStack.slice(0, historyIndex + 1);
      newStack.push(value);
      setHistoryStack(newStack);
      setHistoryIndex(newStack.length - 1);
    }
  }, [value]);

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
      const position = textareaRef.current.selectionStart;
      const newPosition = onInsertPlaceholder(name, position);
      
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

  const handleUndo = () => {
    if (historyIndex > 0) {
      setIsUndoRedo(true);
      setHistoryIndex(historyIndex - 1);
      onChange(historyStack[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      setIsUndoRedo(true);
      setHistoryIndex(historyIndex + 1);
      onChange(historyStack[historyIndex + 1]);
    }
  };

  // Handle keyboard shortcuts for undo/redo
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle Ctrl+Z (Undo)
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      handleUndo();
    }
    
    // Handle Ctrl+Y or Ctrl+Shift+Z (Redo)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
      e.preventDefault();
      handleRedo();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Prompt Editor</h2>
            <p className="text-sm text-muted-foreground">
              Write your main prompt text here
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={handleUndo} 
              disabled={historyIndex <= 0}
              title="Undo (Ctrl+Z)"
            >
              <Undo size={16} />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={handleRedo} 
              disabled={historyIndex >= historyStack.length - 1}
              title="Redo (Ctrl+Y)"
            >
              <Redo size={16} />
            </Button>
          </div>
        </div>

        <div className="mt-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline" className="gap-1">
                <PlusCircle size={16} />
                <span className="hidden sm:inline">Insert Placeholder</span>
                <span className="sm:hidden">Insert</span>
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
                        <span className={`text-xs font-mono px-1.5 py-0.5 rounded-md ${getPlaceholderColor(placeholder)}`}>
                          {`<${placeholder.name}>`}
                        </span>
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
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="relative min-h-[200px]">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onSelect={handleSelectionChange}
            onClick={handleSelectionChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter your prompt here..."
            className="min-h-[200px] text-base resize-none border-0 shadow-none focus-visible:ring-0 bg-transparent z-10 absolute inset-0 p-0"
          />
          <div 
            className="min-h-[200px] text-base whitespace-pre-wrap break-words pointer-events-none"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
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
    </div>
  );
}
