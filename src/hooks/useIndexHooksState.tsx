/**
 * State management hooks for Index page
 *
 * @module hooks/useIndexHooksState
 */
import { useState } from 'react';

/**
 * Initializes state management for cursor position
 * @returns State management for cursor position
 */
export function useCursorPositionState(): {
  cursorPosition: number;
  setCursorPosition: React.Dispatch<React.SetStateAction<number>>;
} {
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  return { cursorPosition, setCursorPosition };
}

/**
 * Initializes full prompt state
 * @returns Full prompt state and setter
 */
export function useFullPromptState(): {
  fullPrompt: string;
  setFullPrompt: React.Dispatch<React.SetStateAction<string>>;
} {
  const [fullPrompt, setFullPrompt] = useState<string>('');
  return { fullPrompt, setFullPrompt };
}

/**
 * Initializes copyable prompt state
 * @returns Copyable prompt state and setter
 */
export function useCopyablePromptState(): {
  copyablePrompt: string;
  setCopyablePrompt: React.Dispatch<React.SetStateAction<string>>;
} {
  const [copyablePrompt, setCopyablePrompt] = useState<string>('');
  return { copyablePrompt, setCopyablePrompt };
}

/**
 * Initializes state management for prompts
 * @returns State management for prompts
 */
export function usePromptStates(): {
  fullPrompt: string;
  setFullPrompt: React.Dispatch<React.SetStateAction<string>>;
  copyablePrompt: string;
  setCopyablePrompt: React.Dispatch<React.SetStateAction<string>>;
} {
  const fullPromptState = useFullPromptState();
  const copyablePromptState = useCopyablePromptState();
  return { ...fullPromptState, ...copyablePromptState };
}

/**
 * Combined state type
 */
export type CombinedState = ReturnType<typeof useCursorPositionState> & ReturnType<typeof usePromptStates>;

/**
 * Initializes state management
 * @returns State management hooks
 */
export function useStateManagement(): CombinedState {
  const cursorState = useCursorPositionState();
  const promptStates = usePromptStates();

  return {
    ...cursorState,
    ...promptStates
  };
}
