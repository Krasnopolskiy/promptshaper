/**
 * Module for placeholder action handlers
 * @module components/placeholder/handlers/actionHandlers
 */
import { Placeholder } from '@/types';
import { SaveHandlerParams, createSaveHandler } from './saveHandlers';
import { KeyHandlerParams, createKeyDownHandler } from './keyHandlers';
import {
  createCopyHandler,
  createDeleteHandler,
  createInsertHandler,
  createModeToggleHandler,
  createModeDescriptionGetter
} from './utilHandlers';

/**
 * Type for state from useStateHandlers
 */
export type StateType = {
  isEditing: boolean;
  isExpanded: boolean;
  newName: string;
  newContent: string;
  selectedColor: string;
};

/**
 * Type for handlers from useStateHandlers
 */
export type HandlersType = {
  setIsEditing: (value: boolean) => void;
  setIsExpanded: (value: boolean) => void;
  setNewName: (value: string) => void;
  setNewContent: (value: string) => void;
  setSelectedColor: (value: string) => void;
  resetState: () => void;
};

/**
 * Interface for placeholder action handlers
 */
export interface PlaceholderActionHandlers {
  /** Handler to save changes */
  handleSave: () => void;
  /** Handler to cancel editing */
  handleCancel: () => void;
  /** Handler for keyboard events */
  handleKeyDown: (e: React.KeyboardEvent) => void;
  /** Handler to copy to clipboard */
  handleCopyToClipboard: () => Promise<void>;
  /** Handler to delete placeholder */
  handleDelete: () => void;
  /** Handler to insert placeholder */
  handleInsert: () => void;
  /** Handler to toggle placeholder mode */
  toggleMode: () => void;
  /** Getter for mode description */
  getModeDsc: () => string;
}

/**
 * Interface for action handler creation params
 */
export interface ActionHandlerParams {
  /** Placeholder data */
  placeholder: Placeholder;
  /** Current state */
  state: StateType;
  /** State handlers */
  handlers: HandlersType;
  /** Update callback */
  onUpdate?: (id: string, updates: Partial<Placeholder>) => void;
  /** Delete callback */
  onDelete?: (id: string) => void;
  /** Insert callback */
  onInsert?: (name: string) => void;
}

/**
 * Extracts basic save parameters from action params
 * @param {ActionHandlerParams} params - Action parameters
 * @returns {Pick<SaveHandlerParams, 'id' | 'newName' | 'newContent' | 'selectedColor'>} Basic save parameters
 */
function extractBasicSaveParams(params: ActionHandlerParams): Pick<SaveHandlerParams, 'id' | 'newName' | 'newContent' | 'selectedColor'> {
  const { placeholder, state } = params;
  return {
    id: placeholder.id,
    newName: state.newName,
    newContent: state.newContent,
    selectedColor: state.selectedColor
  };
}

/**
 * Extracts save handler parameters from action params
 * @param {ActionHandlerParams} params - Action parameters
 * @returns {SaveHandlerParams} Save handler parameters
 */
function extractSaveParams(params: ActionHandlerParams): SaveHandlerParams {
  const { onUpdate, handlers } = params;
  return {
    ...extractBasicSaveParams(params),
    updateFn: onUpdate,
    setEditingFn: handlers.setIsEditing
  };
}

/**
 * Creates save handler with parameters
 * @param {ActionHandlerParams} params - Creation parameters
 * @returns {() => void} Save handler
 */
function createSaveHandlerWithParams(params: ActionHandlerParams): () => void {
  const saveParams = extractSaveParams(params);
  return createSaveHandler(saveParams);
}

/**
 * Extracts basic key handler parameters
 * @param {ActionHandlerParams} params - Action parameters
 * @returns {Pick<KeyHandlerParams, 'id' | 'newName' | 'newContent' | 'selectedColor'>} Basic key parameters
 */
function extractBasicKeyParams(params: ActionHandlerParams): Pick<KeyHandlerParams, 'id' | 'newName' | 'newContent' | 'selectedColor'> {
  return extractBasicSaveParams(params);
}

/**
 * Extracts key handler parameters from action params
 * @param {ActionHandlerParams} params - Action parameters
 * @returns {KeyHandlerParams} Key handler parameters
 */
function extractKeyParams(params: ActionHandlerParams): KeyHandlerParams {
  const { onUpdate, handlers } = params;
  return {
    ...extractBasicKeyParams(params),
    updateFn: onUpdate,
    setEditingFn: handlers.setIsEditing,
    resetFn: handlers.resetState
  };
}

/**
 * Creates key handler with parameters
 * @param {ActionHandlerParams} params - Creation parameters
 * @returns {(e: React.KeyboardEvent) => void} Key handler
 */
function createKeyHandlerWithParams(params: ActionHandlerParams): (e: React.KeyboardEvent) => void {
  const keyParams = extractKeyParams(params);
  return createKeyDownHandler(keyParams);
}

/**
 * Creates basic action handlers
 * @param {ActionHandlerParams} params - Handler creation params
 * @returns {Object} Basic action handlers
 */
function createBasicHandlers(
  params: ActionHandlerParams
): Pick<PlaceholderActionHandlers, 'handleSave' | 'handleCancel' | 'handleKeyDown'> {
  return {
    handleSave: createSaveHandlerWithParams(params),
    handleCancel: params.handlers.resetState,
    handleKeyDown: createKeyHandlerWithParams(params)
  };
}

/**
 * Creates clipboard and data handlers
 * @param {ActionHandlerParams} params - Handler creation params
 * @returns {Object} Clipboard and data handlers
 */
function createDataHandlers(
  params: ActionHandlerParams
): Pick<PlaceholderActionHandlers, 'handleCopyToClipboard' | 'handleDelete' | 'handleInsert'> {
  const { placeholder, onDelete, onInsert } = params;

  return {
    handleCopyToClipboard: createCopyHandler(placeholder.name),
    handleDelete: createDeleteHandler(placeholder.id, onDelete),
    handleInsert: createInsertHandler(placeholder.name, onInsert)
  };
}

/**
 * Creates mode toggle handler
 * @param {ActionHandlerParams} params - Handler creation params
 * @returns {Function} Mode toggle handler
 */
function createToggleModeHandler(params: ActionHandlerParams): () => void {
  const { placeholder, onUpdate } = params;
  return createModeToggleHandler(placeholder.id, placeholder.mode, onUpdate);
}

/**
 * Creates mode handlers
 * @param {ActionHandlerParams} params - Handler creation params
 * @returns {Object} Mode handlers
 */
function createModeHandlers(
  params: ActionHandlerParams
): Pick<PlaceholderActionHandlers, 'toggleMode' | 'getModeDsc'> {
  return {
    toggleMode: createToggleModeHandler(params),
    getModeDsc: createModeDescriptionGetter(params.placeholder.mode)
  };
}

/**
 * Creates combined handlers from basic handlers and other handlers
 * @param {ActionHandlerParams} params - Creation parameters
 * @returns {PlaceholderActionHandlers} Combined handlers
 */
function createCombinedHandlers(params: ActionHandlerParams): PlaceholderActionHandlers {
  return {
    ...createBasicHandlers(params),
    ...createDataHandlers(params),
    ...createModeHandlers(params)
  };
}

/**
 * Creates complete action handlers for placeholder card
 * @param {ActionHandlerParams} params - Handler creation params
 * @returns {PlaceholderActionHandlers} Complete action handlers
 */
export function createActionHandlers(
  params: ActionHandlerParams
): PlaceholderActionHandlers {
  return createCombinedHandlers(params);
}
