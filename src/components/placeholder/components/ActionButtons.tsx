/**
 * Action Buttons Component
 *
 * Renders a group of action buttons for the placeholder card
 *
 * @module components/placeholder/components/ActionButtons
 */
import React from 'react';
import { ModeToggleButton } from './ModeToggleButton';
import { CollapsedButtons } from './CollapsedButtons';

/**
 * Props for ActionButtons component
 * @interface ActionButtonsProps
 */
interface ActionButtonsProps {
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
 * Creates mode toggle button component
 * @param {ActionButtonsProps} props - Component props
 * @returns {JSX.Element} Mode toggle button
 */
function createModeButton(props: ActionButtonsProps): JSX.Element {
  return (
    <ModeToggleButton
      mode={props.mode}
      toggleMode={props.toggleMode}
      getModeDescription={props.getModeDescription}
    />
  );
}

/**
 * Creates collapsed buttons component if needed
 * @param {ActionButtonsProps} props - Component props
 * @returns {JSX.Element|null} Collapsed buttons or null
 */
function createCollapsedButtons(props: ActionButtonsProps): JSX.Element | null {
  if (props.isExpanded) return null;

  return (
    <CollapsedButtons
      setIsEditing={props.setIsEditing}
      handleCopyToClipboard={props.handleCopyToClipboard}
      handleInsert={props.handleInsert}
    />
  );
}

/**
 * Renders action buttons for the placeholder card
 * @param {ActionButtonsProps} props - Component props
 * @returns {JSX.Element} Action buttons
 */
export function ActionButtons(props: ActionButtonsProps): JSX.Element {
  return (
    <>
      {createModeButton(props)}
      {createCollapsedButtons(props)}
    </>
  );
}
