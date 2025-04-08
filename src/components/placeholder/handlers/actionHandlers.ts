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
 * Creates save handler with parameters
 * @param {ActionHandlerParams} params - Creation parameters
 * @returns {() => void} Save handler
 */
function createSaveHandlerWithParams(
  params: ActionHandlerParams
): () => void {
  const { placeholder, state, onUpdate, handlers } = params;

  const saveParams: SaveHandlerParams = {
    id: placeholder.id,
    newName: state.newName,
    newContent: state.newContent,
    selectedColor: state.selectedColor,
    updateFn: onUpdate,
    setEditingFn: handlers.setIsEditing
  };

  return createSaveHandler(saveParams);
}

/**
 * Creates key handler with parameters
 * @param {ActionHandlerParams} params - Creation parameters
 * @returns {(e: React.KeyboardEvent) => void} Key handler
 */
function createKeyHandlerWithParams(
  params: ActionHandlerParams
): (e: React.KeyboardEvent) => void {
  const { placeholder, state, onUpdate, handlers } = params;

  const keyParams: KeyHandlerParams = {
    id: placeholder.id,
    newName: state.newName,
    newContent: state.newContent,
    selectedColor: state.selectedColor,
    updateFn: onUpdate,
    setEditingFn: handlers.setIsEditing,
    resetFn: handlers.resetState
  };

  return createKeyDownHandler(keyParams);
}

/**
 * Creates complete action handlers for placeholder card
 * @param {ActionHandlerParams} params - Handler creation params
 * @returns {PlaceholderActionHandlers} Complete action handlers
 */
export function createActionHandlers(
  params: ActionHandlerParams
): PlaceholderActionHandlers {
  const { placeholder, handlers, onDelete, onInsert, onUpdate } = params;

  return {
    handleSave: createSaveHandlerWithParams(params),
    handleCancel: handlers.resetState,
    handleKeyDown: createKeyHandlerWithParams(params),
    handleCopyToClipboard: createCopyHandler(placeholder.name),
    handleDelete: createDeleteHandler(placeholder.id, onDelete),
    handleInsert: createInsertHandler(placeholder.name, onInsert),
    toggleMode: createModeToggleHandler(
      placeholder.id,
      placeholder.mode,
      onUpdate
    ),
    getModeDsc: createModeDescriptionGetter(placeholder.mode)
  };
}
