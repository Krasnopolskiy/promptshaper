import { PlaceholderState } from '../types';
import { Placeholder } from '@/types';
import { HandlerProps } from '../types';

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
  const { newName, newContent, setIsEditing } = state;
  const { onUpdate, onNameChange } = handlers;

  return (): void => {
    if (newName.trim() === '') return;

    if (newName !== placeholder.name && onNameChange) {
      onNameChange(placeholder.name, newName);
    }

    onUpdate(placeholder.id, {
      name: newName,
      content: newContent,
      color: state.selectedColor,
    });

    setIsEditing(false);
  };
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
  const { setNewName, setNewContent, setSelectedColor, setIsEditing } = state;

  return (): void => {
    setNewName(placeholder.name);
    setNewContent(placeholder.content);
    setSelectedColor(placeholder.color);
    setIsEditing(false);
  };
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
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
