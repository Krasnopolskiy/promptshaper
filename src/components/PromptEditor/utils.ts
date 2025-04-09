/**
 * Utility functions for PromptEditor component
 * @module components/PromptEditor/utils
 */
import { EditorContentProps, WrapperProps } from './types';

/**
 * Creates an insert placeholder handler function
 * @param {Function} insertionHandler - The insertion handler function
 * @param {React.RefObject<HTMLTextAreaElement>} editorRef - Reference to the editor element
 * @returns {(name: string) => void} The insert placeholder handler
 */
export function createInsertHandler(
  insertionHandler: (p: { name: string; editorRef: HTMLTextAreaElement | null }) => void,
  editorRef: React.RefObject<HTMLTextAreaElement>
): (name: string) => void {
  return (name) => insertionHandler({ name, editorRef: editorRef.current });
}

/**
 * Creates undo/redo props for wrapper
 * @param {Object} handlers - Handler functions object
 * @param {Function} handlers.undo - Undo action handler
 * @param {Function} handlers.redo - Redo action handler
 * @param {Object} state - State object
 * @param {boolean} state.undoDisabled - Whether undo is disabled
 * @param {boolean} state.redoDisabled - Whether redo is disabled
 * @returns {Pick<WrapperProps, 'onUndo' | 'onRedo' | 'undoDisabled' | 'redoDisabled'>} Undo/redo props
 */
export function createUndoRedoProps(
  handlers: { undo: () => void; redo: () => void },
  state: { undoDisabled: boolean; redoDisabled: boolean }
): Pick<WrapperProps, 'onUndo' | 'onRedo' | 'undoDisabled' | 'redoDisabled'> {
  return { onUndo: handlers.undo, onRedo: handlers.redo, ...state };
}

/**
 * Creates EditorContent props from params
 * @param {Object} params - Content parameters
 * @param {string} params.value - Current text value
 * @param {Function} params.onChange - Change handler function
 * @param {React.RefObject<HTMLTextAreaElement>} params.editorRef - Reference to editor element
 * @param {Object} params.handlers - Handler functions object
 * @param {Function} params.handlers.undo - Undo action handler
 * @param {Function} params.handlers.redo - Redo action handler
 * @param {string} params.theme - Current theme name
 * @returns {EditorContentProps} Editor content props
 */
export function createEditorContentProps(params: {
  value: string;
  onChange: (value: string) => void;
  editorRef: React.RefObject<HTMLTextAreaElement>;
  handlers: { undo: () => void; redo: () => void };
  theme: string;
}): EditorContentProps {
  const { value, onChange, editorRef, handlers, theme } = params;
  return { value, onChange, editorRef, handleUndo: handlers.undo, handleRedo: handlers.redo, theme };
}
