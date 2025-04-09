/**
 * Process Handlers Module
 *
 * Helper functions for processing handlers in card props
 *
 * @module components/placeholder/hooks/useCardProps/processHandlers
 */
import { noop } from 'util/functions';
import { createClipboardHandler, processInputChangeHandler, processEditHandlers } from './utils';

/**
 * Process input handler
 * @param {unknown} handler - Input handler
 * @returns {unknown} Processed handler
 */
export function processInputHandler(handler: unknown): unknown {
  return processInputChangeHandler(handler as () => void);
}

/**
 * Process edit handlers
 * @param {unknown} acceptHandler - Accept handler
 * @param {unknown} cancelHandler - Cancel handler
 * @returns {Object} Edit handlers
 */
export function processEditHandlers2(
  acceptHandler: unknown,
  cancelHandler: unknown
): Record<string, unknown> {
  return processEditHandlers(
    acceptHandler as () => void,
    cancelHandler as () => void
  );
}

/**
 * Process input and edit handlers
 * @param {unknown} input - Input handler
 * @param {unknown} accept - Accept handler
 * @param {unknown} cancel - Cancel handler
 * @returns {Object} Processed handlers
 */
export function processHandlers(
  input: unknown, accept: unknown, cancel: unknown
): Record<string, unknown> {
  const inputHandler = processInputHandler(input);
  const editHandlers = processEditHandlers2(accept, cancel);
  return { inputHandler, ...editHandlers };
}

/**
 * Process copy handler for card
 * @param {Function} handleCopy - Copy handler
 * @returns {Function} Processed copy handler
 */
export function processCopy(handleCopy: unknown): unknown {
  return handleCopy ? createClipboardHandler(handleCopy as () => void) : noop;
}

/**
 * Create processed handlers object
 * @param {unknown} clickHandler - Card click handler
 * @param {unknown} copyHandler - Copy handler
 * @returns {Record<string, unknown>} Partial handlers object
 */
export function createBaseHandlers(
  clickHandler: unknown,
  copyHandler: unknown
): Record<string, unknown> {
  return {
    handleCardClick: clickHandler,
    handleCopy: copyHandler
  };
}

/**
 * Add input handlers to base handlers
 * @param {Record<string, unknown>} baseHandlers - Base handlers object
 * @param {Record<string, unknown>} processed - Processed handlers
 * @returns {Record<string, unknown>} Complete handlers object
 */
export function addInputHandlers(
  baseHandlers: Record<string, unknown>,
  processed: Record<string, unknown>
): Record<string, unknown> {
  return {
    ...baseHandlers,
    handleInputChange: processed.inputHandler,
    ...processed
  };
}

/**
 * Create handlers result object
 * @param {unknown} clickHandler - Click handler
 * @param {unknown} copyHandler - Copy handler
 * @param {Record<string, unknown>} processed - Processed handlers
 * @returns {Record<string, unknown>} Handlers object
 */
export function createHandlersResult(
  clickHandler: unknown,
  copyHandler: unknown,
  processed: Record<string, unknown>
): Record<string, unknown> {
  const baseHandlers = createBaseHandlers(clickHandler, copyHandler);
  return addInputHandlers(baseHandlers, processed);
}

/**
 * Creates handlers object for card props
 * @param {Object} handlers - Raw handler functions
 * @returns {Object} Processed handlers object
 */
export function createHandlersObject(handlers: Record<string, unknown>): Record<string, unknown> {
  const copyHandler = processCopy(handlers.handleCopy);
  const processed = processHandlers(
    handlers.handleInputChange,
    handlers.handleEditAccept,
    handlers.handleEditCancel
  );
  return createHandlersResult(handlers.handleCardClick, copyHandler, processed);
}

/**
 * Safe handler creator
 * @param {unknown} handler - Original handler
 * @returns {() => void} Safe handler function
 */
export const createSafeHandler = (handler: unknown): (() => void) => {
  return typeof handler === 'function' ? handler as (() => void) : (): void => {};
};
