/**
 * Module for state handling utilities for placeholder cards
 */
import { useState } from 'react';
import type { Placeholder } from '../../../types';

/**
 * Interface for the state of a placeholder card
 */
interface PlaceholderState {
  isEditing: boolean;
  isExpanded: boolean;
  newName: string;
  newContent: string;
  selectedColor: string;
}

/**
 * Initial state properties derived from a placeholder object
 * @param {Placeholder} placeholder - The placeholder object
 * @returns Initial state properties based on the placeholder
 */
function createInitialProps(placeholder: Placeholder): Pick<PlaceholderState, 'newName' | 'newContent' | 'selectedColor'> {
  return {
    newName: placeholder.name,
    newContent: placeholder.content,
    selectedColor: placeholder.color,
  };
}

/**
 * Additional initial state properties with default values
 * @returns Default state properties for expansion and editing
 */
function createDefaultProps(): Pick<PlaceholderState, 'isEditing' | 'isExpanded'> {
  return {
    isEditing: false,
    isExpanded: false,
  };
}

/**
 * Creates the complete initial state for a placeholder card
 * @param {Placeholder} placeholder - The placeholder object
 * @returns The complete initial state
 */
function createInitialState(placeholder: Placeholder): PlaceholderState {
  return {
    ...createInitialProps(placeholder),
    ...createDefaultProps(),
  };
}

/**
 * Interface for state handler functions
 */
interface StateHandlers {
  setIsEditing: (isEditing: boolean) => void;
  setIsExpanded: (isExpanded: boolean) => void;
  setNewName: (name: string) => void;
  setNewContent: (content: string) => void;
  setSelectedColor: (color: string) => void;
  resetState: () => void;
}

/**
 * Creates a handler for setting the editing state
 * @param {React.Dispatch<React.SetStateAction<PlaceholderState>>} setState - The state setter function
 * @returns A function to set the editing state
 */
function createEditingHandler(
  setState: React.Dispatch<React.SetStateAction<PlaceholderState>>
): (isEditing: boolean) => void {
  return (isEditing: boolean): void => {
    setState((prevState) => ({ ...prevState, isEditing }));
  };
}

/**
 * Creates a handler for setting the expanded state
 * @param {React.Dispatch<React.SetStateAction<PlaceholderState>>} setState - The state setter function
 * @returns A function to set the expanded state
 */
function createExpandHandler(
  setState: React.Dispatch<React.SetStateAction<PlaceholderState>>
): (isExpanded: boolean) => void {
  return (isExpanded: boolean): void => {
    setState((prevState) => ({ ...prevState, isExpanded }));
  };
}

/**
 * Creates a handler for setting the new name
 * @param {React.Dispatch<React.SetStateAction<PlaceholderState>>} setState - The state setter function
 * @returns A function to set the new name
 */
function createNameHandler(
  setState: React.Dispatch<React.SetStateAction<PlaceholderState>>
): (name: string) => void {
  return (name: string): void => {
    setState((prevState) => ({ ...prevState, newName: name }));
  };
}

/**
 * Creates a handler for setting the new content
 * @param {React.Dispatch<React.SetStateAction<PlaceholderState>>} setState - The state setter function
 * @returns A function to set the new content
 */
function createContentHandler(
  setState: React.Dispatch<React.SetStateAction<PlaceholderState>>
): (content: string) => void {
  return (content: string): void => {
    setState((prevState) => ({ ...prevState, newContent: content }));
  };
}

/**
 * Creates a handler for setting the selected color
 * @param {React.Dispatch<React.SetStateAction<PlaceholderState>>} setState - The state setter function
 * @returns A function to set the selected color
 */
function createColorHandler(
  setState: React.Dispatch<React.SetStateAction<PlaceholderState>>
): (color: string) => void {
  return (color: string): void => {
    setState((prevState) => ({ ...prevState, selectedColor: color }));
  };
}

/**
 * Helper function to create the reset state object
 * @param {PlaceholderState} prevState - The previous state
 * @param {Placeholder} placeholder - The placeholder object
 * @returns The updated state object
 */
