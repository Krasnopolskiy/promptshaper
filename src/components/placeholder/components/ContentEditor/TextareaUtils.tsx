import React from 'react';
import { Button } from '@/components/ui/button';

/**
 * Props for the control buttons
 */
export interface ControlButtonsProps {
  /** Function to handle cancel click */
  onCancel: () => void;
  /** Function to handle accept click */
  onAccept: () => void;
  /** Whether to disable the accept button */
  disableAccept?: boolean;
}

/**
 * Properties for cancel button
 */
const cancelButtonProps = {
  key: "cancel",
  variant: "outline" as const,
  size: "sm" as const,
  className: "mr-2"
};

/**
 * Properties for accept button
 */
const acceptButtonProps = {
  key: "accept",
  variant: "default" as const,
  size: "sm" as const
};

/**
 * Creates a cancel button element
 *
 * @param {() => void} onCancel - Function to handle cancel button click
 * @returns {React.ReactElement} Button element for canceling
 */
function createCancelButton(onCancel: () => void): React.ReactElement {
  return <Button {...cancelButtonProps} onClick={onCancel}>Cancel</Button>;
}

/**
 * Creates an accept button element
 *
 * @param {() => void} onAccept - Function to handle accept button click
 * @param {boolean} [disableAccept] - Whether to disable the accept button
 * @returns {React.ReactElement} Button element for accepting
 */
function createAcceptButton(
  onAccept: () => void,
  disableAccept?: boolean
): React.ReactElement {
  return (
    <Button {...acceptButtonProps} onClick={onAccept} disabled={disableAccept}>
      Accept
    </Button>
  );
}

/**
 * Creates control buttons for the textarea
 *
 * @param {ControlButtonsProps} props - The props for control buttons
 * @param {() => void} props.onCancel - Function to handle cancel button click
 * @param {() => void} props.onAccept - Function to handle accept button click
 * @param {boolean} [props.disableAccept] - Whether to disable the accept button
 * @returns {React.ReactElement[]} Array of button elements
 */
export function createControlButtons({
  onCancel,
  onAccept,
  disableAccept
}: ControlButtonsProps): React.ReactElement[] {
  return [
    createCancelButton(onCancel),
    createAcceptButton(onAccept, disableAccept)
  ];
}
