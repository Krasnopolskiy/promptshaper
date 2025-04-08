/**
 * Editor Panel Component
 *
 * Renders the editor panel
 *
 * @module components/DesktopPanelView/EditorPanelComponent
 */
import { EditorPanel } from '@/components/EditorPanel';
import { DesktopPanelViewProps } from '../DesktopPanelView';

/**
 * Renders the Editor panel
 * @param {Object} props - Component props
 * @param {string} props.promptText - Current prompt text
 * @param {Function} props.setPromptText - Function to update prompt text
 * @param {Placeholder[]} props.placeholders - Array of placeholder objects
 * @param {Function} props.onInsertPlaceholderAtPosition - Handler for inserting placeholders at specific position
 * @returns {JSX.Element} The rendered Editor panel
 */
export function EditorPanelComponent({ promptText, setPromptText, placeholders, onInsertPlaceholderAtPosition }: Partial<DesktopPanelViewProps>): JSX.Element {
  return (
    <EditorPanel
      promptText={promptText}
      setPromptText={setPromptText}
      placeholders={placeholders}
      onInsertPlaceholder={onInsertPlaceholderAtPosition}
    />
  );
}
