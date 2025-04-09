/**
 * Content Textarea Component
 *
 * Textarea for editing content with controls
 *
 * @module components/placeholder/components/ContentTextarea
 */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

/**
 * Content textarea props interface
 * @interface ContentTextareaProps
 */
export interface ContentTextareaProps {
  /** Current textarea value */
  value: string;
  /** Function to set value */
  setValue: (value: string) => void;
  /** Whether editing is enabled */
  isEditing: boolean;
  /** Function to set editing state */
  setIsEditing: (editing: boolean) => void;
  /** Function to handle accept click */
  handleAcceptClick: () => void;
  /** Maximum height for textarea */
  maxHeight?: number;
}

/**
 * Textarea controls props interface
 * @interface TextareaControlsProps
 */
interface TextareaControlsProps {
  /** Whether editing is enabled */
  isEditing: boolean;
  /** Function to set editing state */
  setIsEditing: (editing: boolean) => void;
  /** Function to handle accept click */
  handleAcceptClick: () => void;
}

/**
 * Textarea input props interface
 * @interface TextareaInputProps
 */
interface TextareaInputProps {
  /** Current value */
  value: string;
  /** Function to set value */
  setValue: (value: string) => void;
  /** Whether editing is enabled */
  isEditing: boolean;
  /** Function to handle accept click */
  handleAcceptClick: () => void;
  /** Maximum height for textarea */
  maxHeight?: number;
}

/**
 * Handles key down events in the textarea
 * @param {React.KeyboardEvent<HTMLTextAreaElement>} e - The keyboard event
 * @param {Function} handleAcceptClick - Function to handle accept action
 * @returns {void} Nothing
 */
function handleKeyDown(
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  handleAcceptClick: () => void
): void {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    handleAcceptClick();
  }
}

/**
 * Renders a cancel button for the textarea controls
 * @param {Object} props - Button properties
 * @param {Function} props.setIsEditing - Function to set editing state to false
 * @returns {JSX.Element} Cancel button component
 */
function CancelButton(props: { setIsEditing: (editing: boolean) => void }): JSX.Element {
  return <Button variant="outline" size="sm" onClick={() => props.setIsEditing(false)}>Cancel</Button>;
}

/**
 * Renders an accept button for the textarea controls
 * @param {Object} props - Button properties
 * @param {Function} props.handleAcceptClick - Function to handle accept action
 * @returns {JSX.Element} Accept button component
 */
function AcceptButton(props: { handleAcceptClick: () => void }): JSX.Element {
  return <Button size="sm" onClick={props.handleAcceptClick}>Accept</Button>;
}

/**
 * Gets the className for the textarea based on editing state
 * @param {boolean} isEditing - Whether in editing mode
 * @returns {string} Combined className string
 */
function getTextareaClassName(isEditing: boolean): string {
  return cn(
    "resize-none min-h-20 text-sm",
    !isEditing && "border-none shadow-none p-0 h-auto"
  );
}

/**
 * Creates controls content based on editing state
 * @param {TextareaControlsProps} props - Component props
 * @returns {JSX.Element | null} Controls content or null
 */
function createControlsContent(props: TextareaControlsProps): JSX.Element | null {
  if (!props.isEditing) return null;

  return (
    <div className="flex justify-end mt-2 gap-2">
      <CancelButton setIsEditing={props.setIsEditing} />
      <AcceptButton handleAcceptClick={props.handleAcceptClick} />
    </div>
  );
}

/**
 * Renders the textarea controls section
 * @param {TextareaControlsProps} props - Component props
 * @returns {JSX.Element | null} Controls or null
 */
function TextareaControls(props: TextareaControlsProps): JSX.Element | null {
  return createControlsContent(props);
}

/**
 * Creates basic textarea properties
 * @param {TextareaInputProps} props - Component props
 * @returns {Object} Base properties
 */
function createBasicTextareaProps(props: TextareaInputProps): {
  value: string;
  placeholder: string;
  disabled: boolean;
} {
  return { value: props.value, placeholder: "Enter content...", disabled: !props.isEditing };
}

/**
 * Creates style properties for textarea
 * @param {TextareaInputProps} props - Component props
 * @returns {Object} Style properties
 */
