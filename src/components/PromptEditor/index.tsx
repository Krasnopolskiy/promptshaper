/**
 * PromptEditor Component
 *
 * A rich text editor for creating and editing prompts with placeholder support.
 * Allows users to insert tagged placeholders and provides undo/redo functionality.
 *
 * @module components/PromptEditor
 */
import { EditorContent } from './EditorContent';
import { EditorWrapper } from './components/EditorWrapper';
import { useEditorBasics, createEditorProps, type Props } from './props';
import type { EditorContentProps } from './types';

/**
 * Maps content parameters to editor content component
 * @param {EditorContentProps} params - Content parameters
 * @returns {JSX.Element} Editor content component
 */
function mapToEditorContent(params: EditorContentProps): JSX.Element {
  return <EditorContent {...params} />;
}

/**
 * PromptEditor Component
 * @param {Props} props - Component props
 * @returns {JSX.Element} Editor component
 */
export function PromptEditor(props: Props): JSX.Element {
  const basics = useEditorBasics(props);
  const { contentParams, wrapperProps } = createEditorProps(basics);

  return (
    <EditorWrapper {...wrapperProps}>
      {mapToEditorContent(contentParams)}
    </EditorWrapper>
  );
}
