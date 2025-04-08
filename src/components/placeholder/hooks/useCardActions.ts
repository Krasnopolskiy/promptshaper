/**
 * Card actions configuration and creation utilities
 *
 * @module components/placeholder/hooks/useCardActions
 */
import { Placeholder } from '@/types';

/**
 * Configuration for card actions
 */
export interface CardActionsConfig {
  /** Placeholder object */
  placeholder: Placeholder;
  /** Update placeholder function */
  onUpdate?: (id: string, updates: Partial<Placeholder>) => void;
  /** Delete placeholder function */
  onDelete?: (id: string) => void;
  /** Insert placeholder function */
  onInsert?: (name: string) => void;
  /** Copy to clipboard function */
  copyToClipboard?: () => Promise<void>;
  /** Toggle placeholder mode */
  toggleMode?: (id: string) => void;
}

/**
 * Interface for action handlers
 */
export interface ActionHandlers {
  /** Save placeholder changes */
  handleSave: () => void;
  /** Cancel editing operation */
  handleCancel: () => void;
  /** Delete placeholder */
  handleDelete: () => void;
  /** Insert placeholder */
  handleInsert: () => void;
  /** Copy placeholder content to clipboard */
  handleCopyToClipboard: () => Promise<void>;
  /** Toggle placeholder mode */
  toggleMode: () => void;
  /** Get mode description */
  getModeDsc: () => string;
}

/**
 * Creates update handlers for a placeholder
 * @param {Placeholder} placeholder - The placeholder to handle
 * @param {Function} onUpdate - Update handler
 * @returns {Object} Update handlers
 */
function createUpdateHandlers(
  placeholder: Placeholder,
  onUpdate?: (id: string, updates: Partial<Placeholder>) => void
): Pick<ActionHandlers, 'handleSave' | 'handleCancel'> {
  return {
    /**
     * Saves the placeholder changes
     */
    handleSave: (): void => {
      if (onUpdate) {
        onUpdate(placeholder.id, {});
      }
    },
    /**
     * Cancels the editing operation
     */
    handleCancel: (): void => {
      if (onUpdate) {
        onUpdate(placeholder.id, {});
      }
    }
  };
}

/**
 * Creates a handler for deleting a placeholder
 * @param {Placeholder} placeholder - The placeholder to handle
 * @param {Function} onDelete - Delete handler
 * @returns {Function} Delete handler
 */
function createDeleteHandler(
  placeholder: Placeholder,
  onDelete?: (id: string) => void
): () => void {
  return (): void => {
    if (onDelete) {
      onDelete(placeholder.id);
    }
  };
}

/**
 * Creates a handler for inserting a placeholder
 * @param {Placeholder} placeholder - The placeholder to handle
 * @param {Function} onInsert - Insert handler
 * @returns {Function} Insert handler
 */
function createInsertHandler(
  placeholder: Placeholder,
  onInsert?: (name: string) => void
): () => void {
  return (): void => {
    if (onInsert) {
      onInsert(placeholder.name);
    }
  };
}

/**
 * Creates a handler for copying to clipboard
 * @param {Placeholder} placeholder - The placeholder to handle
 * @param {Function} copyToClipboard - Copy handler
 * @returns {Function} Copy handler
 */
function createCopyHandler(
  placeholder: Placeholder,
  copyToClipboard?: () => Promise<void>
): () => Promise<void> {
  return async (): Promise<void> => {
    if (copyToClipboard) {
      await copyToClipboard();
    }
  };
}

/**
 * Creates a handler for toggling mode
 * @param {Placeholder} placeholder - The placeholder to handle
 * @param {Function} toggleMode - Toggle mode handler
 * @returns {Function} Toggle mode handler
 */
function createToggleModeHandler(
  placeholder: Placeholder,
  toggleMode?: (id: string) => void
): () => void {
  return (): void => {
    if (toggleMode) {
      toggleMode(placeholder.id);
    }
  };
}

/**
 * Creates action handlers for a placeholder
 * @param {Placeholder} placeholder - The placeholder to handle
 * @param {Object} handlers - Various handler functions
 * @param {Function} handlers.onDelete - Delete handler
 * @param {Function} handlers.onInsert - Insert handler
 * @param {Function} handlers.copyToClipboard - Copy handler
 * @param {Function} handlers.toggleMode - Toggle mode handler
 * @returns {Object} Action handlers
 */
function createActionHandlers(
  placeholder: Placeholder,
  handlers: {
    onDelete?: (id: string) => void;
    onInsert?: (name: string) => void;
    copyToClipboard?: () => Promise<void>;
    toggleMode?: (id: string) => void;
  }
): Pick<ActionHandlers, 'handleDelete' | 'handleInsert' | 'handleCopyToClipboard' | 'toggleMode'> {
  const { onDelete, onInsert, copyToClipboard, toggleMode } = handlers;

  return {
    handleDelete: createDeleteHandler(placeholder, onDelete),
    handleInsert: createInsertHandler(placeholder, onInsert),
    handleCopyToClipboard: createCopyHandler(placeholder, copyToClipboard),
    toggleMode: createToggleModeHandler(placeholder, toggleMode)
  };
}

/**
 * Creates mode-related handlers
 * @param {Placeholder} placeholder - The placeholder to handle
 * @returns {Object} Mode handlers
 */
function createModeHandlers(
  placeholder: Placeholder
): Pick<ActionHandlers, 'getModeDsc'> {
  return {
    /**
     * Gets the mode description
     * @returns {string} Mode description
     */
    getModeDsc: (): string => {
      return placeholder.mode === 'tag' ? 'Tag Mode' : 'Replace Mode';
    }
  };
}

/**
 * Creates action handlers for placeholder cards
 * @param {CardActionsConfig} config - Card actions configuration
 * @returns {ActionHandlers} Action handlers object
 */
export function createActions(config: CardActionsConfig): ActionHandlers {
  const { placeholder, onUpdate, onDelete, onInsert, copyToClipboard, toggleMode } = config;

  const updateHandlers = createUpdateHandlers(placeholder, onUpdate);
  const actionHandlers = createActionHandlers(placeholder, { onDelete, onInsert, copyToClipboard, toggleMode });
  const modeHandlers = createModeHandlers(placeholder);

  return {
    ...updateHandlers,
    ...actionHandlers,
    ...modeHandlers
  };
}
