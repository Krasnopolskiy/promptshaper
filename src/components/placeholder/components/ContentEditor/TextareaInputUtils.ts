import { cn } from '@/lib/utils';
import { type ChangeEvent, type KeyboardEvent, type CSSProperties } from 'react';
import { type TextareaHTMLAttributes } from 'react';
import { TextareaProps, TextareaPropsParams } from './types';

/**
 * Returns the class name for the textarea based on the editing state
 *
 * @param {boolean} isEditing - Whether the textarea is in editing mode
 * @returns {string} The class name for the textarea
 */
export function getTextareaClassName(isEditing: boolean): string {
  return cn(
    'w-full resize-none overflow-hidden bg-transparent text-left outline-none',
    isEditing ? 'min-h-[6rem]' : 'min-h-[1.5rem]'
  );
}

/**
 * Creates a style object for the textarea based on the maximum height
 *
 * @param {number} maxHeight - The maximum height of the textarea
 * @returns {CSSProperties} The style object for the textarea
 */
export function createTextareaStyle(maxHeight?: number): CSSProperties {
  return maxHeight ? { maxHeight: `${maxHeight}px` } : {};
}

/**
 * Creates a change handler for the textarea
 *
 * @param {(value: string) => void} onChange - The function to call when the textarea value changes
 * @returns {(e: ChangeEvent<HTMLTextAreaElement>) => void} The change handler function
 */
export function createChangeHandler(
  onChange: (value: string) => void
): (e: ChangeEvent<HTMLTextAreaElement>) => void {
  return (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
}

/**
 * Checks if the Ctrl+Enter key combination is pressed
 *
 * @param {KeyboardEvent<HTMLTextAreaElement>} e - The keyboard event
 * @returns {boolean} Whether the Ctrl+Enter key combination is pressed
 */
export function isCtrlEnterPressed(
  e: KeyboardEvent<HTMLTextAreaElement>
): boolean {
  return e.key === 'Enter' && (e.ctrlKey || e.metaKey);
}

/**
 * Creates a key down handler for the textarea that triggers an accept action
 *
 * @param {() => void} onAccept - The function to call when accepting the edit
 * @returns {(e: KeyboardEvent<HTMLTextAreaElement>) => void} The key down handler function
 */
export function createKeyDownHandler(
  onAccept: () => void
): (e: KeyboardEvent<HTMLTextAreaElement>) => void {
  return (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (isCtrlEnterPressed(e)) {
      e.preventDefault();
      onAccept();
    }
  };
}

/**
 * Creates event handlers for the textarea
 *
 * @param {(value: string) => void} onChange - The function to call when the textarea value changes
 * @param {() => void} onAccept - The function to call when accepting the edit
 * @returns {Object} An object containing the change and key down handlers
 */
export function createEventHandlers(
  onChange: (value: string) => void,
  onAccept: () => void
): { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void; onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void } {
  return {
    onChange: createChangeHandler(onChange),
    onKeyDown: createKeyDownHandler(onAccept),
  };
}

/**
 * Creates textarea event handlers
 *
 * @param {(value: string) => void} setValue - Function to set value
 * @param {() => void} handleAcceptClick - Function to handle accept click
 * @returns {Object} Event handlers object
 */
function createTextareaEventHandlers(
  setValue: (value: string) => void,
  handleAcceptClick: () => void
): Partial<TextareaProps> {
  return createEventHandlers(setValue, handleAcceptClick);
}

/**
 * Creates props for the textarea element
 *
 * @param {TextareaPropsParams} params - Parameters for creating textarea props
 * @returns {TextareaProps} Props for the textarea element
 */
export function createTextareaProps(
  params: TextareaPropsParams
): TextareaProps {
  const { value, defaultValue, setValue, handleAcceptClick } = params;
  const handlers = createTextareaEventHandlers(setValue, handleAcceptClick);
  return { value, defaultValue, ...handlers };
}

/**
 * Creates base HTML attributes for the textarea
 *
 * @param {boolean} isEditing - Whether the textarea is in editing mode
 * @returns {TextareaHTMLAttributes<HTMLTextAreaElement>} The base HTML attributes for the textarea
 */
export function createBaseAttributes(
  isEditing: boolean
): TextareaHTMLAttributes<HTMLTextAreaElement> {
  return {
    spellCheck: true,
    autoFocus: isEditing,
    rows: 1,
  };
}

/**
 * Creates attributes for the textarea element
 *
 * @param {boolean} isEditing - Whether the textarea is in editing mode
 * @param {number} maxHeight - The maximum height of the textarea
 * @returns {Object} An object containing the class name and style for the textarea
 */
export function createTextareaAttributes(
  isEditing: boolean,
  maxHeight?: number
): { className: string; style: CSSProperties } {
  return {
    className: getTextareaClassName(isEditing),
    style: createTextareaStyle(maxHeight),
  };
}
