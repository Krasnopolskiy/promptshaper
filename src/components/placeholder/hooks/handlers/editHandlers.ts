import { PlaceholderState } from '../types';
import { Placeholder } from '@/types';
import { HandlerProps } from '../types';

/**
 * Validates placeholder name
 * @param {string} name - The placeholder name
 * @returns {boolean} Whether the name is valid
 */
function isValidName(name: string): boolean {
  return name.trim() !== '';
}

/**
 * Updates placeholder name if changed
 * @param {string} oldName - Current placeholder name
 * @param {string} newName - New placeholder name
 * @param {Function | undefined} onNameChange - Name change handler
 */
function updateNameIfChanged(
  oldName: string,
  newName: string,
  onNameChange?: (oldName: string, newName: string) => void
): void {
  if (newName !== oldName && onNameChange) {
    onNameChange(oldName, newName);
  }
}

/**
 * Creates update data for placeholder
 * @param {string} name - New name
 * @param {string} content - New content
 * @param {string} color - New color
 * @returns {Object} Update data
 */
function createUpdateData(
  name: string,
  content: string,
  color: string
): { name: string; content: string; color: string } {
  return { name, content, color };
}

/**
 * Type for placeholder update data
 */
type UpdateData = {
  newName: string;
  newContent: string;
  selectedColor: string;
};

/**
 * Updates the placeholder with new data
 * @param {Placeholder} placeholder - Placeholder data
 * @param {HandlerProps} handlers - Handler functions
 * @param {UpdateData} data - Update data
 */
function updatePlaceholder(
  placeholder: Placeholder,
  handlers: HandlerProps,
  data: UpdateData
): void {
  const { onUpdate, onNameChange } = handlers;
  const { newName, newContent, selectedColor } = data;
  updateNameIfChanged(placeholder.name, newName, onNameChange);
  onUpdate(placeholder.id, createUpdateData(newName, newContent, selectedColor));
}

/**
 * Performs placeholder save operation
 * @param {PlaceholderState} state - Placeholder state
 * @param {Placeholder} placeholder - Placeholder data
 * @param {HandlerProps} handlers - Handler functions
 */
function saveChanges(
  state: PlaceholderState,
  placeholder: Placeholder,
  handlers: HandlerProps
): void {
  const { newName, newContent, selectedColor, setIsEditing } = state;
  if (!isValidName(newName)) return;
  updatePlaceholder(placeholder, handlers, { newName, newContent, selectedColor });
  setIsEditing(false);
}

/**
 * Creates a save handler for placeholder changes
 * @param {PlaceholderState} state - Placeholder state
 * @param {Placeholder} placeholder - Placeholder data
 * @param {HandlerProps} handlers - Handler functions
 * @returns {() => void} Save handler function
 */
function createSaveHandler(
  state: PlaceholderState,
  placeholder: Placeholder,
  handlers: HandlerProps
): () => void {
  return (): void => {
    saveChanges(state, placeholder, handlers);
  };
}

/**
 * Resets placeholder state to original values
 * @param {PlaceholderState} state - Placeholder state
 * @param {Placeholder} placeholder - Placeholder data
 */
function resetState(
  state: PlaceholderState,
  placeholder: Placeholder
): void {
  const { setNewName, setNewContent, setSelectedColor, setIsEditing } = state;

  setNewName(placeholder.name);
  setNewContent(placeholder.content);
  setSelectedColor(placeholder.color);
  setIsEditing(false);
}

/**
 * Creates a cancel handler for placeholder changes
 * @param {PlaceholderState} state - Placeholder state
 * @param {Placeholder} placeholder - Placeholder data
 * @returns {() => void} Cancel handler function
 */
function createCancelHandler(
  state: PlaceholderState,
  placeholder: Placeholder
): () => void {
  return (): void => {
    resetState(state, placeholder);
  };
}

/**
 * Handles Enter key press for saving
 * @param {React.KeyboardEvent} e - Keyboard event
 * @param {() => void} saveHandler - Save handler function
 * @returns {boolean} Whether event was handled
 */
function handleEnterKey(
  e: React.KeyboardEvent,
  saveHandler: () => void
): boolean {
  if (e.key !== 'Enter' || e.shiftKey) return false;
  e.preventDefault();
  saveHandler();
  return true;
}

/**
 * Handles Escape key press for canceling
 * @param {React.KeyboardEvent} e - Keyboard event
 * @param {() => void} cancelHandler - Cancel handler function
 * @returns {boolean} Whether event was handled
 */
function handleEscapeKey(
  e: React.KeyboardEvent,
  cancelHandler: () => void
): boolean {
  if (e.key === 'Escape') {
    cancelHandler();
    return true;
  }
  return false;
}

/**
 * Creates keyboard event handler for save and cancel actions
 * @param {() => void} handleSave - Save handler function
 * @param {() => void} handleCancel - Cancel handler function
 * @returns {(e: React.KeyboardEvent) => void} Keyboard event handler function
 */
function createKeyDownHandler(
  handleSave: () => void,
  handleCancel: () => void
): (e: React.KeyboardEvent) => void {
  return (e: React.KeyboardEvent): void => {
    if (handleEnterKey(e, handleSave)) return;
    handleEscapeKey(e, handleCancel);
  };
}

/**
 * Creates save and cancel handlers
 * @param {PlaceholderState} state - Placeholder state
 * @param {Placeholder} placeholder - Placeholder data
 * @param {HandlerProps} handlers - Handler functions
 * @returns {Object} Save and cancel handlers
 */
export function createEditHandlers(
  state: PlaceholderState,
  placeholder: Placeholder,
  handlers: HandlerProps
): { handleSave: () => void; handleCancel: () => void } {
  return {
    handleSave: createSaveHandler(state, placeholder, handlers),
    handleCancel: createCancelHandler(state, placeholder)
  };
}

export { createKeyDownHandler };
