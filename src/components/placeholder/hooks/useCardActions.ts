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
 * Create a save handler for placeholder changes
 * @param {string} id - Placeholder ID
 * @param {Function|undefined} onUpdate - Update handler
 * @returns {() => void} Save handler function
 */
function createSaveHandler(
  id: string,
  onUpdate?: (id: string, updates: Partial<Placeholder>) => void
): () => void {
  return (): void => {
    if (onUpdate) {
      onUpdate(id, {});
    }
  };
}

/**
 * Create a cancel handler for editing operation
 * @param {string} id - Placeholder ID
 * @param {Function|undefined} onUpdate - Update handler
 * @returns {() => void} Cancel handler function
 */
function createCancelHandler(
  id: string,
  onUpdate?: (id: string, updates: Partial<Placeholder>) => void
): () => void {
  return (): void => {
    if (onUpdate) {
      onUpdate(id, {});
    }
  };
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
    handleSave: createSaveHandler(placeholder.id, onUpdate),
    handleCancel: createCancelHandler(placeholder.id, onUpdate)
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
 * Type for action handler dependencies
 */
type ActionDependencies = {
  onDelete?: (id: string) => void;
  onInsert?: (name: string) => void;
  copyToClipboard?: () => Promise<void>;
  toggleMode?: (id: string) => void;
};

/**
 * Creates delete and insert handlers
 * @param {Placeholder} placeholder - The placeholder to handle
 * @param {ActionDependencies} handlers - Handler dependencies
 * @returns {Object} Delete and insert handlers
 */
function createDataActionHandlers(
  placeholder: Placeholder,
  handlers: ActionDependencies
): Pick<ActionHandlers, 'handleDelete' | 'handleInsert'> {
  const { onDelete, onInsert } = handlers;

  return {
    handleDelete: createDeleteHandler(placeholder, onDelete),
    handleInsert: createInsertHandler(placeholder, onInsert)
  };
}

/**
 * Creates copy and mode toggle handlers
 * @param {Placeholder} placeholder - The placeholder to handle
 * @param {ActionDependencies} handlers - Handler dependencies
 * @returns {Object} Copy and mode toggle handlers
 */
function createUtilityHandlers(
  placeholder: Placeholder,
  handlers: ActionDependencies
): Pick<ActionHandlers, 'handleCopyToClipboard' | 'toggleMode'> {
  const { copyToClipboard, toggleMode } = handlers;

  return {
    handleCopyToClipboard: createCopyHandler(placeholder, copyToClipboard),
    toggleMode: createToggleModeHandler(placeholder, toggleMode)
  };
}

/**
 * Creates handlers from separate handler groups
 * @param {Object} dataHandlers - Data action handlers
 * @param {Object} utilityHandlers - Utility handlers
 * @returns {Object} Combined handlers
 */
function combineActionHandlers(
  dataHandlers: Pick<ActionHandlers, 'handleDelete' | 'handleInsert'>,
  utilityHandlers: Pick<ActionHandlers, 'handleCopyToClipboard' | 'toggleMode'>
): Pick<ActionHandlers, 'handleDelete' | 'handleInsert' | 'handleCopyToClipboard' | 'toggleMode'> {
  return {
    ...dataHandlers,
    ...utilityHandlers
  };
}

/**
 * Creates action handlers for a placeholder
 * @param {Placeholder} placeholder - The placeholder to handle
 * @param {ActionDependencies} handlers - Various handler functions
 * @returns {Object} Action handlers
 */
function createActionHandlers(
  placeholder: Placeholder,
  handlers: ActionDependencies
): Pick<ActionHandlers, 'handleDelete' | 'handleInsert' | 'handleCopyToClipboard' | 'toggleMode'> {
  const dataHandlers = createDataActionHandlers(placeholder, handlers);
  const utilityHandlers = createUtilityHandlers(placeholder, handlers);
  return combineActionHandlers(dataHandlers, utilityHandlers);
}

/**
 * Gets the mode description based on the placeholder mode
 * @param {string} mode - Placeholder mode
 * @returns {string} Mode description
 */
function getModeDescription(mode: string): string {
  return mode === 'tag' ? 'Tag Mode' : 'Replace Mode';
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
     * Gets the description for the current placeholder mode
     * @returns {string} Mode description as a string
     */
    getModeDsc: (): string => getModeDescription(placeholder.mode)
  };
}

/**
 * Combines multiple handler objects into one
 * @param {Object[]} handlerObjects - Array of handler objects
 * @returns {ActionHandlers} Combined handlers object
 */
function combineHandlers(
  ...handlerObjects: Partial<ActionHandlers>[]
): ActionHandlers {
  return Object.assign({}, ...handlerObjects) as ActionHandlers;
}

/**
 * Builds a complete action handlers object
 * @param {Object} updateHandlers - Update handlers
 * @param {Object} actionHandlers - Action handlers
 * @param {Object} modeHandlers - Mode handlers
 * @returns {ActionHandlers} Complete action handlers
 */
function buildActionHandlers(
  updateHandlers: Pick<ActionHandlers, 'handleSave' | 'handleCancel'>,
  actionHandlers: Pick<ActionHandlers, 'handleDelete' | 'handleInsert' | 'handleCopyToClipboard' | 'toggleMode'>,
  modeHandlers: Pick<ActionHandlers, 'getModeDsc'>
): ActionHandlers {
  return combineHandlers(updateHandlers, actionHandlers, modeHandlers);
}

/**
 * Type for handler groups
 */
interface HandlerGroups {
  updateHandlers: Pick<ActionHandlers, 'handleSave' | 'handleCancel'>;
  actionHandlers: Pick<ActionHandlers, 'handleDelete' | 'handleInsert' | 'handleCopyToClipboard' | 'toggleMode'>;
  modeHandlers: Pick<ActionHandlers, 'getModeDsc'>;
}

/**
 * Creates update handlers for the placeholder
 * @param {CardActionsConfig} config - Configuration options
 * @returns {Object} Update handlers
 */
function createUpdateHandlersFromConfig(
  config: CardActionsConfig
): Pick<ActionHandlers, 'handleSave' | 'handleCancel'> {
  return createUpdateHandlers(config.placeholder, config.onUpdate);
}

/**
 * Creates action-related handlers from config
 * @param {CardActionsConfig} config - Configuration options
 * @returns {Object} Action handlers
 */
function createActionHandlersFromConfig(
  config: CardActionsConfig
): Pick<ActionHandlers, 'handleDelete' | 'handleInsert' | 'handleCopyToClipboard' | 'toggleMode'> {
  const { placeholder, onDelete, onInsert, copyToClipboard, toggleMode } = config;
  return createActionHandlers(placeholder, {
    onDelete, onInsert, copyToClipboard, toggleMode
  });
}

/**
 * Creates handlers for different action types
 * @param {CardActionsConfig} config - Configuration options
 * @returns {Object} Different handler types
 */
function createHandlerGroups(config: CardActionsConfig): HandlerGroups {
  return {
    updateHandlers: createUpdateHandlersFromConfig(config),
    actionHandlers: createActionHandlersFromConfig(config),
    modeHandlers: createModeHandlers(config.placeholder)
  };
}

/**
 * Creates action handlers for placeholder cards
 * @param {CardActionsConfig} config - Card actions configuration
 * @returns {ActionHandlers} Action handlers object
 */
export function createActions(config: CardActionsConfig): ActionHandlers {
  const { updateHandlers, actionHandlers, modeHandlers } = createHandlerGroups(config);
  return buildActionHandlers(updateHandlers, actionHandlers, modeHandlers);
}
