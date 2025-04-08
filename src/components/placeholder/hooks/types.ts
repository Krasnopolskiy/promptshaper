import { Placeholder } from '@/types';
import React from 'react';

/**
 * Props for the placeholder card hook
 */
export interface UsePlaceholderCardProps {
  /** The placeholder data */
  placeholder: Placeholder;
  /** Function to update placeholder */
  onUpdate: (id: string, updates: Partial<Placeholder>) => void;
  /** Function to delete placeholder */
  onDelete: (id: string) => void;
  /** Function to insert placeholder */
  onInsert?: (name: string) => void;
  /** Function to handle name changes */
  onNameChange?: (oldName: string, newName: string) => void;
}

/**
 * Return type for the placeholder card hook
 */
export interface UsePlaceholderCardReturn {
  /** Whether editing mode is active */
  isEditing: boolean;
  /** Whether the card is expanded */
  isExpanded: boolean;
  /** New name value during editing */
  newName: string;
  /** New content value during editing */
  newContent: string;
  /** Selected color during editing */
  selectedColor: string;
  /** Reference to the name input */
  inputRef: React.RefObject<HTMLInputElement>;
  /** Reference to the content textarea */
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  /** Current mode (replace or tag) */
  mode: string;
  /** Description of the current mode */
  modeDescription: string;
  /** Card border style object */
  cardBorderStyle: React.CSSProperties;
  /** Sets editing mode */
  setIsEditing: (value: boolean) => void;
  /** Sets the new name */
  setNewName: (name: string) => void;
  /** Sets the new content */
  setNewContent: (content: string) => void;
  /** Sets the new color */
  setSelectedColor: (color: string) => void;
  /** Handles saving changes */
  handleSave: () => void;
  /** Handles cancelling edits */
  handleCancel: () => void;
  /** Handles keyboard events */
  handleKeyDown: (e: React.KeyboardEvent) => void;
  /** Copies placeholder tag to clipboard */
  handleCopyToClipboard: () => Promise<void>;
  /** Handles deleting the placeholder */
  handleDelete: () => void;
  /** Handles inserting the placeholder */
  handleInsert: () => void;
  /** Toggles between replace and tag modes */
  toggleMode: () => void;
}

/**
 * Props for handler functions
 */
export interface HandlerProps {
  /** Update function */
  onUpdate: (id: string, updates: Partial<Placeholder>) => void;
  /** Delete function */
  onDelete: (id: string) => void;
  /** Insert function */
  onInsert?: (name: string) => void;
  /** Name change function */
  onNameChange?: (oldName: string, newName: string) => void;
}

/**
 * State for the placeholder card
 */
export interface PlaceholderState {
  /** Whether editing mode is active */
  isEditing: boolean;
  /** Whether the card is expanded */
  isExpanded: boolean;
  /** New name value during editing */
  newName: string;
  /** New content value during editing */
  newContent: string;
  /** Selected color during editing */
  selectedColor: string;
  /** Input element reference */
  inputRef: React.RefObject<HTMLInputElement>;
  /** Textarea element reference */
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  /** Current placeholder mode */
  mode: string;
  /** Sets editing mode */
  setIsEditing: (value: boolean) => void;
  /** Sets expanded state */
  setIsExpanded: (value: boolean) => void;
  /** Sets new name */
  setNewName: (value: string) => void;
  /** Sets new content */
  setNewContent: (value: string) => void;
  /** Sets selected color */
  setSelectedColor: (value: string) => void;
}
