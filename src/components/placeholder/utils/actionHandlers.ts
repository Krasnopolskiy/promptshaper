/**
 * Action handlers for placeholder cards
 *
 * @module components/placeholder/utils/actionHandlers
 */
import React from 'react';
import { Placeholder } from '@/types';
import {
  StateHandlers,
  createInitialState,
  createUtilityHandlers,
  shouldProceedWithSave,
  extractStateProps,
  createUpdatePayload,
  handleNameUpdateIfChanged,
  getModeDescription,
  createModeToggler
} from './';

/**
 * Save handler options type
 */
export interface SaveHandlerOptions {
  /** Placeholder data */
  placeholder: Placeholder;
  /** New name value */
  newName: string;
  /** New content value */
  newContent: string;
  /** Selected color value */
  selectedColor: string;
  /** Update function */
  onUpdate: (id: string, updates: Partial<Placeholder>) => void;
  /** Name change handler (optional) */
  onNameChange?: (oldName: string, newName: string) => void;
  /** Set editing state function (optional) */
  setIsEditing?: (editing: boolean) => void;
}

/**
 * Action handler props
 */
export interface ActionHandlerProps {
  /** Placeholder data */
  placeholder: Placeholder;
  /** Current component state */
  state: ReturnType<typeof createInitialState>;
  /** Function to update placeholder */
  onUpdate: (id: string, updates: Partial<Placeholder>) => void;
  /** Function to delete placeholder */
  onDelete: (id: string) => void;
  /** Function to insert placeholder (optional) */
  onInsert?: (name: string) => void;
  /** Function to handle name changes (optional) */
  onNameChange?: (oldName: string, newName: string) => void;
  /** State handlers */
  stateHandlers: StateHandlers;
}

/**
 * Action handlers return type
 */
export interface ActionHandlers {
  /** Handler for save operation */
  handleSave: () => void;
  /** Handler for cancel operation */
  handleCancel: () => void;
  /** Handler for keydown events */
  handleKeyDown: (e: React.KeyboardEvent) => void;
  /** Handler for copying to clipboard */
  handleCopyToClipboard: () => Promise<void>;
  /** Handler for delete operation */
  handleDelete: () => void;
  /** Handler for insert operation */
  handleInsert: () => void;
  /** Handler for toggling mode */
  toggleMode: () => void;
  /** Handler for getting mode description */
  getModeDsc: () => string;
}

/**
 * Placeholder action props interface
 */
export interface PlaceholderActionProps {
  /** Placeholder data */
  placeholder: Placeholder;
  /** Current component state */
  state: ReturnType<typeof createInitialState>;
  /** Function to update placeholder */
  onUpdate: (id: string, updates: Partial<Placeholder>) => void;
  /** Function to delete placeholder */
  onDelete: (id: string) => void;
  /** Function to insert placeholder (optional) */
  onInsert?: (name: string) => void;
  /** Close function */
  onClose?: () => void;
  /** Mode change function */
  onModeChange?: (mode: string) => void;
  /** Name change function */
  onNameChange?: (oldName: string, newName: string) => void;
  /** State handlers */
  stateHandlers: StateHandlers;
}

/**
 * Placeholder name change data
 */
interface PlaceholderNameData {
  /** The placeholder being updated */
  placeholder: Placeholder;
  /** The new name to apply */
  newName: string;
  /** Optional callback for name changes */
  onNameChange?: (oldName: string, newName: string) => void;
}

/**
 * Handles name changes for a placeholder
 * Updates name if necessary and notifies via callback
 * @param {PlaceholderNameData} data - Name change data object
 * @returns {void} Nothing
 */
export function handlePlaceholderNameChange(
  data: PlaceholderNameData
): void {
  const { placeholder, newName, onNameChange } = data;
  handleNameUpdateIfChanged(placeholder, newName, onNameChange);
}

/**
 * Update data parameters
 */
interface UpdateDataParams {
  /** The new name to use */
  newName: string;
  /** The new content to use */
  newContent: string;
  /** The selected color to use */
  selectedColor: string;
}

