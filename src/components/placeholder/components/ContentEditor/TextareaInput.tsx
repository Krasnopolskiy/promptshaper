/**
 * Textarea Input
 *
 * Components for textarea input in the ContentEditor
 *
 * @module components/placeholder/components/ContentEditor/TextareaInput
 */
import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Textarea component props interface
 * @interface TextareaProps
 */
export interface TextareaProps {
  /** Current value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Change event handler */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Keydown event handler */
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

/**
 * Parameters for creating textarea props
 * @interface TextareaPropsParams
 */
export interface TextareaPropsParams {
  /** Current value */
  value: string;
  /** Default value */
  defaultValue?: string;
  /** Function to set value */
  setValue: React.Dispatch<React.SetStateAction<string>>;
  /** Whether in editing mode */
  isEditing?: boolean;
  /** Function to handle accept action */
  handleAcceptClick: () => void;
  /** Maximum height for textarea */
  maxHeight?: number;
}

/**
 * Gets the class name for textarea based on editing state
 * @param {boolean} isEditing - Whether in edit mode
 * @returns {string} Class name for textarea
 */
export const getTextareaClassName = (isEditing: boolean): string =>
  cn('resize-none', { 'cursor-not-allowed': !isEditing });

/**
 * Creates style object for textarea based on max height
 * @param {number | undefined} maxHeight - Maximum height for textarea
 * @returns {React.CSSProperties | undefined} Style object or undefined
 */
export const createTextareaStyle = (maxHeight?: number): React.CSSProperties | undefined =>
  maxHeight ? { maxHeight: `${maxHeight}px` } : undefined;

/**
 * Creates the change event handler for the textarea
 * @param {Object} params - Parameters object
 * @param {React.Dispatch<React.SetStateAction<string>>} params.setValue - State setter for the textarea value
 * @returns {(event: React.ChangeEvent<HTMLTextAreaElement>) => void} Change event handler
 */
export const createChangeHandler = ({
  setValue
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
}): ((event: React.ChangeEvent<HTMLTextAreaElement>) => void) => (
  event => setValue(event.target.value)
);

/**
 * Check if enter key with Ctrl is pressed
 * @param {React.KeyboardEvent<HTMLTextAreaElement>} event - Keyboard event
 * @returns {boolean} True if Ctrl+Enter is pressed
 */
export const isCtrlEnterPressed = (event: React.KeyboardEvent<HTMLTextAreaElement>): boolean => {
  return event.ctrlKey && event.key === 'Enter';
};

/**
 * Creates the key down event handler for the textarea
 * @param {Object} params - Parameters object
 * @param {() => void} params.handleAcceptClick - Function to handle accept click
 * @returns {(event: React.KeyboardEvent<HTMLTextAreaElement>) => void} Key down event handler
 */
export const createKeyDownHandler = ({
  handleAcceptClick
}: {
  handleAcceptClick: () => void;
}): ((event: React.KeyboardEvent<HTMLTextAreaElement>) => void) =>
  event => isCtrlEnterPressed(event) && handleAcceptClick();

/**
 * Type for event handlers object
 */
type EventHandlers = {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement>;
};

/**
 * Creates the onChange and onKeyDown handlers for textarea props
 * @param {Object} params - Parameters object
 * @param {React.Dispatch<React.SetStateAction<string>>} params.setValue - State setter
 * @param {() => void} params.handleAcceptClick - Handler for accept action
 * @returns {EventHandlers} Object containing onChange and onKeyDown handlers
 */
export const createEventHandlers = ({
  setValue,
  handleAcceptClick
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleAcceptClick: () => void;
}): EventHandlers => ({
  onChange: createChangeHandler({ setValue }),
  onKeyDown: createKeyDownHandler({ handleAcceptClick })
});

/**
 * Creates props for the textarea element
 * @param {TextareaPropsParams} params - Parameters for creating textarea props
 * @returns {TextareaProps} Props for the textarea element
 */
export const createTextareaProps = ({
  value,
  defaultValue,
  setValue,
  handleAcceptClick
}: TextareaPropsParams): TextareaProps => ({
  value,
  defaultValue,
  ...createEventHandlers({ setValue, handleAcceptClick })
});

/**
 * Type for textarea attributes parameters
 */
type TextareaAttributesParams = {
  placeholder: string;
  isEditing: boolean;
  maxHeight?: number;
};

/**
 * Type for textarea attributes
 */
type TextareaAttributes = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof TextareaProps>;

/**
 * Creates HTML attributes for the textarea element
 * @param {TextareaAttributesParams} params - Parameters object
 * @returns {TextareaAttributes} HTML attributes for textarea
 */
export const createTextareaAttributes = ({
  placeholder,
  isEditing,
  maxHeight
}: TextareaAttributesParams): TextareaAttributes => ({
  placeholder,
  disabled: !isEditing,
  className: getTextareaClassName(isEditing),
  style: createTextareaStyle(maxHeight)
});

/**
 * Type for textarea input parameters
 */
type TextareaInputParams = {
  textareaProps: TextareaProps;
  placeholder: string;
  isEditing: boolean;
  maxHeight?: number;
};

/**
 * Creates the textarea input component with proper props
 * @param {TextareaInputParams} params - Parameters object
 * @returns {JSX.Element} Textarea input component
 */
export const createTextareaInput = ({
  textareaProps,
  ...attributeParams
}: TextareaInputParams): JSX.Element => (
  <textarea {...textareaProps} {...createTextareaAttributes(attributeParams)} />
);
