/**
 * Types for placeholder components
 *
 * @module components/placeholder/types
 */
import React from 'react';
import { Placeholder } from '@/types';

/**
 * Props for the PlaceholderCardHeader component
 * @interface PlaceholderCardHeaderProps
 */
export interface PlaceholderCardHeaderProps {
  /** Placeholder data */
  placeholder: Placeholder;
  /** Whether the card is currently being edited */
  isEditing: boolean;
  /** Whether the card is expanded */
  isExpanded: boolean;
  /** Current name value in edit mode */
  newName: string;
  /** Reference to input element */
  inputRef: React.RefObject<HTMLInputElement>;
  /** Function to handle keydown events */
  handleKeyDown: (e: React.KeyboardEvent) => void;
  /** Function to handle name changes */
  setNewName: (name: string) => void;
  /** Function to set expanded state */
  setIsExpanded: (expanded: boolean) => void;
  /** Function to set editing state */
  setIsEditing: (editing: boolean) => void;
  /** Function to save changes */
  handleSave: () => void;
  /** Function to cancel changes */
  handleCancel: () => void;
  /** Function to copy to clipboard */
  handleCopyToClipboard: () => void;
  /** Function to insert placeholder */
  handleInsert?: () => void;
  /** Function to toggle mode */
  toggleMode: () => void;
  /** Function to get mode description */
  getModeDescription: () => string;
}

export interface PlaceholderCardProps {
  placeholder: Placeholder;
  onUpdate: (id: string, updates: Partial<Placeholder>) => void;
  onDelete: (id: string) => void;
  onInsert?: (name: string) => void;
  onNameChange?: (oldName: string, newName: string) => void;
}

export type BasicStateProps = {
  isEditing: boolean;
  isExpanded: boolean;
};

export type NameProps = {
  newName: string;
  inputRef: React.RefObject<HTMLInputElement>;
  setNewName: (name: string) => void;
};

export type KeyboardAndSaveProps = {
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleSave: () => void;
  handleCancel: () => void;
};

export type ActionProps = {
  handleCopyToClipboard: () => void;
  handleDelete: () => void;
  toggleMode: () => void;
  getModeDescription: () => string;
};

export type ContentProps = {
  newContent: string;
  selectedColor: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  setNewContent: (content: string) => void;
  setSelectedColor: (color: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleInsert?: () => void;
};

export type HeaderSpecificProps = {
  setIsExpanded: (expanded: boolean) => void;
  setIsEditing: (editing: boolean) => void;
};

export type CardHeaderProps = {
  placeholder: Placeholder;
} & BasicStateProps &
  NameProps &
  KeyboardAndSaveProps &
  ActionProps &
  HeaderSpecificProps;

export type CardContentProps = {
  placeholder: Placeholder;
} & BasicStateProps &
  ContentProps;
