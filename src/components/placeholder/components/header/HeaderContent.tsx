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
 * Creates the input-related props for content section
 * @param {HeaderContentProps} props - Component props
 * @returns Required content section props with input properties
 */
function createInputProps(props: HeaderContentProps): Pick<ContentSectionProps, 'newName' | 'inputRef' | 'handleKeyDown' | 'setNewName'> {
  return {
    newName: props.newName,
    inputRef: props.inputRef,
    handleKeyDown: props.handleKeyDown,
    setNewName: props.setNewName
  };
}

/**
 * Creates props for the content section
 * @param {HeaderContentProps} props - Component props
 * @param {() => void} toggleExpand - Toggle expand function
 * @returns {ContentSectionProps} Content section props
 */
function createContentProps(props: HeaderContentProps, toggleExpand: () => void): ContentSectionProps {
  return {
    isEditing: props.isEditing,
    placeholder: props.placeholder,
    toggleExpand,
    ...createInputProps(props)
  };
}

/**
 * Creates event handler props for button section
 * @param {HeaderContentProps} props - Component props
 * @returns Button section props with event handlers
 */
function createButtonHandlers(props: HeaderContentProps): Pick<ButtonSectionProps, 'handleSave' | 'handleCancel' | 'setIsEditing' | 'handleCopyToClipboard' | 'handleInsert'> {
  return {
    handleSave: props.handleSave,
    handleCancel: props.handleCancel,
    setIsEditing: props.setIsEditing,
    handleCopyToClipboard: props.handleCopyToClipboard,
    handleInsert: props.handleInsert
  };
}

/**
 * Creates mode-related props for button section
 * @param {HeaderContentProps} props - Component props
 * @param {string} mode - Current mode
 * @returns Button section props with mode properties
 */
function createModeProps(props: HeaderContentProps, mode: string): Pick<ButtonSectionProps, 'mode' | 'toggleMode' | 'getModeDescription'> {
  return {
    mode,
    toggleMode: props.toggleMode,
    getModeDescription: props.getModeDescription
  };
}

/**
 * Creates props for the button section
 * @param {HeaderContentProps} props - Component props
 * @param {() => void} toggleExpand - Toggle expand function
 * @param {string} mode - Current mode
 * @returns {ButtonSectionProps} Button section props
 */
function createButtonProps(props: HeaderContentProps, toggleExpand: () => void, mode: string): ButtonSectionProps {
  return {
    isEditing: props.isEditing,
    isExpanded: props.isExpanded,
    toggleExpand,
    ...createButtonHandlers(props),
    ...createModeProps(props, mode)
  };
}

/**
 * Creates a toggle expand function
 * @param {(expanded: boolean) => void} setIsExpanded - Function to set expanded state
 * @returns {() => void} Function that toggles the expanded state
 */
function createToggleExpand(setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>): () => void {
  return () => setIsExpanded((prev) => !prev);
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
