/**
 * Custom hook for PlaceholderCard functionality
 *
 * Manages state and handlers for the PlaceholderCard component
 *
 * @module components/placeholder/hooks/usePlaceholderCard
 */
import { useState, useRef, useEffect } from 'react';
import { UsePlaceholderCardProps, UsePlaceholderCardReturn } from './types';
import { createEditHandlers, createKeyDownHandler } from './handlers/editHandlers';
import { createActionHandlers } from './handlers/actionHandlers';
import { createToggleHandlers } from './handlers/toggleHandlers';
import { createCardBorderStyle, getModeDescription } from './utils/styleUtils';

type CardRefs = {
  inputRef: React.RefObject<HTMLInputElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

type CardStateValues = {
  isEditing: boolean;
  isExpanded: boolean;
  newName: string;
  newContent: string;
  selectedColor: string;
  mode: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  setNewContent: React.Dispatch<React.SetStateAction<string>>;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
};

type CardState = CardStateValues & {
  inputRef: React.RefObject<HTMLInputElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

type StateObject = {
  state: CardState;
  refs: CardRefs;
};

type StateValues = ReturnType<typeof useStateValues>;

/**
 * Creates the state values for the placeholder card
 * @param {UsePlaceholderCardProps['placeholder']} placeholder - The placeholder data
 * @returns {Object} The state values and setters
 */
function useStateValues(placeholder: UsePlaceholderCardProps['placeholder']): {
  isEditing: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  isExpanded: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  newName: [string, React.Dispatch<React.SetStateAction<string>>];
  newContent: [string, React.Dispatch<React.SetStateAction<string>>];
  selectedColor: [string, React.Dispatch<React.SetStateAction<string>>];
  mode: [string, React.Dispatch<React.SetStateAction<string>>];
} {
  return {
    isEditing: useState(false),
    isExpanded: useState(false),
    newName: useState(placeholder.name),
    newContent: useState(placeholder.content),
    selectedColor: useState(placeholder.color),
    mode: useState('replace'),
  };
}

/**
 * Creates the state values object from state values
 * @param {StateValues} values - The state values and setters from useStateValues
 * @returns {CardStateValues} The state values object
 */
function createStateValues(values: StateValues): CardStateValues {
  const [isEditing, setIsEditing] = values.isEditing;
  const [isExpanded, setIsExpanded] = values.isExpanded;
  const [newName, setNewName] = values.newName;
  const [newContent, setNewContent] = values.newContent;
  const [selectedColor, setSelectedColor] = values.selectedColor;
  const [mode, setMode] = values.mode;

  return {
    isEditing,
    isExpanded,
    newName,
    newContent,
    selectedColor,
    mode,
    setIsEditing,
    setIsExpanded,
    setNewName,
    setNewContent,
    setSelectedColor,
    setMode
  };
}

/**
 * Creates the state object from state values and refs
 * @param {StateValues} values - The state values and setters
 * @param {CardRefs} refs - The refs object containing input and textarea refs
 * @returns {StateObject} The state object and refs
 */
function createStateObject(values: StateValues, refs: CardRefs): StateObject {
  const stateValues = createStateValues(values);

  return {
    state: {
      ...stateValues,
      inputRef: refs.inputRef,
      textareaRef: refs.textareaRef,
    },
    refs
  };
}

/**
 * Creates the state object for the placeholder card
 * @param {UsePlaceholderCardProps['placeholder']} placeholder - The placeholder data
 * @returns {StateObject} The state object and refs
 */
function useCardState(placeholder: UsePlaceholderCardProps['placeholder']): StateObject {
  const values = useStateValues(placeholder);
  const refs = {
    inputRef: useRef<HTMLInputElement>(null),
    textareaRef: useRef<HTMLTextAreaElement>(null)
  };

  return createStateObject(values, refs);
}

/**
 * Creates the handlers object for the placeholder card
 * @param {CardState} state - The current state of the card
 * @param {UsePlaceholderCardProps} props - The props passed to the hook
 * @returns {Object} The combined handlers for the card
 */
function useCardHandlers(
  state: CardState,
  props: UsePlaceholderCardProps
): ReturnType<typeof createEditHandlers> & ReturnType<typeof createActionHandlers> & ReturnType<typeof createToggleHandlers> & {
  handleKeyDown: ReturnType<typeof createKeyDownHandler>;
} {
  const editHandlers = createEditHandlers(state, props.placeholder, props);
  const actionHandlers = createActionHandlers(props.placeholder, props);
  const toggleHandlers = createToggleHandlers(state, props.placeholder, props.onUpdate);

  return {
    ...editHandlers,
    ...actionHandlers,
    ...toggleHandlers,
    handleKeyDown: createKeyDownHandler(editHandlers.handleSave, editHandlers.handleCancel)
  };
}

/**
 * Hook for managing placeholder card state and behavior
 * @param {UsePlaceholderCardProps} props - Hook properties
 * @returns {UsePlaceholderCardReturn} Object containing state and handlers for the placeholder card
 */
export function usePlaceholderCard(props: UsePlaceholderCardProps): UsePlaceholderCardReturn {
  const { state, refs } = useCardState(props.placeholder);

  useEffect(() => {
    if (state.isEditing && refs.inputRef.current) {
      refs.inputRef.current.focus();
    }
  }, [state.isEditing, refs.inputRef]);

  const handlers = useCardHandlers(state, props);
  const cardBorderStyle = createCardBorderStyle(state.selectedColor);
  const modeDescription = getModeDescription(state.mode);

  return {
    ...state,
    ...handlers,
    cardBorderStyle,
    modeDescription,
  };
}
