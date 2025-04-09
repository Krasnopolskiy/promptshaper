/**
 * Utility handlers for placeholder actions
 *
 * @module components/placeholder/utils/utilityHandlers
 */
import React from 'react';

/**
 * Handler interface for utility handlers
 */
export interface UtilityHandlers {
  /** Handler for keydown events */
  handleKeyDown: (e: React.KeyboardEvent) => void;
  /** Handler for copying to clipboard */
  handleCopyToClipboard: () => Promise<void>;
  /** Handler for delete operation */
  handleDelete: () => void;
  /** Handler for insert operation */
  handleInsert: () => void;
}

/**
 * Checks if save operation should be processed
 * @param {string} newName - Name to validate
 * @returns {boolean} Whether save should proceed
 */
export function shouldProceedWithSave(newName: string): boolean {
  return newName.trim() !== '';
}

/**
 * Creates name and content payload for placeholder update
 * @param {string} newName - New name value
 * @param {string} newContent - New content value
 * @returns {Object} Basic payload with name and content
 */
export function createBasicPayload(
  newName: string,
  newContent: string
): { name: string; content: string } {
  return {
    name: newName,
    content: newContent
  };
}

/**
 * State with name type
 * @interface NameState
 */
interface NameState {
  /** Name value in state */
  newName: string;
}

/**
 * State with content type
 * @interface ContentState
 */
interface ContentState {
  /** Content value in state */
  newContent: string;
}

/**
 * State with color type
 * @interface ColorState
 */
interface ColorState {
  /** Color value in state */
  selectedColor: string;
}

/**
 * Gets the name from state
 * @param {NameState} state - Component state with name
 * @returns {string} Name value
 */
export function getNameFromState(state: NameState): string {
  return state.newName;
}

/**
 * Gets the content from state
 * @param {ContentState} state - Component state with content
 * @returns {string} Content value
 */
export function getContentFromState(state: ContentState): string {
  return state.newContent;
}

/**
 * Gets the color from state
 * @param {ColorState} state - Component state with color
 * @returns {string} Color value
 */
export function getColorFromState(state: ColorState): string {
  return state.selectedColor;
}

/**
 * Props type with state
 * @interface PropsWithState
 */
interface PropsWithState {
  /** State with form values */
  state: NameState & ContentState & ColorState;
}

/**
 * Creates a name property from state
 * @param {PropsWithState} props - Props with state
 * @returns {Object} Object with name property
 */
function createNameProp(
  props: PropsWithState
): { newName: string } {
  return {
    newName: getNameFromState(props.state)
  };
}

/**
 * Creates a content property from state
 * @param {PropsWithState} props - Props with state
 * @returns {Object} Object with content property
 */
function createContentProp(
  props: PropsWithState
): { newContent: string } {
  return {
    newContent: getContentFromState(props.state)
  };
}

/**
 * Creates a color property from state
 * @param {PropsWithState} props - Props with state
 * @returns {Object} Object with color property
 */
function createColorProp(
  props: PropsWithState
): { selectedColor: string } {
  return {
    selectedColor: getColorFromState(props.state)
  };
}

/**
 * State properties result type
 * @interface StateProperties
 */
interface StateProperties {
  /** Name value */
  newName: string;
  /** Content value */
  newContent: string;
  /** Color value */
  selectedColor: string;
}

/**
 * Extracts state properties from props
 * Creates an object with properties from state
 * @param {PropsWithState} props - Action handler props with state
 * @returns {StateProperties} State properties object
 */
export function extractStateProps(
  props: PropsWithState
): StateProperties {
  return {
    ...createNameProp(props),
    ...createContentProp(props),
    ...createColorProp(props)
  };
}

/**
 * Checks if enter key was pressed without shift
 * @param {React.KeyboardEvent} e - Keyboard event
 * @returns {boolean} Whether enter was pressed
 */
function isEnterKeyPressed(e: React.KeyboardEvent): boolean {
  return e.key === 'Enter' && !e.shiftKey;
}

/**
 * Calls the handler and prevents default
 * @param {React.KeyboardEvent} e - Keyboard event
 * @param {Function} handler - Handler to call
 * @returns {void} Nothing
 */
function callHandlerAndPreventDefault(
  e: React.KeyboardEvent,
  handler: () => void
): void {
  e.preventDefault();
  handler();
}

/**
 * Handles enter key press
 * Detects enter key and calls handler if needed
 * @param {React.KeyboardEvent} e - Keyboard event
 * @param {Function} handler - Function to call on enter
 * @returns {boolean} Whether the key was handled
 */
