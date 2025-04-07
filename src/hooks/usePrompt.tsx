import {useCallback} from 'react';
import {Placeholder} from '@/types';
import {
  processPlaceholders,
  createFullPromptFilter,
  createFullPromptTransformer,
  createCopyablePromptFilter,
  createCopyablePromptTransformer
} from './promptUtils/processingUtils';
import {
  usePromptState
} from './promptUtils/stateUtils';
import {
  clipboardApiCopy,
  clipboardFallbackCopy
} from './promptUtils/clipboardUtils';
import {
  createCombinedHooksObject
} from './promptUtils/hookUtils';

/**
 * Return type for the usePrompt hook
 */
export interface UsePromptReturn {
  promptText: string;
  setPromptText: (text: string) => void;
  resetPromptText: () => void;
  generateFullPrompt: (text: string, placeholders: Placeholder[]) => string;
  generateCopyablePrompt: (text: string, placeholders: Placeholder[]) => string;
  insertPlaceholderTag: (name: string, position: number) => number;
  updatePlaceholdersInPrompt: (oldName: string, newName: string) => void;
  copyToClipboard: (text: string) => Promise<boolean>;
}

/**
 * Create tag for insertion
 * @param {string} name Placeholder name
 * @returns {string} Tag string
 */
function createTag(name: string): string {
  return `<${name}>`;
}

/**
 * Create text slices for insertion
 * @param {string} promptText Current text
 * @param {number} position Insertion position
 * @returns {Object} Text slices
 */
function createTextSlices(promptText: string, position: number): { before: string; after: string } {
  return {
    before: promptText.slice(0, position),
    after: promptText.slice(position)
  };
}

/**
 * Create tag insertion callback
 * @param {string} promptText Current text
 * @param {Function} setPromptText Text setter
 * @returns {Function} Insertion callback
 */
function createTagInsertionCallback(
  promptText: string,
  setPromptText: (text: string) => void
): (name: string, position: number) => number {
  return (name: string, position: number): number => {
    if (position < 0) return -1;
    return insertTagAtPosition(name, position, promptText, setPromptText);
  };
}

/**
 * Insert tag at position
 * @param {string} name Placeholder name
 * @param {number} position Insertion position
 * @param {string} promptText Current text
 * @param {Function} setPromptText Text setter
 * @returns {number} New cursor position
 */
function insertTagAtPosition(
  name: string,
  position: number,
  promptText: string,
  setPromptText: (text: string) => void
): number {
  const tag = createTag(name);
  const newPrompt = createNewPromptWithTag(promptText, position, tag);
  return applyTagInsertion(newPrompt, position, tag, setPromptText);
}

/**
 * Apply tag insertion
 * @param {string} newPrompt New prompt text
 * @param {number} position Insertion position
 * @param {string} tag Tag to insert
 * @param {Function} setPromptText Text setter
 * @returns {number} New cursor position
 */
function applyTagInsertion(
  newPrompt: string,
  position: number,
  tag: string,
  setPromptText: (text: string) => void
): number {
  const newPosition = position + tag.length;
  setPromptText(newPrompt);
  return newPosition;
}

/**
 * Create new prompt with tag
 * @param {string} promptText Current text
 * @param {number} position Insertion position
 * @param {string} tag Tag to insert
 * @returns {string} New prompt text
 */
function createNewPromptWithTag(
  promptText: string,
  position: number,
  tag: string
): string {
  const { before, after } = createTextSlices(promptText, position);
  return before + tag + after;
}

/**
 * Escape special characters for regex
 * @param {string} text Text to escape
 * @returns {string} Escaped text
 */
function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Create placeholder update callback
 * @param {string} promptText Current text
 * @param {Function} setPromptText Text setter
 * @returns {Function} Update callback
 */
function createPlaceholderUpdateCallback(
  promptText: string,
  setPromptText: (text: string) => void
): (oldName: string, newName: string) => void {
  return (oldName: string, newName: string): void => {
    updatePlaceholderInText(oldName, newName, promptText, setPromptText);
  };
}

/**
 * Update placeholder in text
 * @param {string} oldName Old placeholder name
 * @param {string} newName New placeholder name
 * @param {string} promptText Current text
 * @param {Function} setPromptText Text setter
 */
function updatePlaceholderInText(
  oldName: string,
  newName: string,
  promptText: string,
  setPromptText: (text: string) => void
): void {
  const updatedPrompt = createUpdatedPrompt(oldName, newName, promptText);
  setPromptText(updatedPrompt);
}

