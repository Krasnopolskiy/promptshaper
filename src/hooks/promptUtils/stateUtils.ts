/**
 * Utilities for prompt state management
 */
import { useState } from 'react';
import { loadPromptText, savePromptText, clearPromptText } from './index';

/**
 * Type for state handlers
 */
type StateHandlers = {
  handleSetPromptText: (text: string) => void;
  resetPromptText: () => void;
};

/**
 * Type for state with handlers
 */
type StateWithHandlers = {
  promptText: string;
  handleSetPromptText: (text: string) => void;
  resetPromptText: () => void;
};

/**
 * Handle prompt text state changes
 * @param {string} text New prompt text
 * @param {Function} setPromptText State setter
 */
export function handlePromptTextChange(text: string, setPromptText: (text: string) => void): void {
  setPromptText(text);
  savePromptText(text);
}

/**
 * Handle prompt text reset
 * @param {Function} setPromptText State setter
 */
export function handlePromptTextReset(setPromptText: (text: string) => void): void {
  setPromptText('');
  clearPromptText();
}

/**
 * Create set text handler
 * @param {Function} setPromptText Text state setter
 * @returns {Function} Set handler
 */
export function createSetTextHandler(setPromptText: (text: string) => void): (text: string) => void {
  return (text: string): void => handlePromptTextChange(text, setPromptText);
}

/**
 * Create reset text handler
 * @param {Function} setPromptText Text state setter
 * @returns {Function} Reset handler
 */
export function createResetTextHandler(setPromptText: (text: string) => void): () => void {
  return (): void => handlePromptTextReset(setPromptText);
}

/**
 * Create text state handlers
 * @param {Function} setPromptText Text state setter
 * @returns {Object} Text state handlers with set and reset functions
 */
export function createTextHandlers(setPromptText: (text: string) => void): StateHandlers {
  return {
    handleSetPromptText: createSetTextHandler(setPromptText),
    resetPromptText: createResetTextHandler(setPromptText)
  };
}

/**
 * Initialize prompt state
 * @returns {string} Prompt text from storage
 */
export function initializePromptState(): string {
  return loadPromptText();
}

/**
 * Initialize prompt text state handlers
 * @param {Function} setPromptText State setter
 * @returns {Object} Text handlers
 */
export function createPromptTextHandlers(setPromptText: (text: string) => void): StateHandlers {
  return createTextHandlers(setPromptText);
}

/**
 * Create state-handlers object
 * @param {string} promptText Text value
 * @param {StateHandlers} handlers Text handlers
 * @returns {StateWithHandlers} State with handlers
 */
export function createStateObject(
  promptText: string,
  handlers: StateHandlers
): StateWithHandlers {
  return { promptText, ...handlers };
}

/**
 * Get state with handlers
 * @param {string} promptText Prompt text
 * @param {Function} setPromptText Text setter
 * @returns {StateWithHandlers} State with handlers
 */
export function getStateWithHandlers(
  promptText: string,
  setPromptText: (text: string) => void
): StateWithHandlers {
  const handlers = createPromptTextHandlers(setPromptText);
  return createStateObject(promptText, handlers);
}

/**
 * Initialize prompt text state
 * @returns {StateWithHandlers} Prompt text and handlers
 */
export function usePromptState(): StateWithHandlers {
  const [promptText, setPromptText] = useState<string>(initializePromptState);
  return getStateWithHandlers(promptText, setPromptText);
}