function handleEnterKey(
  e: React.KeyboardEvent,
  handler: () => void
): boolean {
  if (isEnterKeyPressed(e)) {
    callHandlerAndPreventDefault(e, handler);
    return true;
  }
  return false;
}

/**
 * Handles escape key press
 * @param {React.KeyboardEvent} e - Keyboard event
 * @param {Function} handler - Function to call on escape
 * @returns {boolean} Whether the key was handled
 */
function handleEscapeKey(
  e: React.KeyboardEvent,
  handler: () => void
): boolean {
  if (e.key === 'Escape') {
    handler();
    return true;
  }
  return false;
}

/**
 * Creates a keydown event handler
 * @param {Function} saveHandler - Save handler function
 * @param {Function} cancelHandler - Cancel handler function
 * @returns {Function} Keydown handler function
 */
function createKeyDownHandler(
  saveHandler: () => void,
  cancelHandler: () => void
): (e: React.KeyboardEvent) => void {
  return (e: React.KeyboardEvent): void => {
    if (handleEnterKey(e, saveHandler)) return;
    handleEscapeKey(e, cancelHandler);
  };
}

/**
 * Creates a clipboard copy handler
 * @param {string} name - Placeholder name
 * @returns {Function} Clipboard handler function
 */
function createClipboardHandler(name: string): () => Promise<void> {
  return async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(`<${name}>`);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };
}

/**
 * Creates an insert handler
 * @param {string} name - Placeholder name
 * @param {Function|undefined} onInsert - Insert handler
 * @returns {Function} Insert handler function
 */
function createInsertHandler(
  name: string,
  onInsert?: (name: string) => void
): () => void {
  return (): void => {
    if (onInsert) {
      onInsert(name);
    }
  };
}

/**
 * Props with placeholder type
 * @interface PropsWithPlaceholder
 */
interface PropsWithPlaceholder {
  /** Placeholder object */
  placeholder: {
    /** Name of placeholder */
    name: string;
    /** ID of placeholder */
    id: string;
  };
  /** Delete handler */
  onDelete: (id: string) => void;
  /** Insert handler */
  onInsert?: (name: string) => void;
}

/**
 * Base handlers type
 * @interface BaseHandlers
 */
interface BaseHandlers {
  /** Save handler */
  handleSave: () => void;
  /** Cancel handler */
  handleCancel: () => void;
}

/**
 * Event handlers object type
 * @interface EventHandlers
 */
interface EventHandlers {
  /** Keyboard event handler */
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * Creates keyboard event handlers
 * Wraps keydown handler with save/cancel functions
 * @param {BaseHandlers} baseHandlers - Base handlers with save/cancel
 * @returns {EventHandlers} Event handlers object
 */
function createEventHandlers(
  baseHandlers: BaseHandlers
): EventHandlers {
  return {
    handleKeyDown: createKeyDownHandler(
      baseHandlers.handleSave,
      baseHandlers.handleCancel
    )
  };
}

/**
 * Action handlers object type
 * @interface ActionUtilHandlers
 */
interface ActionUtilHandlers {
  /** Clipboard handler */
  handleCopyToClipboard: () => Promise<void>;
  /** Delete handler */
  handleDelete: () => void;
  /** Insert handler */
  handleInsert: () => void;
}

/**
 * Creates clipboard and action handlers
 * Builds handlers for clipboard, delete and insert operations
 * @param {PropsWithPlaceholder} props - Props with placeholder data
 * @returns {ActionUtilHandlers} Action handlers object
 */
function createActionHandlers(
  props: PropsWithPlaceholder
): ActionUtilHandlers {
  return {
    handleCopyToClipboard: createClipboardHandler(props.placeholder.name),
    /**
     * Handles deletion of a placeholder by ID
     * @returns {void} No return value
     */
    handleDelete: () => props.onDelete(props.placeholder.id),
    handleInsert: createInsertHandler(props.placeholder.name, props.onInsert)
  };
}

/**
 * Creates utility handlers for actions
 * Creates keyboard, clipboard, and other utility handlers
 * @param {PropsWithPlaceholder} props - Handler props with placeholder
 * @param {BaseHandlers} baseHandlers - Base handlers with save/cancel
 * @returns {UtilityHandlers} Utility handlers object
 */
export function createUtilityHandlers(
  props: PropsWithPlaceholder,
  baseHandlers: BaseHandlers
): UtilityHandlers {
  return {
    ...createEventHandlers(baseHandlers),
    ...createActionHandlers(props)
  };
}
