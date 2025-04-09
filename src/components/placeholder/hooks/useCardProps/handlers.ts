/**
 * Action Handlers Module
 *
 * Helper functions for creating safe action handlers
 *
 * @module components/placeholder/hooks/useCardProps/handlers
 */
import { createSafeHandler } from './processHandlers';

/**
 * Creates a safe handler from a key in an object
 * @param {Record<string, unknown>} obj - Object containing handlers
 * @param {string} key - Handler key to extract
 * @returns {() => void} Safe handler function
 */
export function createSafeHandlerFromKey(
  obj: Record<string, unknown>,
  key: string
): () => void {
  return createSafeHandler(obj[key]);
}

/**
 * Creates delete handler
 * @param {Record<string, unknown>} obj - Source object
 * @returns {() => void} Delete handler
 */
export function createDeleteHandler(obj: Record<string, unknown>): () => void {
  return createSafeHandlerFromKey(obj, 'handleDelete');
}

/**
 * Creates duplicate handler
 * @param {Record<string, unknown>} obj - Source object
 * @returns {() => void} Duplicate handler
 */
export function createDuplicateHandler(obj: Record<string, unknown>): () => void {
  return createSafeHandlerFromKey(obj, 'handleDuplicate');
}

/**
 * Creates flip handler
 * @param {Record<string, unknown>} obj - Source object
 * @returns {() => void} Flip handler
 */
export function createFlipHandler(obj: Record<string, unknown>): () => void {
  return createSafeHandlerFromKey(obj, 'handleFlip');
}

/**
 * Handler object type
 */
export type ActionHandlers = {
  handleDelete: () => void;
  handleDuplicate: () => void;
  handleFlip: () => void;
};

/**
 * Creates a handlers object with standard action handlers
 * @param {Record<string, unknown>} obj - Source object with handlers
 * @returns {ActionHandlers} Object with safe handlers
 */
export function createActionHandlers(obj: Record<string, unknown>): ActionHandlers {
  return {
    handleDelete: createDeleteHandler(obj),
    handleDuplicate: createDuplicateHandler(obj),
    handleFlip: createFlipHandler(obj)
  };
}

/**
 * Prepare safe handlers with delete, duplicate and flip functionality
 * @param {unknown} handlers - Raw handlers
 * @returns {ActionHandlers} Safe handlers
 */
export function prepareSafeHandlers(handlers: unknown): ActionHandlers {
  const obj = (handlers || {}) as Record<string, unknown>;
  return createActionHandlers(obj);
}
