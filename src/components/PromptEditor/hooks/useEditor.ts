import { Placeholder } from '@/types';
import { useEditorHistory } from './useEditorHistory';
import { useEditorStyling } from './useEditorStyling';
import { createUndoHandler, createRedoHandler } from './historyHandlers';
import {
  insertPlaceholderAtCursor,
  processPlaceholders,
  PlaceholderInsertionConfig,
  PlaceholderProcessingConfig
} from '../utils/editor-utils';

interface UseEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholders: Placeholder[];
  onInsertPlaceholder?: (name: string, position: number) => number;
}

interface UseEditorResult {
  handleEditorChange: (newValue: string) => void;
  handleUndo: () => void;
  handleRedo: () => void;
  handlePlaceholderInsertion: (params: PlaceholderInsertionParams) => void;
  undoDisabled: boolean;
  redoDisabled: boolean;
}

interface PlaceholderInsertionParams {
  name: string;
  editorRef: HTMLTextAreaElement | null;
}

/**
 * Create a handler for editor content changes
 * @param {Object} params - Parameters
 * @param {Placeholder[]} params.placeholders - List of placeholders
 * @param {Function} params.onChange - Change handler
 * @param {Function} params.onInsertPlaceholder - Insert placeholder callback
 * @returns {Function} Editor change handler
 */
function createEditorChangeHandler({
  placeholders,
  onChange,
  onInsertPlaceholder
}: Pick<UseEditorProps, 'placeholders' | 'onChange' | 'onInsertPlaceholder'>): (newValue: string) => void {
  /**
   * Handles changes to the editor content
   * @param {string} newValue - New editor content
   */
  return (newValue: string): void => {
    const config: PlaceholderProcessingConfig = {
      text: newValue,
      placeholders,
      onInsertPlaceholder
    };
    processPlaceholders(config);
    onChange(newValue);
  };
}

/**
 * Create a handler for placeholder insertion
 * @param {Object} params - Parameters
 * @param {string} params.value - Current editor value
 * @param {Function} params.onChange - Change handler
 * @param {Function} params.onInsertPlaceholder - Insert placeholder callback
 * @returns {Function} Placeholder insertion handler
 */
function createPlaceholderInsertionHandler({
  value,
  onChange,
  onInsertPlaceholder
}: Pick<UseEditorProps, 'value' | 'onChange' | 'onInsertPlaceholder'>): (params: PlaceholderInsertionParams) => void {
  /**
   * Handles placeholder insertion
   * @param {PlaceholderInsertionParams} params - Insertion parameters
   */
  return ({ name, editorRef }: PlaceholderInsertionParams): void => {
    const config: PlaceholderInsertionConfig = {
      name,
      textareaRef: editorRef,
      value,
      onChange,
      onInsertPlaceholder
    };
    insertPlaceholderAtCursor(config);
  };
}

/**
 * Custom hook for editor functionality
 * @param {UseEditorProps} props - Hook properties
 * @returns {UseEditorResult} Editor handlers and state
 */
export function useEditor({
  value,
  onChange,
  placeholders,
  onInsertPlaceholder
}: UseEditorProps): UseEditorResult {
  // Use history and styling hooks
  const { handleUndo: historyUndo, handleRedo: historyRedo, undoDisabled, redoDisabled } = useEditorHistory(value);
  useEditorStyling(placeholders);

  return {
    handleEditorChange: createEditorChangeHandler({ placeholders, onChange, onInsertPlaceholder }),
    handlePlaceholderInsertion: createPlaceholderInsertionHandler({ value, onChange, onInsertPlaceholder }),
    handleUndo: createUndoHandler(historyUndo, onChange),
    handleRedo: createRedoHandler(historyRedo, onChange),
    undoDisabled,
    redoDisabled
  };
}
