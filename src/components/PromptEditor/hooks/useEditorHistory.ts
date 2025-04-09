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
function updateHistoryStack({ historyStack, historyIndex, value }: { historyStack: string[]; historyIndex: number; value: string }): string[] {
  return [...historyStack.slice(0, historyStack.length - historyIndex), value];
}

/**
 * Creates an undo handler
 * @param {HistoryState} state - Current history state
 * @param {HistoryActions} actions - Actions to update history
 * @returns {Function} Undo handler function
 */
function createUndoHandler(state: HistoryState, actions: HistoryActions): () => string | null {
  return () => {
    if (state.historyIndex >= state.historyStack.length - 1) return null;
    actions.setIsUndoRedo(true);
    const newIndex = state.historyIndex + 1;
    actions.setHistoryIndex(newIndex);
    return state.historyStack[state.historyStack.length - 1 - newIndex];
  };
}

/**
 * Creates a redo handler
 * @param {HistoryState} state - Current history state
 * @param {HistoryActions} actions - Actions to update history
 * @returns {Function} Redo handler function
 */
function createRedoHandler(state: HistoryState, actions: HistoryActions): () => string | null {
  return () => {
    if (state.historyIndex <= 0) return null;
    actions.setIsUndoRedo(true);
    const newIndex = state.historyIndex - 1;
    actions.setHistoryIndex(newIndex);
    return state.historyStack[state.historyStack.length - 1 - newIndex];
  };
}

/**
 * Updates history when value changes
 * @param {Object} params - Parameters for the update
 * @param {string} params.value - Current value
 * @param {HistoryState} params.state - Current state
 * @param {HistoryActions} params.actions - State update actions
 */
function handleValueChange({ value, state, actions }: { value: string; state: HistoryState; actions: HistoryActions }): void {
  if (!state.isUndoRedo && value !== state.historyStack[state.historyStack.length - 1 - state.historyIndex]) {
    const newStack = updateHistoryStack({ historyStack: state.historyStack, historyIndex: state.historyIndex, value });
    actions.setHistoryStack(newStack);
    actions.setHistoryIndex(0);
  }
  actions.setIsUndoRedo(false);
}

/**
 * Creates history result object for the hook
 * @param {HistoryState} state - Current history state
 * @param {HistoryActions} actions - State update actions
 * @returns {EditorHistoryResult} The history result
 */
function createHistoryResult(state: HistoryState, actions: HistoryActions): EditorHistoryResult {
  return {
    handleUndo: createUndoHandler(state, actions),
    handleRedo: createRedoHandler(state, actions),
    undoDisabled: state.historyIndex >= state.historyStack.length - 1,
    redoDisabled: state.historyIndex <= 0
  };
}

/**
 * Custom hook for managing editor history (undo/redo)
 * @param {string} value - Current editor value
 * @returns {EditorHistoryResult} History state and handlers
 */
export function useEditorHistory(value: string): EditorHistoryResult {
  const [stack, setStack] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(-1);
  const [isUndo, setIsUndo] = useState<boolean>(false);

  const state = { historyStack: stack, historyIndex: index, isUndoRedo: isUndo };
  const actions = { setHistoryStack: setStack, setHistoryIndex: setIndex, setIsUndoRedo: setIsUndo };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleValueChange({ value, state, actions }); }, [value, stack, index, isUndo]);

  return createHistoryResult(state, actions);
}
