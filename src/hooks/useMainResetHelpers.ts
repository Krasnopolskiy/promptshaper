import type { UseMainFunctionsOptions } from './useMainFunctionsTypes';

/**
 * Resets text-related state
 * @param {Function} resetText - Function to reset text
 * @param {Function} setFull - Function to set full prompt
 * @param {Function} setCopyable - Function to set copyable prompt
 */
function resetTextState(
  resetText: () => void,
  setFull: (text: string) => void,
  setCopyable: (text: string) => void
): void {
  resetText();
  setFull('');
  setCopyable('');
}

/**
 * Resets app structure
 * @param {Function} clearPlaceholders - Function to clear placeholders
 * @param {Function} resetSizes - Function to reset panel sizes
 */
function resetAppStructure(
  clearPlaceholders: () => void,
  resetSizes: () => void
): void {
  clearPlaceholders();
  resetSizes();
}

/**
 * Reset text state from options
 * @param {Object} options - Options with text functions
 */
function resetTextFromOptions(
  options: Pick<UseMainFunctionsOptions, 'resetPromptText' | 'setFullPrompt' | 'setCopyablePrompt'>
): void {
  resetTextState(
    options.resetPromptText,
    options.setFullPrompt,
    options.setCopyablePrompt
  );
}

/**
 * Reset structure from options
 * @param {Object} options - Options with structure functions
 */
function resetStructureFromOptions(
  options: Pick<UseMainFunctionsOptions, 'clearPlaceholders' | 'resetPanelSizes'>
): void {
  resetAppStructure(
    options.clearPlaceholders,
    options.resetPanelSizes
  );
}

/**
 * Process full app reset
 * @param {Object} options - Reset options
 */
function processReset(
  options: Pick<
    UseMainFunctionsOptions,
    'resetPromptText' | 'clearPlaceholders' | 'resetPanelSizes' |
    'setFullPrompt' | 'setCopyablePrompt'
  >
): void {
  resetTextFromOptions(options);
  resetStructureFromOptions(options);
}

export const resetHelpers = {
  resetTextState,
  resetAppStructure,
  resetTextFromOptions,
  resetStructureFromOptions,
  processReset
};
