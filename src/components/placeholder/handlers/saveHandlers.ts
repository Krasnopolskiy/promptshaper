/**
 * Module for placeholder save handlers
 * @module components/placeholder/handlers/saveHandlers
 */
import { Placeholder } from '@/types';

/**
 * Creates name update for the placeholder
 * @param {string} newName - Updated name
 * @returns {Partial<Placeholder>} Partial payload with name
 */
export function createNameUpdate(newName: string): Partial<Placeholder> {
  return { name: newName };
}

/**
 * Creates content update for the placeholder
 * @param {string} newContent - Updated content
 * @returns {Partial<Placeholder>} Partial payload with content
 */
export function createContentUpdate(newContent: string): Partial<Placeholder> {
  return { content: newContent };
}

/**
 * Creates color update for the placeholder
 * @param {string} selectedColor - Updated color
 * @returns {Partial<Placeholder>} Partial payload with color
 */
export function createColorUpdate(selectedColor: string): Partial<Placeholder> {
  return { color: selectedColor };
}

/**
 * Creates combined payload object
 * @param {Partial<Placeholder>[]} updates - Array of partial updates
 * @returns {Partial<Placeholder>} Combined update payload
 */
export function combineUpdates(...updates: Partial<Placeholder>[]): Partial<Placeholder> {
  return Object.assign({}, ...updates);
}

/**
 * Creates update payload for the placeholder
 * @param {string} newName - Updated name
 * @param {string} newContent - Updated content
 * @param {string} selectedColor - Updated color
 * @returns {Partial<Placeholder>} Payload for update
 */
export function createUpdatePayload(
  newName: string,
  newContent: string,
  selectedColor: string
): Partial<Placeholder> {
  const nameUpdate = createNameUpdate(newName);
  const contentUpdate = createContentUpdate(newContent);
  const colorUpdate = createColorUpdate(selectedColor);

  return combineUpdates(nameUpdate, contentUpdate, colorUpdate);
}

/**
 * Executes update function if provided
 * @param {string} id - Placeholder ID
 * @param {Partial<Placeholder>} updates - Placeholder updates
 * @param {Function|undefined} updateFn - Update function
 */
export function executeUpdate(
  id: string,
  updates: Partial<Placeholder>,
  updateFn?: (id: string, updates: Partial<Placeholder>) => void
): void {
  if (updateFn) {
    updateFn(id, updates);
  }
}

/**
 * Exits editing mode if function provided
 * @param {Function|undefined} setEditingFn - Set editing state function
 */
export function exitEditMode(
  setEditingFn?: (value: boolean) => void
): void {
  if (setEditingFn) {
    setEditingFn(false);
  }
}

/**
 * Updates placeholder and exits edit mode
 * @param {string} id - Placeholder ID
 * @param {Partial<Placeholder>} updates - Placeholder updates
 * @param {Function|undefined} updateFn - Update function
 * @param {Function|undefined} setEditingFn - Set editing state function
 */
export function updatePlaceholder(
  id: string,
  updates: Partial<Placeholder>,
  updateFn?: (id: string, updates: Partial<Placeholder>) => void,
  setEditingFn?: (value: boolean) => void
): void {
  executeUpdate(id, updates, updateFn);
  exitEditMode(setEditingFn);
}

/**
 * Type for a save handler function
 */
export type SaveHandlerFn = () => void;

/**
 * Interface for save handler parameters
 */
export interface SaveHandlerParams {
  /** Placeholder ID */
  id: string;
  /** New name for the placeholder */
  newName: string;
  /** New content for the placeholder */
  newContent: string;
  /** Selected color for the placeholder */
  selectedColor: string;
  /** Update function */
  updateFn?: (id: string, updates: Partial<Placeholder>) => void;
  /** Function to set editing state */
  setEditingFn?: (value: boolean) => void;
}

/**
 * Creates handler for saving placeholder updates
 * @param {SaveHandlerParams} params - Save handler parameters
 * @returns {SaveHandlerFn} Save handler function
 */
export function createSaveHandler(
  params: SaveHandlerParams
): SaveHandlerFn {
  const { id, newName, newContent, selectedColor, updateFn, setEditingFn } = params;

  return (): void => {
    const updates = createUpdatePayload(newName, newContent, selectedColor);
    updatePlaceholder(id, updates, updateFn, setEditingFn);
  };
}
