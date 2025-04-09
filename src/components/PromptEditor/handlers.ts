/**
 * Handler utilities for PromptEditor
 * @module components/PromptEditor/handlers
 */
import { useEditor } from './hooks/useEditor';

/**
 * Type for extracted handlers
 */
export type ExtractedHandlers = {
  undo: () => void;
  redo: () => void;
  insertion: (p: { name: string; editorRef: HTMLTextAreaElement | null }) => void;
};

/**
 * Extracts handlers from editor props
 * @param {ReturnType<typeof useEditor>} props - Editor props
 * @returns {ExtractedHandlers} Handler object
 */
export function extractHandlers(props: ReturnType<typeof useEditor>): ExtractedHandlers {
  return { undo: props.handleUndo, redo: props.handleRedo, insertion: props.handlePlaceholderInsertion };
}

/**
 * Extracts state from editor props
 * @param {ReturnType<typeof useEditor>} props - Editor props
 * @returns {Object} State object
 */
export function extractState(props: ReturnType<typeof useEditor>): {
  undoDisabled: boolean;
  redoDisabled: boolean;
} {
  return {
    undoDisabled: props.undoDisabled,
    redoDisabled: props.redoDisabled
  };
}

/**
 * Creates an insert handler function
 * @param {Function} insertion - Insertion handler function
 * @param {HTMLTextAreaElement | null} editorRef - Editor element reference
 * @returns {(name: string) => void} Insert handler function
 */
export function createInsertHandler(
  insertion: (p: { name: string; editorRef: HTMLTextAreaElement | null }) => void,
  editorRef: HTMLTextAreaElement | null
): (name: string) => void {
  return (name) => insertion({ name, editorRef });
}
