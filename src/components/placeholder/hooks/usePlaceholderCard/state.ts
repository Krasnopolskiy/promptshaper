/**
 * State management for usePlaceholderCard hook
 *
 * @module components/placeholder/hooks/usePlaceholderCard/state
 */
import { useState, useRef, useEffect } from 'react';
import { UsePlaceholderCardProps } from '../types';

/**
 * Complete card state type
 */
export type CardState = {
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
  inputRef: React.RefObject<HTMLInputElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

/**
 * Type for React state hook pair
 */
export type StateHook<T> = [T, React.Dispatch<React.SetStateAction<T>>];

/**
 * Type for state values from hooks
 */
export type StateValues = {
  isEditing: StateHook<boolean>;
  isExpanded: StateHook<boolean>;
  newName: StateHook<string>;
  newContent: StateHook<string>;
  selectedColor: StateHook<string>;
  mode: StateHook<string>;
};

/**
 * Extract state values from hooks
 * @param {StateValues} hooks - State hook pairs
 * @returns {Object} Extracted state values
 */
export function extractStateValues(hooks: StateValues): Pick<CardState, 'isEditing' | 'isExpanded' | 'newName' | 'newContent' | 'selectedColor' | 'mode'> {
  return {
    isEditing: hooks.isEditing[0],
    isExpanded: hooks.isExpanded[0],
    newName: hooks.newName[0],
    newContent: hooks.newContent[0],
    selectedColor: hooks.selectedColor[0],
    mode: hooks.mode[0]
  };
}

/**
 * Extract state setters from hooks
 * @param {StateValues} hooks - State hook pairs
 * @returns {Object} Extracted state setters
 */
export function extractStateSetters(hooks: StateValues): Pick<CardState, 'setIsEditing' | 'setIsExpanded' | 'setNewName' | 'setNewContent' | 'setSelectedColor' | 'setMode'> {
  return {
    setIsEditing: hooks.isEditing[1],
    setIsExpanded: hooks.isExpanded[1],
    setNewName: hooks.newName[1],
    setNewContent: hooks.newContent[1],
    setSelectedColor: hooks.selectedColor[1],
    setMode: hooks.mode[1]
  };
}

/**
 * Create state values from hooks
 * @param {StateValues} hooks - State hook pairs
 * @returns {Object} Extracted state values
 */
export function createStateValues(hooks: StateValues): Omit<CardState, 'inputRef' | 'textareaRef'> {
  return { ...extractStateValues(hooks), ...extractStateSetters(hooks) };
}

/**
 * Add refs to state values
 * @param {Object} values - State values
 * @param {React.RefObject<HTMLInputElement>} inputRef - Input ref
 * @param {React.RefObject<HTMLTextAreaElement>} textareaRef - Textarea ref
 * @returns {CardState} State with refs
 */
export function addRefsToState(
  values: Omit<CardState, 'inputRef' | 'textareaRef'>,
  inputRef: React.RefObject<HTMLInputElement>,
  textareaRef: React.RefObject<HTMLTextAreaElement>
): CardState {
  return { ...values, inputRef, textareaRef };
}

/**
 * Initialize state hooks for card
 * @param {UsePlaceholderCardProps} props - Hook properties
 * @returns {StateValues} State hooks
 */
export function useCardStateHooks(props: UsePlaceholderCardProps): StateValues {
  const isEditing = useState(false);
  const isExpanded = useState(false);
  const newName = useState(props.placeholder.name);
  const newContent = useState(props.placeholder.content);
  const selectedColor = useState(props.placeholder.color);
  const mode = useState('replace');

  return { isEditing, isExpanded, newName, newContent, selectedColor, mode };
}

/**
 * Initialize refs for card
 * @returns {Object} Input and textarea refs
 */
export function useCardRefs(): {
  inputRef: React.RefObject<HTMLInputElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
} {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return { inputRef, textareaRef };
}

/**
 * Initialize state and refs for card
 * @param {UsePlaceholderCardProps} props - Hook properties
 * @returns {Object} Hooks, input ref, textarea ref
 */
export function useInitialCardState(props: UsePlaceholderCardProps): {
  hooks: StateValues;
  inputRef: React.RefObject<HTMLInputElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
} {
  const hooks = useCardStateHooks(props);
  const { inputRef, textareaRef } = useCardRefs();

  return { hooks, inputRef, textareaRef };
}

/**
 * Create card state from hooks and refs
 * @param {StateValues} hooks - State hooks
 * @param {React.RefObject<HTMLInputElement>} inputRef - Input ref
 * @param {React.RefObject<HTMLTextAreaElement>} textareaRef - Textarea ref
 * @returns {CardState} Card state
 */
export function useCardState(
  hooks: StateValues,
  inputRef: React.RefObject<HTMLInputElement>,
  textareaRef: React.RefObject<HTMLTextAreaElement>
): CardState {
  const stateValues = createStateValues(hooks);
  return addRefsToState(stateValues, inputRef, textareaRef);
}

/**
 * Apply focus effect to input when editing
 * @param {boolean} isEditing - Whether editing is active
 * @param {React.RefObject<HTMLInputElement>} inputRef - Input ref
 */
export function useFocusEffect(
  isEditing: boolean,
  inputRef: React.RefObject<HTMLInputElement>
): void {
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing, inputRef]);
}
