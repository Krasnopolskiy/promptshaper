import { Placeholder } from '@/types';
import { HandlerProps } from '../types';

/**
 * Creates a clipboard handler for copying placeholder tag
 * @param {string} name - Placeholder name
 * @returns {() => Promise<void>} Clipboard handler function
 */
function createClipboardHandler(name: string): () => Promise<void> {
  return async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(`<${name}>`);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };
}

/**
 * Creates basic handlers for placeholder operations
 * @param {Placeholder} placeholder - Placeholder data
 * @param {HandlerProps} handlers - Handler functions
 * @returns {Object} Basic handlers for delete and insert operations
 */
function createBasicHandlers(
  placeholder: Placeholder,
  handlers: HandlerProps
): { handleDelete: () => void; handleInsert: () => void } {
  const { onDelete, onInsert } = handlers;
  return {
    /**
     * Handles deleting the placeholder
     * @returns {void} Nothing
     */
    handleDelete: () => onDelete(placeholder.id),
    /**
     * Handles inserting the placeholder
     * @returns {void} Nothing
     */
    handleInsert: () => onInsert?.(placeholder.name)
  };
}

/**
 * Creates action handlers for placeholder operations
 * @param {Placeholder} placeholder - Placeholder data
 * @param {HandlerProps} handlers - Handler functions
 * @returns {Object} Action handlers for clipboard, delete, and insert operations
 */
export function createActionHandlers(
  placeholder: Placeholder,
  handlers: HandlerProps
): {
  handleCopyToClipboard: () => Promise<void>;
  handleDelete: () => void;
  handleInsert: () => void;
} {
  return { handleCopyToClipboard: createClipboardHandler(placeholder.name), ...createBasicHandlers(placeholder, handlers) };
}
