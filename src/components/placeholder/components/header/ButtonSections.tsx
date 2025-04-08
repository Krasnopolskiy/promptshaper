/**
 * Button Sections Component
 *
 * Contains components for rendering different button sections in the header
 *
 * @module components/placeholder/components/header/ButtonSections
 */
import React from 'react';
import { EditorButtons } from '../../buttons/EditorButtons';
import { ActionButtons } from '../ActionButtons';
import { ToggleExpandButton } from '../ToggleExpandButton';
import { createActionButtonProps } from './ActionButtonProps';

/**
 * Props for ActionButtons component
 * @interface ActionButtonsProps
 */
export interface ActionButtonsProps {
  /** Whether the card is expanded */
  isExpanded: boolean;
  /** Current mode of the placeholder */
  mode: string;
  /** Function to set editing state */
  setIsEditing: (editing: boolean) => void;
  /** Function to copy to clipboard */
  handleCopyToClipboard: () => void;
  /** Function to insert placeholder (optional) */
  handleInsert?: () => void;
  /** Function to toggle mode */
  toggleMode: () => void;
  /** Function to get mode description */
  getModeDescription: () => string;
}

/**
 * Props for EditorButtonsSection component
 * @interface EditorButtonsSectionProps
 */
interface EditorButtonsSectionProps {
  /** Function to save changes */
  onSave: () => void;
  /** Function to cancel changes */
  onCancel: () => void;
}

/**
 * Creates button section for editor mode
 * @param {EditorButtonsSectionProps} props - Component props
 * @returns {JSX.Element} Editor buttons section
 */
export function EditorButtonsSection(props: EditorButtonsSectionProps): JSX.Element {
  return <EditorButtons handleSave={props.onSave} handleCancel={props.onCancel} />;
}

/**
 * Props for ActionButtonsSection component
 * @interface ActionButtonsSectionProps
 */
export interface ActionButtonsSectionProps {
  /** Whether the card is expanded */
  isExpanded: boolean;
  /** Current mode */
  mode: string;
  /** Toggle expand handler */
  onToggleExpand: () => void;
  /** Function to set editing state */
  onEdit: (editing: boolean) => void;
  /** Function to copy to clipboard */
  onCopy: () => void;
  /** Function to insert placeholder (optional) */
  onInsert?: () => void;
  /** Function to toggle mode */
  onToggleMode: () => void;
  /** Function to get mode description */
  getDescription: () => string;
}

/**
 * Toggle button props
 * @interface ToggleButtonProps
 */
interface ToggleButtonProps {
  /** Whether the card is expanded */
  isExpanded: boolean;
  /** Toggle expand handler */
  onToggleExpand: () => void;
}

/**
 * Creates the toggle expand button
 * @param {ToggleButtonProps} props - Component props
 * @returns {JSX.Element} Toggle button
 */
function createToggleButton(props: ToggleButtonProps): JSX.Element {
  return <ToggleExpandButton {...props} />;
}

/**
 * Creates button section for normal mode
 * @param {ActionButtonsSectionProps} props - Component props
 * @returns {JSX.Element} Action buttons section
 */
export function ActionButtonsSection(props: ActionButtonsSectionProps): JSX.Element {
  const actionProps = createActionButtonProps(props);
  const toggleProps = { isExpanded: props.isExpanded, onToggleExpand: props.onToggleExpand };

  return (
    <>
      <ActionButtons {...actionProps} />
      {createToggleButton(toggleProps)}
    </>
  );
}
