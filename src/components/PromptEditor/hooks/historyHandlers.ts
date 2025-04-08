/**
 * Creates handlers for undo/redo operations
 */

/**
 * Creates an undo handler
 * @param {Function} historyUndo - History undo function
 * @param {Function} onChange - Change handler
 * @returns {Function} Undo handler
 */
export function createUndoHandler(
  historyUndo: () => string | null,
  onChange: (value: string) => void
): () => void {
  /**
   * Handle the undo operation
   */
  return (): void => {
    const prev = historyUndo();
    if (prev !== null) onChange(prev);
  };
}

/**
 * Creates a redo handler
 * @param {Function} historyRedo - History redo function
 * @param {Function} onChange - Change handler
 * @returns {Function} Redo handler
 */
export function createRedoHandler(
  historyRedo: () => string | null,
  onChange: (value: string) => void
): () => void {
  /**
   * Handle the redo operation
   */
  return (): void => {
    const next = historyRedo();
    if (next !== null) onChange(next);
  };
}
