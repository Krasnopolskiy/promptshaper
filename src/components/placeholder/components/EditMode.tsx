import React from 'react';
import { ColorPickerSection } from './ColorPickerSection';
import { ContentEditor } from './ContentEditor';

interface EditModeProps {
  newContent: string;
  selectedColor: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  setNewContent: (content: string) => void;
  setSelectedColor: (color: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * Renders the color picker section of the edit mode
 * @param {EditModeProps} props - The component props
 * @returns {JSX.Element} The rendered color picker section
 */
function renderColorPicker(props: EditModeProps): JSX.Element {
  return (
    <ColorPickerSection
      selectedColor={props.selectedColor}
      setSelectedColor={props.setSelectedColor}
    />
  );
}

/**
 * Renders the content editor section of the edit mode
 * @param {EditModeProps} props - The component props
 * @returns {JSX.Element} The rendered content editor section
 */
function renderContentEditor(props: EditModeProps): JSX.Element {
  return (
    <ContentEditor
      newContent={props.newContent}
      textareaRef={props.textareaRef}
      setNewContent={props.setNewContent}
      handleKeyDown={props.handleKeyDown}
    />
  );
}

/**
 * Component for editing placeholder content
 * @param {EditModeProps} props - Component props
 * @returns {JSX.Element} The rendered edit mode component
 */
export function EditMode(props: EditModeProps): JSX.Element {
  return (
    <>
      {renderColorPicker(props)}
      {renderContentEditor(props)}
    </>
  );
}
