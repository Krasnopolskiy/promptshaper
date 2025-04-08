import React from 'react';
import {Textarea} from '@/components/ui/textarea';

/**
 * Props for the textarea element component
 */
export interface TextareaElementProps {
  /**
   * The textarea element ID
   */
  id: string;
  /**
   * The textarea value
   */
  value: string;
  /**
   * Handler for value changes
   * @param value - The new value
   */
  onChange: (value: string) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Number of rows
   */
  rows?: number;
}

/**
 * Handles textarea change events
 * @param {Function} onChange - The change handler
 * @returns {Function} The event handler function
 */
function createChangeHandler(
  onChange: (value: string) => void
): (e: React.ChangeEvent<HTMLTextAreaElement>) => void {
  return (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(e.target.value);
  };
}

/**
 * Creates textarea props with event handlers
 * @param {TextareaElementProps} props - The textarea props
 * @returns {React.TextareaHTMLAttributes<HTMLTextAreaElement>} The processed props
 */
function createTextareaProps(props: TextareaElementProps): React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  const {id, value, onChange, ...rest} = props;
  return {
    id,
    value,
    onChange: createChangeHandler(onChange),
    className: "resize-none bg-background",
    ...rest
  };
}

/**
 * Renders the textarea with props and handling
 * @param {TextareaElementProps} props - Component props
 * @returns {JSX.Element} The textarea element
 */
export function TextareaElement(props: TextareaElementProps): JSX.Element {
  const textareaProps = createTextareaProps(props);
  return <Textarea {...textareaProps} />;
}