/**
 * Create updated prompt with new placeholder name
 * @param {string} oldName Old placeholder name
 * @param {string} newName New placeholder name
 * @param {string} promptText Current text
 * @returns {string} Updated prompt text
 */
function createUpdatedPrompt(
  oldName: string,
  newName: string,
  promptText: string
): string {
  const escapedOldName = escapeRegex(oldName);
  const regex = new RegExp(`<${escapedOldName}>`, 'g');
  return promptText.replace(regex, `<${newName}>`);
}

/**
 * Create prompt management functions
 * @param {string} promptText Current prompt text
 * @param {Function} setPromptText Prompt text setter
 * @returns {Object} Prompt management functions
 */
function createPromptFunctions(
  promptText: string,
  setPromptText: (text: string) => void
): Pick<UsePromptReturn, 'insertPlaceholderTag' | 'updatePlaceholdersInPrompt'> {
  return {
    insertPlaceholderTag: createTagInsertionCallback(promptText, setPromptText),
    updatePlaceholdersInPrompt: createPlaceholderUpdateCallback(promptText, setPromptText)
  };
}

/**
 * Process function for full prompt
 * @param {string} text Input text
 * @param {Placeholder[]} placeholders Placeholders
 * @returns {string} Processed text
 */
function processFullPrompt(text: string, placeholders: Placeholder[]): string {
  return processPlaceholders({
    text,
    placeholders,
    filterFn: createFullPromptFilter(),
    transformFn: createFullPromptTransformer()
  });
}

/**
 * Process function for copyable prompt
 * @param {string} text Input text
 * @param {Placeholder[]} placeholders Placeholders
 * @returns {string} Processed text
 */
function processCopyablePrompt(text: string, placeholders: Placeholder[]): string {
  return processPlaceholders({
    text,
    placeholders,
    filterFn: createCopyablePromptFilter(),
    transformFn: createCopyablePromptTransformer()
  });
}

/**
 * Hook factory for generating full prompt
 * @returns {Object} Full prompt generator
 */
function useGenerateFullPrompt(): { generateFullPrompt: (text: string, placeholders: Placeholder[]) => string } {
  const generateFullPrompt = useCallback(processFullPrompt, []);
  return { generateFullPrompt };
}

/**
 * Hook factory for generating copyable prompt
 * @returns {Object} Copyable prompt generator
 */
function useGenerateCopyablePrompt(): { generateCopyablePrompt: (text: string, placeholders: Placeholder[]) => string } {
  const generateCopyablePrompt = useCallback(processCopyablePrompt, []);
  return { generateCopyablePrompt };
}

/**
 * Hook for clipboard operations
 * @returns {Object} Clipboard operations
 */
function useClipboardOps(): { copyToClipboard: (text: string) => Promise<boolean> } {
  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    if (navigator.clipboard) {
      return clipboardApiCopy(text);
    }
    return clipboardFallbackCopy(text);
  }, []);

  return { copyToClipboard };
}

/**
 * Creates prompt generation functions
 * @returns {Object} Prompt generation functions
 */
function usePromptGeneration(): Pick<UsePromptReturn, 'generateFullPrompt' | 'generateCopyablePrompt'> {
  const { generateFullPrompt } = useGenerateFullPrompt();
  const { generateCopyablePrompt } = useGenerateCopyablePrompt();

  return {
    generateFullPrompt,
    generateCopyablePrompt
  };
}

/**
 * Get core state and handlers
 * @returns {Object} Core state and handlers
 */
function useCoreState(): {
  promptText: string;
  handleSetPromptText: (text: string) => void;
  resetPromptText: () => void;
} {
  return usePromptState();
}

/**
 * Get prompt utility functions
 * @param {string} promptText Current text
 * @param {Function} setPromptText Text setter
 * @returns {Object} Utility functions
 */
function usePromptUtils(
  promptText: string,
  setPromptText: (text: string) => void
): Pick<UsePromptReturn, 'insertPlaceholderTag' | 'updatePlaceholdersInPrompt'> {
  return createPromptFunctions(promptText, setPromptText);
}

/**
 * Custom hook for managing prompt text and placeholders
 *
 * @returns {UsePromptReturn} Prompt-related state and functions
 */
export function usePrompt(): UsePromptReturn {
  const state = useCoreState();
  const functions = usePromptUtils(state.promptText, state.handleSetPromptText);
  const generation = usePromptGeneration();
  const clipboard = useClipboardOps();

  return createCombinedHooksObject(state, functions, generation, clipboard);
}