function getResetStateValues(
  prevState: PlaceholderState,
  placeholder: Placeholder
): PlaceholderState {
  return {
    ...prevState,
    ...createInitialProps(placeholder),
    isEditing: false,
  };
}

/**
 * Creates a reset handler to update state to match a placeholder
 * @param {React.Dispatch<React.SetStateAction<PlaceholderState>>} setState - The state setter function
 * @param {Placeholder} placeholder - The placeholder object
 * @returns A function to reset the state
 */
function createResetHandler(
  setState: React.Dispatch<React.SetStateAction<PlaceholderState>>,
  placeholder: Placeholder
): () => void {
  return (): void => {
    setState(prevState => getResetStateValues(prevState, placeholder));
  };
}

/**
 * Creates basic state handlers (editing, expanding, name, content)
 * @param {React.Dispatch<React.SetStateAction<PlaceholderState>>} setState - State setter
 * @returns Basic handler functions
 */
function createBasicStateHandlers(
  setState: React.Dispatch<React.SetStateAction<PlaceholderState>>
): Pick<StateHandlers, 'setIsEditing' | 'setIsExpanded' | 'setNewName' | 'setNewContent'> {
  return {
    setIsEditing: createEditingHandler(setState),
    setIsExpanded: createExpandHandler(setState),
    setNewName: createNameHandler(setState),
    setNewContent: createContentHandler(setState),
  };
}

/**
 * Creates additional state handlers (color, reset)
 * @param {React.Dispatch<React.SetStateAction<PlaceholderState>>} setState - State setter
 * @param {Placeholder} placeholder - Placeholder data
 * @returns Additional handler functions
 */
function createAdditionalStateHandlers(
  setState: React.Dispatch<React.SetStateAction<PlaceholderState>>,
  placeholder: Placeholder
): Pick<StateHandlers, 'setSelectedColor' | 'resetState'> {
  return {
    setSelectedColor: createColorHandler(setState),
    resetState: createResetHandler(setState, placeholder),
  };
}

/**
 * Creates all state handlers for a placeholder card
 * @param {React.Dispatch<React.SetStateAction<PlaceholderState>>} setState - The state setter function
 * @param {Placeholder} placeholder - The placeholder object
 * @returns All state handler functions
 */
function createStateHandlers(
  setState: React.Dispatch<React.SetStateAction<PlaceholderState>>,
  placeholder: Placeholder
): StateHandlers {
  return {
    ...createBasicStateHandlers(setState),
    ...createAdditionalStateHandlers(setState, placeholder),
  };
}

/**
 * Hook that provides state handlers for a placeholder card
 * @param {Placeholder} placeholder - The placeholder object
 * @returns State and state handler functions
 */
function useStateHandlers(placeholder: Placeholder): {
  state: PlaceholderState;
  handlers: StateHandlers;
} {
  const [state, setState] = useState(createInitialState(placeholder));
  const handlers = createStateHandlers(setState, placeholder);

  return { state, handlers };
}

/**
 * Focus input element if currently in editing mode
 * @param {React.RefObject<HTMLInputElement>} inputRef - Reference to the input element
 * @param {boolean} isEditing - Whether the card is in editing mode
 */
function focusInputIfEditing(
  inputRef: React.RefObject<HTMLInputElement>,
  isEditing: boolean
): void {
  if (isEditing && inputRef.current) {
    inputRef.current.focus();
  }
}

/**
 * Expands the card if needed based on editing state
 * @param {boolean} isEditing - Whether the card is in editing mode
 * @param {(isExpanded: boolean) => void} setIsExpanded - Function to set the expanded state
 */
function expandIfNeeded(isEditing: boolean, setIsExpanded: (isExpanded: boolean) => void): void {
  if (isEditing) {
    setIsExpanded(true);
  }
}

export {
  createInitialState,
  useStateHandlers,
  focusInputIfEditing,
  expandIfNeeded,
};

export type {
  PlaceholderState,
  StateHandlers,
};