/**
 * Creates update data for placeholder
 * Builds a partial placeholder object with updated fields
 * @param {UpdateDataParams} options - Data options
 * @returns {Partial<Placeholder>} Update payload
 */
export function createPlaceholderUpdateData(
  options: UpdateDataParams
): Partial<Placeholder> {
  return createUpdatePayload(
    options.newName,
    options.newContent,
    options.selectedColor
  );
}

/**
 * Prepares update payload and applies name changes
 * @param {SaveHandlerOptions} options - Handler options
 * @returns {Partial<Placeholder>} Update data
 */
export function prepareUpdateData(
  options: SaveHandlerOptions
): Partial<Placeholder> {
  handlePlaceholderNameChange(options);
  return createPlaceholderUpdateData(options);
}

/**
 * Executes placeholder update operation
 * @param {SaveHandlerOptions} options - Handler options
 * @param {Partial<Placeholder>} updates - Update data
 * @returns {void} Nothing
 */
export function executePlaceholderUpdate(
  options: SaveHandlerOptions,
  updates: Partial<Placeholder>
): void {
  options.onUpdate(options.placeholder.id, updates);
}

/**
 * Performs placeholder update
 * @param {SaveHandlerOptions} options - Handler options
 * @returns {void} Nothing
 */
export function updatePlaceholder(options: SaveHandlerOptions): void {
  const updates = prepareUpdateData(options);
  executePlaceholderUpdate(options, updates);
}

/**
 * Creates a save handler function
 * @param {SaveHandlerOptions} options - Handler options
 * @returns {Function} Save handler function
 */
export function createSaveHandler(options: SaveHandlerOptions): () => void {
  return (): void => {
    if (!shouldProceedWithSave(options.newName)) return;
    updatePlaceholder(options);
    if (options.setIsEditing) options.setIsEditing(false);
  };
}

/**
 * Creates a handler config object with placeholder info
 * @param {ActionHandlerProps} props - Action handler props
 * @returns {Object} Handler config object with placeholder
 */
export function createHandlerConfig(
  props: ActionHandlerProps
): Pick<SaveHandlerOptions, 'placeholder'> {
  return { placeholder: props.placeholder };
}

/**
 * Creates save handler config with needed properties
 * @param {ActionHandlerProps} props - Action handler props
 * @returns {Object} Handler config with functions
 */
export function createHandlerFunctionConfig(
  props: ActionHandlerProps
): Pick<SaveHandlerOptions, 'onUpdate' | 'onNameChange' | 'setIsEditing'> {
  return {
    onUpdate: props.onUpdate,
    onNameChange: props.onNameChange,
    setIsEditing: props.stateHandlers.setIsEditing
  };
}

/**
 * Creates save handler options for action handlers
 * @param {ActionHandlerProps} props - Action handler props
 * @returns {SaveHandlerOptions} Options for save handler
 */
export function createSaveHandlerOptions(
  props: ActionHandlerProps
): SaveHandlerOptions {
  return {
    ...createHandlerConfig(props),
    ...extractStateProps(props),
    ...createHandlerFunctionConfig(props)
  };
}

/**
 * Creates base handlers for action operations
 * @param {ActionHandlerProps} props - Handler props
 * @returns {Object} Base action handlers
 */
export function createBaseHandlers(
  props: ActionHandlerProps
): Pick<ActionHandlers, 'handleSave' | 'handleCancel'> {
  const saveOptions = createSaveHandlerOptions(props);
  return {
    handleSave: createSaveHandler(saveOptions),
    handleCancel: props.stateHandlers.resetState
  };
}

/**
 * Mode handlers return type
 */
interface ModeHandlers {
  /** Mode toggle function */
  toggleMode: () => void;
  /** Mode description getter */
  getModeDsc: () => string;
}

/**
 * Creates action handlers for mode operations
 * Creates mode toggle and description functions
 * @param {ActionHandlerProps} props - Handler props
 * @returns {ModeHandlers} Mode handlers object
 */
