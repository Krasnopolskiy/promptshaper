import React, { KeyboardEvent, RefObject, ChangeEvent } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { handleEditorKeyDown } from './utils/keyboard';

type ColorMode = 'dark' | 'light';

/**
 * Default style for the code editor
 */
const editorStyle = {
  fontSize: '14px',
  fontFamily: 'inherit',
  minHeight: '200px',
  height: 'auto',
};

interface CodeEditorComponentProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  editorRef: RefObject<HTMLTextAreaElement>;
  colorMode: ColorMode;
}

/**
 * Handles the change event for the code editor
 * @param {ChangeEvent<HTMLTextAreaElement>} e - The change event
 * @param {(value: string) => void} onChange - Change handler function
 */
function handleEditorChange(
  e: ChangeEvent<HTMLTextAreaElement>,
  onChange: (value: string) => void
): void {
  onChange(e.target.value);
}

/**
 * CodeEditor component wrapper
 * @param {CodeEditorComponentProps} props - Component props
 * @returns {JSX.Element} The rendered code editor
 */
function CodeEditorComponent({
  value,
  onChange,
  onKeyDown,
  editorRef,
  colorMode
}: CodeEditorComponentProps): JSX.Element {
  return <CodeEditor value={value} language="text" placeholder="Write your prompt here..." onChange={(e) => handleEditorChange(e, onChange)}
    onKeyDown={onKeyDown} ref={editorRef} style={editorStyle} className="w-full" data-color-mode={colorMode} />;
}

interface EditorContentProps {
  value: string;
  onChange: (value: string) => void;
  editorRef: RefObject<HTMLTextAreaElement>;
  handleUndo: () => void;
  handleRedo: () => void;
  theme: string;
}

/**
 * Creates a keyboard event handler for the editor
 * @param {() => void} handleUndo - Undo function
 * @param {() => void} handleRedo - Redo function
 * @returns {(e: KeyboardEvent<HTMLTextAreaElement>) => void} Keyboard event handler
 */
function createKeyDownHandler(
  handleUndo: () => void,
  handleRedo: () => void
): (e: KeyboardEvent<HTMLTextAreaElement>) => void {
  return (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    handleEditorKeyDown(e, handleUndo, handleRedo);
  };
}

/**
 * Content area of the prompt editor
 * @param {EditorContentProps} props - Component props
 * @returns {JSX.Element} The rendered editor content
 */
export function EditorContent({ value, onChange, editorRef, handleUndo, handleRedo, theme }: EditorContentProps): JSX.Element {
  const onKeyDown = createKeyDownHandler(handleUndo, handleRedo);
  return <ScrollArea className="flex-1">
    <div className="p-4">
      <CodeEditorComponent value={value} onChange={onChange} onKeyDown={onKeyDown} editorRef={editorRef} colorMode={theme === 'dark' ? 'dark' : 'light'} />
    </div>
  </ScrollArea>;
}
