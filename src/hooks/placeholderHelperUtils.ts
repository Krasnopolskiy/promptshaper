/**
 * Placeholder Helper Utilities
 *
 * Utilities for placeholder management
 */
import { Placeholder } from '@/types';
import { PLACEHOLDER_COLORS } from '@/hooks/usePlaceholders';

/**
 * Helper function to find a placeholder by name
 * @param {Placeholder[]} placeholders List of placeholders
 * @param {string} name Name to find
 * @returns {Placeholder | undefined} Found placeholder or undefined
 */
export function findPlaceholderByName(
  placeholders: Placeholder[],
  name: string
): Placeholder | undefined {
  return placeholders.find(p => p.name === name);
}

/**
 * Check if placeholder is empty and can be deleted
 * @param {Placeholder | undefined} placeholder The placeholder to check
 * @returns {boolean} True if the placeholder should be deleted
 */
export function shouldDeletePlaceholder(placeholder: Placeholder | undefined): boolean {
  return Boolean(placeholder && placeholder.content === '');
}

/**
 * Execute placeholder deletion
 * @param {Placeholder | undefined} placeholder Placeholder to delete
 * @param {(id: string) => void} deletePlaceholder Deletion function
 */
export function executeDeletion(
  placeholder: Placeholder | undefined,
  deletePlaceholder: (id: string) => void
): void {
  if (shouldDeletePlaceholder(placeholder)) {
    deletePlaceholder(placeholder.id);
  }
}

/**
 * Handle placeholder at negative position (deletion case)
 * @param {string} name Placeholder name
 * @param {(name: string) => number} handlePlaceholderDeletion Deletion handler
 * @returns {number} Result value (-1)
 */
export function handleNegativePosition(
  name: string,
  handlePlaceholderDeletion: (name: string) => number
): number {
  return handlePlaceholderDeletion(name);
}

/**
 * Process position to return appropriate value
 * @param {number} position Current position
 * @param {string} name Placeholder name
 * @param {(name: string) => number} deletionHandler Deletion handler
 * @param {(name: string, position: number) => number} addHandler Add/insert handler
 * @returns {number} Result position
 */
export function processPosition(
  position: number,
  name: string,
  deletionHandler: (name: string) => number,
  addHandler: (name: string, position: number) => number
): number {
  return position === -1
    ? handleNegativePosition(name, deletionHandler)
    : addHandler(name, position);
}

/**
 * Check if placeholder exists, add if it doesn't
 * @param {Placeholder[]} placeholders List of placeholders
 * @param {string} name Placeholder name
 * @param {(name: string) => void} addPlaceholderWithRandomColor Function to add placeholder
 */
export function ensurePlaceholderExists(
  placeholders: Placeholder[],
  name: string,
  addPlaceholderWithRandomColor: (name: string) => void
): void {
  const existingPlaceholder = findPlaceholderByName(placeholders, name);
  if (!existingPlaceholder) {
    addPlaceholderWithRandomColor(name);
  }
}

/**
 * Process add for placeholder
 * @param {Placeholder[]} placeholders Current placeholders
 * @param {(name: string) => void} addFunc Add function
 * @param {string} name Name to process
 */
export function processAdd(
  placeholders: Placeholder[],
  addFunc: (name: string) => void,
  name: string
): void {
  ensurePlaceholderExists(placeholders, name, addFunc);
}

/**
 * Simplified add or insert callback
 * @param {object} params Processing parameters
 * @param {Placeholder[]} params.placeholders Current placeholders
 * @param {(name: string) => void} params.addFunc Add function
 * @param {(name: string, position: number) => number} params.insertFunc Insert function
 * @param {string} params.name Name to process
 * @param {number} params.position Position for insertion
 * @returns {number} Result position
 */
export function processAddOrInsert(params: {
  placeholders: Placeholder[],
  addFunc: (name: string) => void,
  insertFunc: (name: string, position: number) => number,
  name: string,
  position: number
}): number {
  processAdd(params.placeholders, params.addFunc, params.name);
  return params.insertFunc(params.name, params.position);
}

/**
 * Get random color from available colors
 * @returns {string} Random color
 */
export function getRandomColor(): string {
  return PLACEHOLDER_COLORS[Math.floor(Math.random() * PLACEHOLDER_COLORS.length)];
}

/**
 * Position handler parameter type
 */
export type PositionHandlerParams = {
  setCursorPosition: React.Dispatch<React.SetStateAction<number>>,
  handlePlaceholderDeletion: (name: string) => number,
  handlePlaceholderAddOrInsert: (name: string, position: number) => number
};

/**
 * Create parameters object
 * @param {React.Dispatch<React.SetStateAction<number>>} setCursorPosition Cursor position setter
 * @param {(name: string) => number} handleDeletion Deletion handler
 * @param {(name: string, position: number) => number} addOrInsert Add/insert handler
 * @returns {PositionHandlerParams} Handler params object
 */
export function createPositionHandlerParams(
  setCursorPosition: React.Dispatch<React.SetStateAction<number>>,
  handleDeletion: (name: string) => number,
  addOrInsert: (name: string, position: number) => number
): PositionHandlerParams {
  return { setCursorPosition, handlePlaceholderDeletion: handleDeletion, handlePlaceholderAddOrInsert: addOrInsert };
}
