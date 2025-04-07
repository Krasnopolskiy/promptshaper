import { useState } from 'react';

/**
 * Cursor position state
 */
interface CursorState {
  cursorPosition: number;
  setCursorPosition: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Prompt state
 */
interface PromptState {
  fullPrompt: string;
  setFullPrompt: React.Dispatch<React.SetStateAction<string>>;
  copyablePrompt: string;
  setCopyablePrompt: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Initializes cursor position state
 *
 * @returns {CursorState} Cursor position state and setter
 */
function useCursorPositionState(): CursorState {
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  return { cursorPosition, setCursorPosition };
}

/**
 * Initializes full prompt state
 *
 * @returns Full prompt state and setter
 */
function useFullPromptState(): Pick<PromptState, 'fullPrompt' | 'setFullPrompt'> {
  const [fullPrompt, setFullPrompt] = useState<string>('');
  return { fullPrompt, setFullPrompt };
}

/**
 * Initializes copyable prompt state
 *
 * @returns Copyable prompt state and setter
 */
function useCopyablePromptState(): Pick<PromptState, 'copyablePrompt' | 'setCopyablePrompt'> {
  const [copyablePrompt, setCopyablePrompt] = useState<string>('');
  return { copyablePrompt, setCopyablePrompt };
}

/**
 * Initializes prompt states
 *
 * @returns {PromptState} Prompt states and setters
 */
function usePromptStates(): PromptState {
  const fullPromptState = useFullPromptState();
  const copyablePromptState = useCopyablePromptState();

  return {
    ...fullPromptState,
    ...copyablePromptState
  };
}

/**
 * Combined state type
 */
type CombinedState = CursorState & PromptState;

/**
 * Initializes state management
 *
 * @returns {CombinedState} State management hooks and values
 */
export function useStateManagement(): CombinedState {
  const cursorState = useCursorPositionState();
  const promptStates = usePromptStates();

  return {
    ...cursorState,
    ...promptStates
  };
}
