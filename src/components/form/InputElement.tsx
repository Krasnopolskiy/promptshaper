import React from 'react';
import {Input} from '@/components/ui/input';

/**
 * Props for the input element component
 */
export interface InputElementProps {
  /**
   * The input element ID
   */
  id: string;
  /**
   * The input value
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
   * Autocomplete setting
   */
  autoComplete?: string;
}

/**
 * Handles input change events
 * @param {(value: string) => void} onChange - The change handler
 * @returns {(e: React.ChangeEvent<HTMLInputElement>) => void} The event handler function
 */
function createChangeHandler(
  onChange: (value: string) => void
): (e: React.ChangeEvent<HTMLInputElement>) => void {
  return (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };
}

/**
 * Creates input props with event handlers
 * @param {InputElementProps} props - The input props
 * @returns {React.InputHTMLAttributes<HTMLInputElement>} The processed props
 */
function createInputProps(props: InputElementProps): React.InputHTMLAttributes<HTMLInputElement> {
  const {id, value, onChange, ...rest} = props;
  return {
    id,
    value,
    onChange: createChangeHandler(onChange),
    className: "bg-background",
    ...rest
  };
}

/**
 * Renders an input element with its handlers
 * @param {InputElementProps} props - The component props
 * @returns {JSX.Element} The input element
 */
export function InputElement(props: InputElementProps): JSX.Element {
  const inputProps = createInputProps(props);
  return <Input {...inputProps} />;
}
