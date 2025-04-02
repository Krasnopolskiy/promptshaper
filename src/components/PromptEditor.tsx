
/**
 * PromptEditor Component
 *
 * A rich text editor for creating and editing prompts with placeholder support.
 * Allows users to insert tagged placeholders and provides undo/redo functionality.
 *
 * @module components/PromptEditor
 */
import {KeyboardEvent, useEffect, useRef, useState} from 'react';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Button} from '@/components/ui/button';
import {PlusCircle, Redo, Undo} from 'lucide-react';
import {Placeholder} from '@/types';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import CodeEditor from '@uiw/react-textarea-code-editor';
import {useTheme} from '@/hooks';
import {createEditorStyles, createPlaceholderStyles} from './utils/editor-styles';

/**
 * PromptEditor component props
 * @interface PromptEditorProps
 */
interface PromptEditorProps {
  /** Current prompt text value */
  value: string;
  /** Callback for when the prompt text changes */
  onChange: (value: string) => void;
  /** List of available placeholders */
  placeholders: Placeholder[];
  /** Callback for when a placeholder is inserted */
  onInsertPlaceholder?: (name: string, position: number) => number;
}

/**
 * PromptEditor component for editing and formatting prompts with placeholders
 */
export function PromptEditor({
                               value,
                               onChange,
                               placeholders,
                               onInsertPlaceholder,
                             }: PromptEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isUndoRedo, setIsUndoRedo] = useState<boolean>(false);
  const {theme} = useTheme();
  const editorStyles = createEditorStyles();

  /**
   * Update history stack when value changes
   */
  useEffect(() => {
    if (!isUndoRedo && value !== historyStack[historyStack.length - 1 - historyIndex]) {
      const newStack = historyStack.slice(0, historyStack.length - historyIndex);
      setHistoryStack([...newStack, value]);
      setHistoryIndex(0);
    }
    setIsUndoRedo(false);
  }, [value, historyStack, historyIndex, isUndoRedo]);

  /**
   * Add editor and placeholder styles to the document
   */
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = editorStyles;
    document.head.appendChild(styleElement);

    const placeholderStyles = createPlaceholderStyles(placeholders);
    styleElement.textContent += placeholderStyles;

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [editorStyles, placeholders]);

  /**
   * Apply styling to placeholder elements in the editor
   */
  useEffect(() => {
    const observer = setupPlaceholderStylingObserver(placeholders);
    return () => observer.disconnect();
  }, [placeholders]);

  /**
   * Handle changes to the editor content
   * @param newValue - New editor content
   */
  const handleEditorChange = (newValue: string) => {
    processPlaceholders(newValue, placeholders, onInsertPlaceholder);
    onChange(newValue);
  };

  /**
   * Handle keyboard shortcuts
   * @param e - Keyboard event
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
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

  /**
   * Insert a placeholder at the cursor position
   * @param name - Placeholder name
   */
  const handleInsertPlaceholder = (name: string) => {
    insertPlaceholderAtCursor(name, editorRef.current, value, onChange, onInsertPlaceholder);
  };

  /**
   * Undo the last change
   */
  const handleUndo = () => {
    if (historyIndex < historyStack.length - 1) {
      setIsUndoRedo(true);
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onChange(historyStack[historyStack.length - 1 - newIndex]);
    }
  };

  /**
   * Redo a previously undone change
   */
  const handleRedo = () => {
    if (historyIndex > 0) {
      setIsUndoRedo(true);
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onChange(historyStack[historyStack.length - 1 - newIndex]);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <style>{editorStyles}</style>

      <div className="flex items-center gap-2 border-b border-border/50 p-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleUndo}
          disabled={historyIndex >= historyStack.length - 1}
          className="gap-1.5 text-sm"
        >
          <Undo size={14}/>
          Undo
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={handleRedo}
          disabled={historyIndex <= 0}
          className="gap-1.5 text-sm"
        >
          <Redo size={14}/>
          Redo
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline" className="gap-1.5 text-sm hover:bg-background">
              <PlusCircle size={14}/>
              Insert
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="end">
            {placeholders.length > 0 ? (
              <div className="grid gap-1">
                {placeholders.map(placeholder => (
                  <Button
                    key={placeholder.id}
                    variant="ghost"
                    size="sm"
                    className="justify-start font-normal"
                    onClick={() => handleInsertPlaceholder(placeholder.name)}
                  >
                    <span
                      className="mr-2 h-2 w-2 rounded-full"
                      style={{backgroundColor: placeholder.color}}
                    />
                    {placeholder.name}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="py-2 text-center text-sm text-muted-foreground">
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
            onChange={e => handleEditorChange(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={editorRef as React.RefObject<HTMLTextAreaElement>}
            style={{
              fontSize: '14px',
              fontFamily: 'inherit',
              minHeight: '200px',
              height: 'auto',
            }}
            className="w-full"
            data-color-mode={theme}
          />
        </div>
      </ScrollArea>
    </div>
  );
}

/**
 * Setup an observer to apply styling to placeholders
 * @param placeholders - List of placeholders
 * @returns MutationObserver instance
 */
function setupPlaceholderStylingObserver(placeholders: Placeholder[]): MutationObserver {
  const applyPlaceholderStyling = () => {
    const editorElements = document.querySelectorAll('.w-tc-editor-text');
    editorElements.forEach(editor => {
      stylePlaceholderElements(editor, placeholders);
    });
  };

  const observer = new MutationObserver(() => {
    setTimeout(applyPlaceholderStyling, 10);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  setTimeout(applyPlaceholderStyling, 100);
  return observer;
}

/**
 * Apply styles to placeholder elements in the editor
 * @param editor - Editor DOM element
 * @param placeholders - List of placeholders
 */
function stylePlaceholderElements(editor: Element, placeholders: Placeholder[]): void {
  const spans = editor.querySelectorAll('span');
  spans.forEach(span => {
    const text = span.textContent || '';
    // Updated regex to support multi-word placeholders
    if (text.match(/<([\p{L}0-9\s_-]+)>/u)) {
      const placeholderName = text.replace(/[<>]/g, '');
      const placeholder = placeholders.find(p => p.name === placeholderName);
      if (placeholder) {
        applyPlaceholderStyle(span, placeholder.color);
      }
    }
  });
}

/**
 * Apply styling to a placeholder span element
 * @param span - Span DOM element
 * @param color - Color to apply
 */
function applyPlaceholderStyle(span: HTMLSpanElement, color: string): void {
  span.style.color = color;
  span.style.backgroundColor = `${color}10`;
  span.style.border = `1px solid ${color}30`;
  span.style.borderRadius = '4px';
  span.style.padding = '2px 4px';
  span.style.margin = '0 1px';
  span.style.fontWeight = '500';
}

/**
 * Process placeholders in the text
 * @param text - Editor text
 * @param placeholders - List of placeholders
 * @param onInsertPlaceholder - Callback for inserting placeholders
 */
function processPlaceholders(
  text: string,
  placeholders: Placeholder[],
  onInsertPlaceholder?: (name: string, position: number) => number
): void {
  // Updated regex to support multi-word placeholders and non-Latin characters
  const placeholderRegex = /<([\p{L}0-9\s_-]+)>/gu;
  const existingPlaceholderNames = new Set(placeholders.map(p => p.name));

  let match;
  const foundPlaceholders = new Set<string>();

  while ((match = placeholderRegex.exec(text)) !== null) {
    const placeholderName = match[1];
    foundPlaceholders.add(placeholderName);

    if (!existingPlaceholderNames.has(placeholderName) && onInsertPlaceholder) {
      onInsertPlaceholder(placeholderName, match.index);
    }
  }

  const removedPlaceholders = [...existingPlaceholderNames].filter(
    name => !foundPlaceholders.has(name) && placeholders.find(p => p.name === name)?.content === ''
  );

  if (removedPlaceholders.length > 0 && onInsertPlaceholder) {
    removedPlaceholders.forEach(name => {
      onInsertPlaceholder(name, -1);
    });
  }
}

/**
 * Insert a placeholder at the cursor position
 * @param name - Placeholder name
 * @param textareaRef - Reference to the textarea
 * @param value - Current text value
 * @param onChange - Change handler
 * @param onInsertPlaceholder - Callback for inserting placeholders
 */
function insertPlaceholderAtCursor(
  name: string,
  textareaRef: HTMLTextAreaElement | null,
  value: string,
  onChange: (value: string) => void,
  onInsertPlaceholder?: (name: string, position: number) => number
): void {
  if (!textareaRef) return;

  const start = textareaRef.selectionStart;
  const end = textareaRef.selectionEnd;
  const tag = '<' + name + '>';

  const newValue = value.substring(0, start) + tag + value.substring(end);
  const newPosition = start + tag.length;

  onChange(newValue);

  requestAnimationFrame(() => {
    if (textareaRef) {
      textareaRef.focus();
      textareaRef.setSelectionRange(newPosition, newPosition);
    }
  });

  if (onInsertPlaceholder) {
    onInsertPlaceholder(name, start);
  }
}
