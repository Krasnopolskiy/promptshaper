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
  if (isUndoCommand(e)) {
    e.preventDefault();
    handleUndo();
  } else if (isRedoCommand(e)) {
    e.preventDefault();
    handleRedo();
  }
}
