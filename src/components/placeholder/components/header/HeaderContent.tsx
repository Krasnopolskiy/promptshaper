/**
 * HeaderContent Component
 *
 * Content wrapper for the placeholder card header
 *
 * @module components/placeholder/components/header/HeaderContent
 */
import React from 'react';
import { Placeholder } from '@/types';
import { ContentSection } from './ContentSection';
import { ButtonSection } from './ButtonSection';

/**
 * Props for the HeaderContent component
 * @interface HeaderContentProps
 */
interface HeaderContentProps {
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

/**
 * Props for the content section
 * @interface ContentSectionProps
 */
interface ContentSectionProps {
  /** Whether the card is currently being edited */
  isEditing: boolean;
  /** Placeholder data */
  placeholder: Placeholder;
  /** Current name value in edit mode */
  newName: string;
  /** Reference to input element */
  inputRef: React.RefObject<HTMLInputElement>;
  /** Function to handle keydown events */
  handleKeyDown: (e: React.KeyboardEvent) => void;
  /** Function to handle name changes */
  setNewName: (name: string) => void;
  /** Function to toggle expand */
  toggleExpand: () => void;
}

/**
 * Props for the button section
 * @interface ButtonSectionProps
 */
interface ButtonSectionProps {
  /** Whether the card is currently being edited */
  isEditing: boolean;
  /** Whether the card is expanded */
  isExpanded: boolean;
  /** Current mode */
  mode: string;
  /** Function to save changes */
  handleSave: () => void;
  /** Function to cancel changes */
  handleCancel: () => void;
  /** Function to toggle expand */
  toggleExpand: () => void;
  /** Function to set editing state */
  setIsEditing: (editing: boolean) => void;
  /** Function to copy to clipboard */
  handleCopyToClipboard: () => void;
  /** Function to insert placeholder */
  handleInsert?: () => void;
  /** Function to toggle mode */
  toggleMode: () => void;
  /** Function to get mode description */
  getModeDescription: () => string;
}

/**
 * Creates props for the content section
 * Creates and returns props object for the content section component
 * @param {HeaderContentProps} props - Component props
 * @param {() => void} toggleExpand - Toggle expand function
 * @returns {ContentSectionProps} Content section props object containing all necessary props for the content section
 */
function createContentProps(props: HeaderContentProps, toggleExpand: () => void): ContentSectionProps {
  return {
    isEditing: props.isEditing,
    placeholder: props.placeholder,
    newName: props.newName,
    inputRef: props.inputRef,
    handleKeyDown: props.handleKeyDown,
    setNewName: props.setNewName,
    toggleExpand
  };
}

/**
 * Creates props for the button section
 * Creates and returns props object for the button section component
 * @param {HeaderContentProps} props - Component props
 * @param {() => void} toggleExpand - Toggle expand function
 * @param {string} mode - Current mode
 * @returns {ButtonSectionProps} Button section props object containing all necessary props for the button section
 */
function createButtonProps(props: HeaderContentProps, toggleExpand: () => void, mode: string): ButtonSectionProps {
  return {
    isEditing: props.isEditing,
    isExpanded: props.isExpanded,
    mode,
    handleSave: props.handleSave,
    handleCancel: props.handleCancel,
    toggleExpand,
    setIsEditing: props.setIsEditing,
    handleCopyToClipboard: props.handleCopyToClipboard,
    handleInsert: props.handleInsert,
    toggleMode: props.toggleMode,
    getModeDescription: props.getModeDescription
  };
}

/**
 * Creates a toggle expand function
 * Creates and returns a function that toggles the expanded state
 * @param {(expanded: boolean) => void} setIsExpanded - Function to set expanded state
 * @returns {() => void} Function that toggles the expanded state
 */
function createToggleExpand(setIsExpanded: (expanded: boolean) => void): () => void {
  return () => setIsExpanded((prev: boolean) => !prev);
}

/**
 * HeaderContent component
 * Renders the content and button sections of the placeholder card header. The content section
 * displays either the title or input field based on edit mode, while the button section shows
 * appropriate action buttons.
 * @param {HeaderContentProps} props - Component props
 * @returns {JSX.Element} The rendered header content with content and button sections
 */
export function HeaderContent(props: HeaderContentProps): JSX.Element {
  const toggleExpand = createToggleExpand(props.setIsExpanded);
  const mode = props.placeholder.mode || 'replace';

  return (
    <div className="flex items-center justify-between gap-2">
      <ContentSection {...createContentProps(props, toggleExpand)} />
      <ButtonSection {...createButtonProps(props, toggleExpand, mode)} />
    </div>
  );
}
