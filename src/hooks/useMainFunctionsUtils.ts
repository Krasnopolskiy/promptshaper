import { useCallback } from 'react';
import type { UseMainFunctionsOptions } from './useMainFunctionsTypes';
import { insertionHelpers } from './useMainFunctionsHelpers';
import { resetHelpers } from './useMainResetHelpers';

// Extract needed helper functions
const {
  getInsertPosition,
  performInsertion,
  handlePostInsertion
} = insertionHelpers;

const { processReset } = resetHelpers;

// Type definition for insertion options
type InsertOptions = Pick<
  UseMainFunctionsOptions,
  'isMobile' | 'promptText' | 'cursorPosition' |
  'insertPlaceholderTag' | 'setActivePanel' | 'showInsertionToast'
>;

// Type definition for reset options
type ResetOptions = Pick<
  UseMainFunctionsOptions,
  'resetPromptText' | 'clearPlaceholders' | 'resetPanelSizes' |
  'setFullPrompt' | 'setCopyablePrompt'
>;

/**
 * Process placeholder insertion
 * @param {string} name - Name to insert
 * @param {Object} options - Insertion options
 */
function handleInsertion(name: string, options: InsertOptions): void {
  const position = getInsertPosition(options);
  performInsertion(name, position, options.insertPlaceholderTag);
  handlePostInsertion(options, name);
}

/**
 * Creates insertion handler
 * @param {Object} options - Handler options
 * @returns {Function} Insertion function
 */
export function useInsertPlaceholderHandler(options: InsertOptions): (name: string) => void {
  return useCallback(
    (name: string): void => handleInsertion(name, options),
    [options]
  );
}

/**
 * Handles copying content and showing a toast notification
 * @param {Object} options Options with copy and toast functions
 * @returns {Promise<void>} Copy operation result
 */
async function handleCopyAndToast(
  options: Pick<UseMainFunctionsOptions, 'copyToClipboard' | 'showCopyToast' | 'handleCopy' | 'copyablePrompt'>
): Promise<void> {
  if (options.handleCopy && options.copyablePrompt) {
    await options.handleCopy(options.copyablePrompt);
  } else {
    options.copyToClipboard('#prompt');
  }
  options.showCopyToast();
}

/**
 * Creates copy handler
 * @param {Object} options - Copy options
 * @returns {Function} Copy function that returns a Promise
 */
export function useCopyHandler(
  options: Pick<UseMainFunctionsOptions, 'copyToClipboard' | 'showCopyToast' | 'handleCopy' | 'copyablePrompt'>
): () => Promise<void> {
  return useCallback(
    async (): Promise<void> => handleCopyAndToast(options),
    [options]
  );
}

/**
 * Creates reset handler
 * @param {Object} options - Reset options
 * @returns {Function} Reset function
 */
export function useResetHandler(options: ResetOptions): () => void {
  return useCallback(
    (): void => processReset(options),
    [options]
  );
}
