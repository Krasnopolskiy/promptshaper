import type { UseMainFunctionsOptions } from './useMainFunctionsTypes';

/**
 * Calculates insertion position based on device and cursor
 * @param {boolean} isMobile - Whether device is mobile
 * @param {number} promptLength - Length of current prompt text
 * @param {number} cursorPosition - Current cursor position
 * @returns {number} Calculated insertion position
 */
function calculateInsertionPosition(
  isMobile: boolean,
  promptLength: number,
  cursorPosition: number
): number {
  return isMobile ? promptLength : cursorPosition || 0;
}

/**
 * Handles mobile-specific actions after insertion
 * @param {boolean} isMobile - Whether device is mobile
 * @param {Function} setActivePanel - Function to set active panel
 * @param {Function} showToast - Function to show toast
 * @param {string} name - Placeholder name
 * @returns {void}
 */
function handleMobileInsertion(
  isMobile: boolean,
  setActivePanel: (panel: 'placeholders' | 'editor' | 'preview') => void,
  showToast: (name: string) => void,
  name: string
): void {
  if (!isMobile) return;
  setActivePanel('editor');
  showToast(name);
}

/**
 * Performs placeholder insertion at given position
 * @param {string} name - Placeholder name
 * @param {number} position - Insertion position
 * @param {Function} insertTag - Tag insertion function
 * @returns {void}
 */
function performInsertion(
  name: string,
  position: number,
  insertTag: (name: string, position: number) => number
): void {
  insertTag(name, position);
}

/**
 * Get insertion position for placeholder
 * @param {Object} options - Options
 * @returns {number} Position to insert
 */
function getInsertPosition(
  options: Pick<UseMainFunctionsOptions, 'isMobile' | 'promptText' | 'cursorPosition'>
): number {
  return calculateInsertionPosition(
    options.isMobile,
    options.promptText.length,
    options.cursorPosition
  );
}

/**
 * Handle post-insertion actions
 * @param {Object} options - Options
 * @param {string} name - Placeholder name
 */
function handlePostInsertion(
  options: Pick<UseMainFunctionsOptions, 'isMobile' | 'setActivePanel' | 'showInsertionToast'>,
  name: string
): void {
  if (!options.isMobile) return;
  options.setActivePanel('editor');
  options.showInsertionToast(name);
}

export const insertionHelpers = {
  calculateInsertionPosition,
  handleMobileInsertion,
  performInsertion,
  getInsertPosition,
  handlePostInsertion
};
