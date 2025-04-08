/**
 * Action handlers for placeholder cards
 *
 * @module components/placeholder/utils/actionHandlers
 */
import React from 'react';
import { Placeholder } from '@/types';
import { StateHandlers, createInitialState } from './stateHandlers';

/**
 * Mode description getter
 * @param {string} mode - Current mode
 * @returns {string} Description text
 */
export function getModeDescription(mode: string): string {
  return mode === 'replace'
    ? "Replace Mode: Placeholder will be replaced with its content"
    : "Tag Mode: Content will be displayed between opening and closing tags";
}

/**
 * Handle name change notification
 * @param {string} oldName - Old placeholder name
 * @param {string} newName - New placeholder name
 * @param {Function|undefined} onNameChange - Name change callback
 * @returns {void}
 */
export function handleNameChangeNotification(
  oldName: string,
  newName: string,
  onNameChange?: (oldName: string, newName: string) => void
): void {
  if (newName !== oldName && onNameChange) {
    onNameChange(oldName, newName);
  }
}

/**
 * Creates a state update for save operation
 * @param {Placeholder} placeholder - Placeholder data
 * @param {string} newName - New name value
 * @param {Function|undefined} onNameChange - Name change callback
 * @returns {void}
 */
export function handleNameUpdateIfChanged(
  placeholder: Placeholder,
  newName: string,
  onNameChange?: (oldName: string, newName: string) => void
): void {
  handleNameChangeNotification(placeholder.name, newName, onNameChange);
}

/**
 * Creates update payload for the placeholder
 * @param {string} newName - New name value
 * @param {string} newContent - New content value
 * @param {string} selectedColor - Selected color value
 * @returns {Partial<Placeholder>} Update payload
 */
export function createUpdatePayload(
  newName: string,
  newContent: string,
  selectedColor: string
): Partial<Placeholder> {
  return {
    name: newName,
    content: newContent,
    color: selectedColor,
  };
}

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
 * Creates a save handler function
 * @param {SaveHandlerOptions} options - Handler options
 * @returns {Function} Save handler function
 */
export function createSaveHandler(options: SaveHandlerOptions): () => void {
  const {
    placeholder,
    newName,
    newContent,
    selectedColor,
    onUpdate,
    onNameChange,
    setIsEditing
  } = options;

  return (): void => {
    if (newName.trim() === '') return;

    handleNameUpdateIfChanged(placeholder, newName, onNameChange);

    const updates = createUpdatePayload(newName, newContent, selectedColor);
    onUpdate(placeholder.id, updates);

    if (setIsEditing) setIsEditing(false);
  };
}

/**
 * Handles enter key press
 * @param {React.KeyboardEvent} e - Keyboard event
 * @param {Function} handler - Function to call on enter
 * @returns {boolean} Whether the key was handled
 */
export function handleEnterKey(
  e: React.KeyboardEvent,
  handler: () => void
): boolean {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handler();
    return true;
  }
  return false;
}

/**
 * Handles escape key press
 * @param {React.KeyboardEvent} e - Keyboard event
 * @param {Function} handler - Function to call on escape
 * @returns {boolean} Whether the key was handled
 */
export function handleEscapeKey(
  e: React.KeyboardEvent,
  handler: () => void
): boolean {
  if (e.key === 'Escape') {
    handler();
    return true;
  }
  return false;
}

/**
 * Creates a keydown event handler
 * @param {Function} saveHandler - Save handler function
 * @param {Function} cancelHandler - Cancel handler function
 * @returns {Function} Keydown handler function
 */
export function createKeyDownHandler(
  saveHandler: () => void,
  cancelHandler: () => void
): (e: React.KeyboardEvent) => void {
  return (e: React.KeyboardEvent): void => {
    if (handleEnterKey(e, saveHandler)) return;
    handleEscapeKey(e, cancelHandler);
  };
}

/**
 * Creates a clipboard copy handler
 * @param {string} name - Placeholder name
 * @returns {Function} Clipboard handler function
 */
export function createClipboardHandler(name: string): () => Promise<void> {
  return async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(`<${name}>`);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };
}

/**
 * Creates an insert handler
 * @param {string} name - Placeholder name
 * @param {Function|undefined} onInsert - Insert handler
 * @returns {Function} Insert handler function
 */
export function createInsertHandler(
  name: string,
  onInsert?: (name: string) => void
): () => void {
  return (): void => {
    if (onInsert) {
      onInsert(name);
    }
  };
}

/**
 * Creates a mode toggle handler
 * @param {Placeholder} placeholder - Placeholder data
 * @param {Function} onUpdate - Update function
 * @returns {Function} Mode toggle handler
 */
export function createModeToggler(
  placeholder: Placeholder,
  onUpdate: (id: string, updates: Partial<Placeholder>) => void
): () => void {
  return (): void => {
    const currentMode = placeholder.mode || 'replace';
    const newMode = currentMode === 'replace' ? 'tag' : 'replace';
    onUpdate(placeholder.id, { mode: newMode });
  };
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
 * Creates save handler options from props
 * @param {ActionHandlerProps} props - Props object
 * @returns {SaveHandlerOptions} Save handler options
 */
export function createSaveHandlerOptions(
  props: ActionHandlerProps
): SaveHandlerOptions {
  const { placeholder, state, onUpdate, stateHandlers } = props;
  const { newName, newContent, selectedColor } = state;
  const { setIsEditing } = stateHandlers;

  return {
    placeholder,
    newName,
    newContent,
    selectedColor,
    onUpdate,
    onNameChange: props.onNameChange,
    setIsEditing
  };
}

/**
 * Create action handlers for the placeholder card
 * @param {ActionHandlerProps} props - Props object
 * @returns {ActionHandlers} Action handler functions
 */
export function createActionHandlers(props: ActionHandlerProps): ActionHandlers {
  const { placeholder, onUpdate, onDelete, stateHandlers } = props;
  const { resetState } = stateHandlers;

  const saveOptions = createSaveHandlerOptions(props);
  const handleSave = createSaveHandler(saveOptions);

  return {
    handleSave,
    handleCancel: resetState,
    handleKeyDown: createKeyDownHandler(handleSave, resetState),
    handleCopyToClipboard: createClipboardHandler(placeholder.name),
    /**
     * Handles deleting the placeholder
     * @returns {void}
     */
    handleDelete: () => onDelete(placeholder.id),
    handleInsert: createInsertHandler(placeholder.name, props.onInsert),
    toggleMode: createModeToggler(placeholder, onUpdate),
    /**
     * Gets the description for the current mode
     * @returns {string} The mode description
     */
    getModeDsc: () => getModeDescription(placeholder.mode || 'replace')
  };
}

/**
 * Custom hook for action handlers
 * @param {ActionHandlerProps} props - Props object
 * @returns {ActionHandlers} Action handler functions
 */
export function useActionHandlers(props: ActionHandlerProps): ActionHandlers {
  return createActionHandlers(props);
}