export function createModeHandlers(
  props: ActionHandlerProps
): ModeHandlers {
  return {
    toggleMode: createModeToggler(props.placeholder, props.onUpdate),
    /**
     * Gets the description text for the current placeholder mode
     * @returns {string} Mode description text
     */
    getModeDsc: () => getModeDescription(props.placeholder.mode || 'replace')
  };
}

/**
 * Creates utility handlers for a given set of props
 * Generates handlers for key events, clipboard, delete and insert operations
 * @param {ActionHandlerProps} props - Handler props object
 * @param {Pick<ActionHandlers, 'handleSave' | 'handleCancel'>} baseHandlers - Base action handlers
 * @returns {Pick<ActionHandlers, 'handleKeyDown' | 'handleCopyToClipboard' | 'handleDelete' | 'handleInsert'>} Utility handler functions
 */
function createActionUtilityHandlers(
  props: ActionHandlerProps,
  baseHandlers: Pick<ActionHandlers, 'handleSave' | 'handleCancel'>
): Pick<ActionHandlers, 'handleKeyDown' | 'handleCopyToClipboard' | 'handleDelete' | 'handleInsert'> {
  return createUtilityHandlers(props, baseHandlers);
}

/**
 * Creates handlers for base actions like save and cancel
 * @param {ActionHandlerProps} props - Action handler props
 * @returns {Pick<ActionHandlers, 'handleSave' | 'handleCancel'>} Base action handlers
 */
function createActionBaseHandlers(
  props: ActionHandlerProps
): Pick<ActionHandlers, 'handleSave' | 'handleCancel'> {
  return createBaseHandlers(props);
}

/**
 * Creates mode-related handlers for a placeholder
 * @param {ActionHandlerProps} props - Action handler props
 * @returns {ModeHandlers} Mode handler functions
 */
function createActionModeHandlers(
  props: ActionHandlerProps
): ModeHandlers {
  return createModeHandlers(props);
}

/**
 * Combines base and utility handlers
 * @param {Pick<ActionHandlers, 'handleSave' | 'handleCancel'>} baseHandlers - Base handlers
 * @param {Pick<ActionHandlers, 'handleKeyDown' | 'handleCopyToClipboard' | 'handleDelete' | 'handleInsert'>} utilityHandlers - Utility handlers
 * @returns {Partial<ActionHandlers>} Combined base and utility handlers
 */
function combineBaseAndUtility(
  baseHandlers: Pick<ActionHandlers, 'handleSave' | 'handleCancel'>,
  utilityHandlers: Pick<ActionHandlers, 'handleKeyDown' | 'handleCopyToClipboard' | 'handleDelete' | 'handleInsert'>
): Partial<ActionHandlers> {
  return { ...baseHandlers, ...utilityHandlers };
}

/**
 * Combines handlers with mode handlers
 * @param {Partial<ActionHandlers>} handlers - Combined handlers
 * @param {ModeHandlers} modeHandlers - Mode handlers
 * @returns {ActionHandlers} All handlers combined
 */
function addModeHandlers(
  handlers: Partial<ActionHandlers>,
  modeHandlers: ModeHandlers
): ActionHandlers {
  return { ...handlers, ...modeHandlers } as ActionHandlers;
}

/**
 * Creates action handlers for placeholder operations
 * Provides handlers for color selection, save action, and mode toggling
 * @param {ActionHandlerProps} props - Props with placeholder and handlers
 * @returns {ActionHandlers} Action handlers for placeholder operations
 */
export function createActionHandlers(
  props: ActionHandlerProps
): ActionHandlers {
  const baseHandlers = createActionBaseHandlers(props);
  const utilityHandlers = createActionUtilityHandlers(props, baseHandlers);
  const combinedHandlers = combineBaseAndUtility(baseHandlers, utilityHandlers);
  const modeHandlers = createActionModeHandlers(props);
  return addModeHandlers(combinedHandlers, modeHandlers);
}

/**
 * Hook for creating action handlers
 * @param {ActionHandlerProps} props - Handler props
 * @returns {ActionHandlers} Action handlers object
 */
export function useActionHandlers(props: ActionHandlerProps): ActionHandlers {
  return createActionHandlers(props);
}
