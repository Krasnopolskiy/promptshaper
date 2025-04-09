import { KeyboardEvent } from 'react';

/**
 * Checks if the key event is an undo command
 * @param {KeyboardEvent<HTMLTextAreaElement>} e - Keyboard event
 * @returns {boolean} Whether this is an undo command
 */
export function isUndoCommand(e: KeyboardEvent<HTMLTextAreaElement>): boolean {
  return e.ctrlKey && e.key === 'z' && !e.shiftKey;
}

/**
 * Checks if the key event is a redo command
 * @param {KeyboardEvent<HTMLTextAreaElement>} e - Keyboard event
 * @returns {boolean} Whether this is a redo command
 */
export function isRedoCommand(e: KeyboardEvent<HTMLTextAreaElement>): boolean {
  return (e.ctrlKey && e.shiftKey && e.key === 'z') || (e.ctrlKey && e.key === 'y');
}

/**
 * Executes the appropriate handler based on keyboard command
 * @param {KeyboardEvent<HTMLTextAreaElement>} e - Keyboard event
 * @param {Object} handlers - Object containing handler functions
 * @param {() => void} handlers.undo - Undo function
 * @param {() => void} handlers.redo - Redo function
 * @returns {boolean} Whether a command was handled
 */
function executeCommandIfDetected(
  e: KeyboardEvent<HTMLTextAreaElement>,
  handlers: { undo: () => void; redo: () => void }
): boolean {
  if (isUndoCommand(e)) { e.preventDefault(); handlers.undo(); return true; }
  if (isRedoCommand(e)) { e.preventDefault(); handlers.redo(); return true; }
  return false;
}

/**
 * Handles editor keyboard shortcuts
 * @param {KeyboardEvent<HTMLTextAreaElement>} e - Keyboard event
 * @param {Function} handleUndo - Undo function
 * @param {Function} handleRedo - Redo function
 */
export function handleEditorKeyDown(
  e: KeyboardEvent<HTMLTextAreaElement>,
  handleUndo: () => void,
  handleRedo: () => void
): void {
  executeCommandIfDetected(e, { undo: handleUndo, redo: handleRedo });
}
