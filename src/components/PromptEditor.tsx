
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

interface Token {
  type: 'text' | 'placeholder';
  content: string;
  placeholderId?: string;
  placeholderName?: string;
  placeholderCategory?: string;
}

export function PromptEditor({ 
  value, 
  onChange, 
  placeholders,
  onInsertPlaceholder 
}: PromptEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isUndoRedo, setIsUndoRedo] = useState<boolean>(false);

  // Parse the input text into tokens (text and placeholders)
  useEffect(() => {
    const pattern = /<([^>]+)>/g;
    const newTokens: Token[] = [];
    let lastIndex = 0;
    let match;

    // Find all placeholder tags and split into tokens
    while ((match = pattern.exec(value)) !== null) {
      // Add text before the placeholder
      if (match.index > lastIndex) {
        newTokens.push({
          type: 'text',
          content: value.substring(lastIndex, match.index)
        });
      }

      // Find the placeholder in our placeholders list to get category
      const placeholderName = match[1];
      const placeholder = placeholders.find(p => p.name === placeholderName);
      
      // Add the placeholder token
      newTokens.push({
        type: 'placeholder',
        content: `<${placeholderName}>`,
        placeholderId: placeholder?.id,
        placeholderName: placeholderName,
        placeholderCategory: placeholder?.category || 'other'
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < value.length) {
      newTokens.push({
        type: 'text',
        content: value.substring(lastIndex)
      });
    }

    setTokens(newTokens);
  }, [value, placeholders]);

  // Generate a unique color for each placeholder even within the same category
  const getPlaceholderColor = (placeholder: { id?: string, category?: string }) => {
    // Base colors per category
    const categoryBaseColors: Record<string, string[]> = {
      'style': ['placeholder-style-1', 'placeholder-style-2'],
      'tone': ['placeholder-tone-1', 'placeholder-tone-2'],
      'format': ['placeholder-format-1', 'placeholder-format-2'],
      'terminology': ['placeholder-terminology-1', 'placeholder-terminology-2'],
      'other': ['placeholder-other-1', 'placeholder-other-2']
    };
    
    // Use placeholder ID to determine which color variation to use
    const category = placeholder.category || 'other';
    const colorSet = categoryBaseColors[category] || categoryBaseColors.other;
    const colorIndex = placeholder.id ? placeholder.id.charCodeAt(0) % colorSet.length : 0;
    return colorSet[colorIndex];
  };

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

    // We need to handle backspace and delete to properly remove placeholders
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      
      // If there's a selection, let the default behavior handle it
      if (selectionStart !== selectionEnd) return;

      // Check if we're at a placeholder boundary
      const isBackspace = e.key === 'Backspace';
      const checkPosition = isBackspace ? selectionStart - 1 : selectionStart;
      let placeholderStartPos = -1;
      let placeholderEndPos = -1;

      // Find if we're at the edge of a placeholder
      let pos = 0;
      for (const token of tokens) {
        if (token.type === 'placeholder') {
          // Check if cursor is at the start or end of this placeholder
          if (isBackspace && pos + token.content.length === selectionStart) {
            // For backspace, check if cursor is right after placeholder
            placeholderStartPos = pos;
            placeholderEndPos = pos + token.content.length;
            break;
          } else if (!isBackspace && pos === selectionStart) {
            // For delete, check if cursor is right before placeholder
            placeholderStartPos = pos;
            placeholderEndPos = pos + token.content.length;
            break;
          }
        }
        pos += token.content.length;
      }

      // If cursor is at placeholder boundary, delete the whole placeholder
      if (placeholderStartPos !== -1) {
        e.preventDefault();
        const newValue = value.substring(0, placeholderStartPos) + value.substring(placeholderEndPos);
        onChange(newValue);
        
        // Set cursor position
        setTimeout(() => {
          if (textarea) {
            textarea.focus();
            textarea.setSelectionRange(placeholderStartPos, placeholderStartPos);
          }
        }, 0);
      }
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
        <div className="relative min-h-[200px]" ref={editorRef}>
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onSelect={handleSelectionChange}
            onClick={handleSelectionChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter your prompt here..."
            className="min-h-[200px] text-base resize-none border-0 shadow-none focus-visible:ring-0 bg-transparent z-10 absolute inset-0 p-0 caretColor-black"
          />
          <div className="min-h-[200px] text-base whitespace-pre-wrap break-words pointer-events-none">
            {tokens.map((token, index) => {
              if (token.type === 'text') {
                return <span key={index}>{token.content}</span>;
              } else {
                const placeholder = placeholders.find(p => p.name === token.placeholderName);
                const colorClass = getPlaceholderColor(placeholder || { id: token.placeholderId, category: token.placeholderCategory });
                return (
                  <span 
                    key={index} 
                    className={`placeholder-tag ${colorClass}`}
                    data-placeholder-id={token.placeholderId}
                  >
                    &lt;{token.placeholderName}&gt;
                  </span>
                );
              }
            })}
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
    </div>
  );
}
