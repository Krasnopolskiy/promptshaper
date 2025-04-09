/**
 * Module for placeholder utility handlers
 * @module components/placeholder/handlers/utilHandlers
 */
import { Placeholder } from '@/types';

/** Valid placeholder modes */
type PlaceholderMode = 'replace' | 'tag';

/**
 * Creates copy to clipboard handler
 * @param {string} name - Placeholder name
 * @returns {Function} Copy handler function
 */
export function createCopyHandler(name: string): () => Promise<void> {
  return async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(`<${name}>`);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };
}

/**
 * Creates delete handler function
 * @param {string} id - Placeholder ID
 * @param {Function|undefined} deleteFn - Delete callback function
 * @returns {Function} Delete handler function
 */
export function createDeleteHandler(
  id: string,
  deleteFn?: (id: string) => void
): () => void {
  return (): void => {
    if (deleteFn) {
      deleteFn(id);
    }
  };
}

/**
 * Creates insert handler function
 * @param {string} name - Placeholder name
 * @param {Function|undefined} insertFn - Insert callback function
 * @returns {Function} Insert handler function
 */
export function createInsertHandler(
  name: string,
  insertFn?: (name: string) => void
): () => void {
  return (): void => {
    if (insertFn) {
      insertFn(name);
    }
  };
}

/**
 * Gets the opposite mode value
 * @param {PlaceholderMode} currentMode - Current mode value
 * @returns {PlaceholderMode} Opposite mode value
 */
export function getOppositeMode(currentMode: PlaceholderMode): PlaceholderMode {
  return currentMode === 'replace' ? 'tag' : 'replace';
}

/**
 * Creates mode toggle handler function
 * @param {string} id - Placeholder ID
 * @param {PlaceholderMode|undefined} currentMode - Current mode value
 * @param {Function|undefined} updateFn - Update callback function
 * @returns {Function} Mode toggle handler function
 */
export function createModeToggleHandler(
  id: string,
  currentMode: PlaceholderMode | undefined,
  updateFn?: (id: string, updates: Partial<Placeholder>) => void
): () => void {
  const mode = currentMode || 'replace';
  return (): void => updateFn?.(id, { mode: getOppositeMode(mode) });
}

/**
 * Creates mode description for replace mode
 * @returns {string} Replace mode description
 */
export function getReplaceModeDescription(): string {
  return "Replace Mode: Placeholder will be replaced with its content";
}

/**
 * Creates mode description for tag mode
 * @returns {string} Tag mode description
 */
export function getTagModeDescription(): string {
  return "Tag Mode: Content will be displayed between opening and closing tags";
}

/**
 * Creates mode description getter function
 * @param {string|undefined} mode - Current mode value
 * @returns {Function} Mode description getter function
 */
export function createModeDescriptionGetter(
  mode: string | undefined
): () => string {
  return (): string => {
    const currentMode = mode || 'replace';
    return currentMode === 'replace'
      ? getReplaceModeDescription()
      : getTagModeDescription();
  };
}