function createTextareaStyleProps(props: TextareaInputProps): {
  className: string;
  style?: React.CSSProperties;
} {
  return {
    className: getTextareaClassName(props.isEditing),
    style: { maxHeight: props.maxHeight ? `${props.maxHeight}px` : undefined }
  };
}

/**
 * Creates props for the textarea input
 * @param {TextareaInputProps} props - Component props
 * @returns {Object} Textarea props with handlers and styles
 */
function createTextareaProps(props: TextareaInputProps): React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className: string;
  style?: React.CSSProperties;
} {
  const basicProps = createBasicTextareaProps(props);
  const eventHandlers = { onChange: createChangeHandler(props), onKeyDown: createKeyDownHandler(props) };
  const styleProps = createTextareaStyleProps(props);
  return { ...basicProps, ...eventHandlers, ...styleProps };
}

/**
 * Creates change handler for textarea
 * @description Creates the onChange event handler for the textarea
 * @param {TextareaInputProps} props - Component props
 * @returns {React.ChangeEventHandler<HTMLTextAreaElement>} Change event handler
 */
function createChangeHandler(props: TextareaInputProps): React.ChangeEventHandler<HTMLTextAreaElement> {
  return (e: React.ChangeEvent<HTMLTextAreaElement>) => props.setValue(e.target.value);
}

/**
 * Creates keydown handler for textarea
 * @description Creates the onKeyDown event handler for the textarea
 * @param {TextareaInputProps} props - Component props
 * @returns {React.KeyboardEventHandler<HTMLTextAreaElement>} Keyboard event handler
 */
function createKeyDownHandler(props: TextareaInputProps): React.KeyboardEventHandler<HTMLTextAreaElement> {
  return (e: React.KeyboardEvent<HTMLTextAreaElement>) => handleKeyDown(e, props.handleAcceptClick);
}

/**
 * Renders the textarea input field
 * @param {TextareaInputProps} props - Component props
 * @returns {JSX.Element} Textarea element
 */
function TextareaInput(props: TextareaInputProps): JSX.Element {
  return <Textarea {...createTextareaProps(props)} />;
}

/**
 * Creates input element props
 * @param {ContentTextareaProps} props - Component props
 * @returns {TextareaInputProps} Input props
 */
function createInputProps(props: ContentTextareaProps): TextareaInputProps {
  return {
    value: props.value,
    setValue: props.setValue,
    isEditing: props.isEditing,
    handleAcceptClick: props.handleAcceptClick,
    maxHeight: props.maxHeight
  };
}

/**
 * Creates input element for textarea content
 * @param {ContentTextareaProps} props - Component props
 * @returns {JSX.Element} Input element
 */
function createInputElement(props: ContentTextareaProps): JSX.Element {
  return <TextareaInput key="input" {...createInputProps(props)} />;
}

/**
 * Creates controls element props
 * @param {ContentTextareaProps} props - Component props
 * @returns {TextareaControlsProps} Controls props
 */
function createControlsProps(props: ContentTextareaProps): TextareaControlsProps {
  return {
    isEditing: props.isEditing,
    setIsEditing: props.setIsEditing,
    handleAcceptClick: props.handleAcceptClick
  };
}

/**
 * Creates controls element for textarea content
 * @param {ContentTextareaProps} props - Component props
 * @returns {JSX.Element} Controls element
 */
function createControlsElement(props: ContentTextareaProps): JSX.Element {
  return <TextareaControls key="controls" {...createControlsProps(props)} />;
}

/**
 * Creates the content for the textarea component
 * @param {ContentTextareaProps} props - Component props
 * @returns {JSX.Element[]} Components for textarea and controls
 */
function createTextareaContent(props: ContentTextareaProps): JSX.Element[] {
  return [
    createInputElement(props),
    createControlsElement(props)
  ];
}

/**
 * Renders the complete textarea component with controls
 * @param {ContentTextareaProps} props - Component props
 * @returns {JSX.Element} Textarea with controls
 */
export function ContentTextarea(props: ContentTextareaProps): JSX.Element {
  return <div className="relative">{createTextareaContent(props)}</div>;
}
