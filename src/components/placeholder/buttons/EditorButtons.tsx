/**
 * Editor Buttons Component
 *
 * Renders save and cancel buttons for editing mode
 *
 * @module components/placeholder/buttons/EditorButtons
 */
import React from 'react';
import { Check, Trash } from 'lucide-react';
import { IconButton } from './IconButton';

/**
 * Props for EditorButtons component
 * @interface EditorButtonsProps
 */
interface EditorButtonsProps {
  /** Function to handle save action */
  handleSave: () => void;
  /** Function to handle cancel action */
  handleCancel: () => void;
}

/**
 * Renders save and cancel buttons for editing mode
 * @param {EditorButtonsProps} props - Component props
 * @returns {JSX.Element} Editor action buttons
 */
export function EditorButtons({ handleSave, handleCancel }: EditorButtonsProps): JSX.Element {
  const saveIcon = <Check className="h-4 w-4 text-green-500"/>;
  const cancelIcon = <Trash className="h-4 w-4 text-destructive"/>;

  return (
    <>
      <IconButton icon={saveIcon} onClick={handleSave} />
      <IconButton icon={cancelIcon} onClick={handleCancel} />
    </>
  );
}
