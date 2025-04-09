/**
 * Type definitions for usePlaceholderCard state management
 *
 * @module components/placeholder/hooks/usePlaceholderCard/types
 */
import { Dispatch, RefObject, SetStateAction } from 'react';

/**
 * Card refs object containing input and textarea refs
 */
export interface CardRefs {
  inputRef: RefObject<HTMLInputElement>;
  textareaRef: RefObject<HTMLTextAreaElement>;
}

/**
 * State values for the card
 */
export interface CardStateValues {
  isEditing: boolean;
  isExpanded: boolean;
  newName: string;
  newContent: string;
  selectedColor: string;
  mode: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  setNewName: Dispatch<SetStateAction<string>>;
  setNewContent: Dispatch<SetStateAction<string>>;
  setSelectedColor: Dispatch<SetStateAction<string>>;
  setMode: Dispatch<SetStateAction<string>>;
}

/**
 * State values with their setters
 */
export interface StateValues {
  isEditing: [boolean, Dispatch<SetStateAction<boolean>>];
  isExpanded: [boolean, Dispatch<SetStateAction<boolean>>];
  newName: [string, Dispatch<SetStateAction<string>>];
  newContent: [string, Dispatch<SetStateAction<string>>];
  selectedColor: [string, Dispatch<SetStateAction<string>>];
  mode: [string, Dispatch<SetStateAction<string>>];
}

/**
 * Complete state object including refs
 */
export interface StateObject {
  state: CardStateValues & {
    inputRef: RefObject<HTMLInputElement>;
    textareaRef: RefObject<HTMLTextAreaElement>;
  };
  refs: CardRefs;
}
