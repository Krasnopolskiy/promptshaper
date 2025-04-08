/**
 * Collapsed Buttons Component
 *
 * Renders a group of buttons for the collapsed card state
 *
 * @module components/placeholder/components/CollapsedButtons
 */
import React from 'react';
import { Copy, Pencil, Plus } from 'lucide-react';
import { IconButton } from '../buttons/IconButton';

/**
 * Props for CollapsedButtons component
 * @interface CollapsedButtonsProps
 */
interface CollapsedButtonsProps {
  /** Function to set editing state */
  setIsEditing: (editing: boolean) => void;
  /** Function to copy to clipboard */
  handleCopyToClipboard: () => void;
  /** Function to insert placeholder (optional) */
  handleInsert?: () => void;
}

/**
 * Renders an edit button
 * @param {Function} setIsEditing - Set editing function
 * @returns {JSX.Element} Edit button
 */
function EditButton({ setIsEditing }: { setIsEditing: (editing: boolean) => void }): JSX.Element {
  const icon = <Pencil className="h-4 w-4 text-muted-foreground"/>;
  return <IconButton icon={icon} onClick={() => setIsEditing(true)} />;
}

/**
 * Renders a copy button
 * @param {Function} handleCopy - Copy function
 * @returns {JSX.Element} Copy button
 */
function CopyButton({ handleCopy }: { handleCopy: () => void }): JSX.Element {
  const icon = <Copy className="h-4 w-4 text-muted-foreground"/>;
  return <IconButton icon={icon} onClick={handleCopy} />;
}

/**
 * Renders an insert button
 * @param {Function} handleInsert - Insert function
 * @returns {JSX.Element} Insert button
 */
function InsertButton({ handleInsert }: { handleInsert: () => void }): JSX.Element {
  const icon = <Plus className="h-4 w-4 text-muted-foreground"/>;
  return <IconButton icon={icon} onClick={handleInsert} />;
}

/**
 * Creates the buttons array based on props
 * @param {CollapsedButtonsProps} props - Component props
 * @returns {JSX.Element[]} Array of button elements
 */
function createButtons(props: CollapsedButtonsProps): JSX.Element[] {
  const buttons: JSX.Element[] = [];
  buttons.push(<EditButton key="edit" setIsEditing={props.setIsEditing} />);
  buttons.push(<CopyButton key="copy" handleCopy={props.handleCopyToClipboard} />);
  if (props.handleInsert) {
    buttons.push(<InsertButton key="insert" handleInsert={props.handleInsert} />);
  }
  return buttons;
}

/**
 * Renders buttons for collapsed card state
 * @param {CollapsedButtonsProps} props - Component props
 * @returns {JSX.Element} Collapsed buttons group
 */
export function CollapsedButtons(props: CollapsedButtonsProps): JSX.Element {
  const buttons = createButtons(props);
  return <>{buttons}</>;
}
