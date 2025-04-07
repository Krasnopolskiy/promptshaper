import { Dispatch, SetStateAction, useState } from 'react';
import { CombinedState } from '../types/indexHooksTypes';

/**
 * Initializes state management for cursor position
 * @returns State management for cursor position
 */
export function useCursorPositionState(): {
  cursorPosition: number;
  setCursorPosition: (position: number) => void;
} {
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  return { cursorPosition, setCursorPosition };
}

/**
 * Type for prompt state
 */
type PromptState = {
  fullPrompt: string;
  setFullPrompt: Dispatch<SetStateAction<string>>;
  copyablePrompt: string;
  setCopyablePrompt: Dispatch<SetStateAction<string>>;
};

/**
 * Initializes full prompt state
 * @returns Full prompt state and setter
 */
export function useFullPromptState(): Pick<PromptState, 'fullPrompt' | 'setFullPrompt'> {
  const [fullPrompt, setFullPrompt] = useState<string>('');
  return { fullPrompt, setFullPrompt };
}

/**
 * Initializes copyable prompt state
 * @returns Copyable prompt state and setter
 */
export function useCopyablePromptState(): Pick<PromptState, 'copyablePrompt' | 'setCopyablePrompt'> {
  const [copyablePrompt, setCopyablePrompt] = useState<string>('');
  return { copyablePrompt, setCopyablePrompt };
}

/**
 * Initializes state management for prompts
 * @returns State management for prompts
 */
export function usePromptStates(): PromptState {
  return { ...useFullPromptState(), ...useCopyablePromptState() };
}

/**
 * Initializes state management
 * @returns State management hooks
 */
export function useStateManagement(): CombinedState {
  return { ...useCursorPositionState(), ...usePromptStates() };
}
