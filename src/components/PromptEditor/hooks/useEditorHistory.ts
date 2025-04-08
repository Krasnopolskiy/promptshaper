import { useState, useEffect } from 'react';

interface EditorHistoryResult {
  handleUndo: () => string | null;
  handleRedo: () => string | null;
  undoDisabled: boolean;
  redoDisabled: boolean;
}

interface HistoryState {
  historyStack: string[];
  historyIndex: number;
  isUndoRedo: boolean;
}

interface HistoryActions {
  setHistoryStack: (stack: string[]) => void;
  setHistoryIndex: (index: number) => void;
  setIsUndoRedo: (value: boolean) => void;
}

/**
 * Updates the history stack with a new value
 * @param {Object} params - Function parameters
 * @param {string[]} params.historyStack - Current history stack
 * @param {number} params.historyIndex - Current history index
 * @param {string} params.value - Current editor value
 * @returns {string[]} Updated history stack
 */
function updateHistoryStack({
  historyStack,
  historyIndex,
  value
}: {
  historyStack: string[];
  historyIndex: number;
  value: string;
}): string[] {
  const newStack = historyStack.slice(0, historyStack.length - historyIndex);
  return [...newStack, value];
}

/**
 * Creates an undo handler
 * @param {HistoryState} state - Current history state
 * @param {HistoryActions} actions - Actions to update history
 * @returns {Function} Undo handler function
 */
function createUndoHandler(
  state: HistoryState,
  actions: HistoryActions
): () => string | null {
  return () => {
    if (state.historyIndex < state.historyStack.length - 1) {
      actions.setIsUndoRedo(true);
      const newIndex = state.historyIndex + 1;
      actions.setHistoryIndex(newIndex);
      return state.historyStack[state.historyStack.length - 1 - newIndex];
    }
    return null;
  };
}

/**
 * Creates a redo handler
 * @param {HistoryState} state - Current history state
 * @param {HistoryActions} actions - Actions to update history
 * @returns {Function} Redo handler function
 */
function createRedoHandler(
  state: HistoryState,
  actions: HistoryActions
): () => string | null {
  return () => {
    if (state.historyIndex > 0) {
      actions.setIsUndoRedo(true);
      const newIndex = state.historyIndex - 1;
      actions.setHistoryIndex(newIndex);
      return state.historyStack[state.historyStack.length - 1 - newIndex];
    }
    return null;
  };
}

/**
 * Custom hook for managing editor history (undo/redo)
 * @param {string} value - Current editor value
 * @returns {EditorHistoryResult} History state and handlers
 */
export function useEditorHistory(value: string): EditorHistoryResult {
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isUndoRedo, setIsUndoRedo] = useState<boolean>(false);

  /**
   * Update history stack when value changes
   */
  useEffect(() => {
    if (!isUndoRedo && value !== historyStack[historyStack.length - 1 - historyIndex]) {
      const newStack = updateHistoryStack({ historyStack, historyIndex, value });
      setHistoryStack(newStack);
      setHistoryIndex(0);
    }
    setIsUndoRedo(false);
  }, [value, historyStack, historyIndex, isUndoRedo]);

  const state: HistoryState = { historyStack, historyIndex, isUndoRedo };
  const actions: HistoryActions = { setHistoryStack, setHistoryIndex, setIsUndoRedo };

  return {
    handleUndo: createUndoHandler(state, actions),
    handleRedo: createRedoHandler(state, actions),
    undoDisabled: historyIndex >= historyStack.length - 1,
    redoDisabled: historyIndex <= 0
  };
}
