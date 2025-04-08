/**
 * PromptEditor Component
 *
 * A rich text editor for creating and editing prompts with placeholder support.
 * Allows users to insert tagged placeholders and provides undo/redo functionality.
 *
 * @module components/PromptEditor
 */
import { useRef } from 'react';
import { Placeholder } from '@/types';
import { useTheme } from '@/hooks';
import { EditorContent } from './EditorContent';
import { EditorWrapper } from './components/EditorWrapper';
import { useEditor } from './hooks/useEditor';

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
 * @param {PromptEditorProps} props - Component props
 * @returns {JSX.Element} The rendered prompt editor
 */
export function PromptEditor({ value, onChange, placeholders, onInsertPlaceholder }: PromptEditorProps): JSX.Element {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();
  const { handleEditorChange, handleUndo, handleRedo, handlePlaceholderInsertion, undoDisabled, redoDisabled } =
    useEditor({ value, onChange, placeholders, onInsertPlaceholder });

  return (
    <EditorWrapper
      placeholders={placeholders}
      onUndo={handleUndo}
      onRedo={handleRedo}
      onInsertPlaceholder={(name) => handlePlaceholderInsertion({ name, editorRef: editorRef.current })}
      undoDisabled={undoDisabled}
      redoDisabled={redoDisabled}
    >
      <EditorContent
        value={value}
        onChange={handleEditorChange}
        editorRef={editorRef}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        theme={theme}
      />
    </EditorWrapper>
  );
}
