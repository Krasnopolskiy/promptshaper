/**
 * Textarea Controls
 *
 * Components for textarea controls in the ContentEditor
 *
 * @module components/placeholder/components/ContentEditor/TextareaControls
 */
import React from 'react';
import { createControlButtons } from './TextareaUtils';
import { TextareaControlsProps } from './types';

/**
 * Renders controls wrapper with buttons
 * @param {Object} params - Component props
 * @param {React.ReactNode} params.children - Child elements
 * @returns {JSX.Element} Controls wrapper
 */
export const ControlsWrapper = ({
  children
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <div className="flex justify-end mt-2 gap-2">
    {children}
  </div>
);

/**
 * Renders the control buttons container
 * @param {React.ReactNode} children - Child elements
 * @returns {JSX.Element} Control buttons container
 */
const ControlButtonsContainer = ({
  children
}: {
  children: React.ReactNode
}): JSX.Element => (
  <div className="mt-2 flex justify-end gap-2">{children}</div>
);

/**
 * Creates control button elements for the textarea
 * @param {Function} handleCancelClick - Handle cancel button click
 * @param {Function} handleAcceptClick - Handle accept button click
 * @returns {React.ReactElement[]} Control button elements
 */
const createTextareaButtonElements = (
  handleCancelClick: () => void,
  handleAcceptClick: () => void
): React.ReactElement[] =>
  createControlButtons({
    onCancel: handleCancelClick,
    onAccept: handleAcceptClick
  });

/**
 * Returns null if not editing, otherwise returns the controls container
 * @param {boolean} isEditing - Whether editing is active
 * @param {React.ReactElement[]} buttons - The buttons to render
 * @returns {JSX.Element | null} Controls container or null
 */
const getControlsOrNull = (
  isEditing: boolean,
  buttons: React.ReactElement[]
): JSX.Element | null =>
  !isEditing ? null : <ControlButtonsContainer>{buttons}</ControlButtonsContainer>;

/**
 * Creates the textarea control components (internal implementation)
 * @param {boolean} isEditing - Whether in editing mode
 * @param {Function} handleCancelClick - Function to handle cancel click
 * @param {Function} handleAcceptClick - Function to handle accept click
 * @returns {JSX.Element | null} Textarea controls component or null
 */
const renderControls = (
  isEditing: boolean,
  handleCancelClick: () => void,
  handleAcceptClick: () => void
): JSX.Element | null => {
  const buttons = createTextareaButtonElements(handleCancelClick, handleAcceptClick);
  return getControlsOrNull(isEditing, buttons);
};

/**
 * TextareaControls component - Renders controls for textarea editing
 * @param {TextareaControlsProps} props - The props for the component
 * @returns {JSX.Element | null} Textarea controls component
 */
export function TextareaControls(props: TextareaControlsProps): JSX.Element | null {
  return renderControls(props.isEditing, props.handleCancelClick, props.handleAcceptClick);
}
