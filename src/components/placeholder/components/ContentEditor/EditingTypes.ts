/**
 * Editing Types and Utilities
 *
 * Types and helper functions for editing components
 *
 * @module components/placeholder/components/ContentEditor/EditingTypes
 */
import React from 'react';

/**
 * Interface for textarea properties
 */
export interface TextareaContentParams {
  /** Props for the textarea */
  textareaProps: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };
  /** Whether in editing mode */
  isEditing: boolean;
  /** Handler for cancel button */
  handleCancelClick: () => void;
  /** Handler for accept button */
  handleAcceptClick: () => void;
  /** Maximum height for textarea */
  maxHeight?: number;
}

/**
 * Editor content props interface
 */
export interface EditorContentProps {
  /** Whether editing mode is active */
  isEditing: boolean;
  /** Content to display/edit */
  content: string;
  /** Function to handle edit click */
  handleEditClick: (editing: boolean) => void;
  /** Function to set content */
  setContent: (content: string) => void;
  /** Name of content section */
  name: string;
  /** Maximum height for editor */
  maxHeight?: number;
}

/**
 * Handler functions interface
 */
interface HandlerFunctions {
  /** Function to handle cancel action */
  handleCancel: () => void;
  /** Function to handle accept action */
  handleAccept: () => void;
}

/**
 * State object for editing component
 * Includes content value and handler functions
 * @interface EditingStateType
 */
interface _EditingStateType {
  /** Current content value */
  newContent: string;
  /** Function to update content */
  setNewContent: React.Dispatch<React.SetStateAction<string>>;
  /** Function to handle cancel action */
  handleCancel: () => void;
  /** Function to handle accept action */
  handleAccept: () => void;
}

/**
 * Hook result interface with state and handlers
 */
export interface EditingHookResult {
  /** Current content value */
  newContent: string;
  /** Function to update content */
  setNewContent: React.Dispatch<React.SetStateAction<string>>;
  /** Function to handle cancel action */
  handleCancel: () => void;
  /** Function to handle accept action */
  handleAccept: () => void;
}

/**
 * Custom hook for content state management
 * @param {string} content - Initial content value
 * @returns {[string, React.Dispatch<React.SetStateAction<string>>]} Content state and setter
 */
export const useContentState = (
  content: string
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  return React.useState<string>(content);
};

/**
 * Creates cancel handler function
 * @param {Function} handleEditClick - Edit click handler
 * @returns {() => void} Cancel handler function
 */
const createCancelHandler = (
  handleEditClick: (editing: boolean) => void
): () => void => {
  return () => handleEditClick(false);
};

/**
 * Part 1 of accept handler: Update content
 * @param {string} newContent - Current content value
 * @param {Function} setContent - Content setter
 */
const updateContent = (
  newContent: string,
  setContent: (content: string) => void
): void => {
  setContent(newContent);
};

/**
 * Part 2 of accept handler: Close editor
 * @param {Function} handleEditClick - Edit click handler
 */
const closeEditor = (
  handleEditClick: (editing: boolean) => void
): void => {
  handleEditClick(false);
};

/**
 * Creates accept handler function
 * @param {string} newContent - Current content value
 * @param {Function} handleEditClick - Edit click handler
 * @param {Function} setContent - Content setter
 * @returns {() => void} Accept handler function
 */
const createAcceptHandler = (
  newContent: string,
  handleEditClick: (editing: boolean) => void,
  setContent: (content: string) => void
): () => void => {
  return () => {
    updateContent(newContent, setContent);
    closeEditor(handleEditClick);
  };
};

/**
 * Custom hook for editing handler functions
 * @param {string} newContent - Current content value
 * @param {Function} handleEditClick - Edit click handler
 * @param {Function} setContent - Content setter
 * @returns {{ handleCancel: () => void; handleAccept: () => void }} Handler functions
 */
export const useEditingHandlers = (
  newContent: string,
  handleEditClick: (editing: boolean) => void,
  setContent: (content: string) => void
): { handleCancel: () => void; handleAccept: () => void } => {
  return {
    handleCancel: createCancelHandler(handleEditClick),
    handleAccept: createAcceptHandler(newContent, handleEditClick, setContent)
  };
};

/**
 * Creates a cancel handler for editing
 * @param {EditorContentProps} props - Editor props
 * @returns {Function} Cancel handler function
 */
const getCancelHandler = (
  props: EditorContentProps
): () => void => {
  return createCancelHandler(props.handleEditClick);
};

/**
 * Creates an accept handler for editing
 * @param {string} content - Content to save
 * @param {EditorContentProps} props - Editor props
 * @returns {Function} Accept handler function
 */
const getAcceptHandler = (
  content: string,
  props: EditorContentProps
): () => void => {
  return createAcceptHandler(
    content,
    props.handleEditClick,
    props.setContent
  );
};

/**
 * Creates handlers for editing operations
 * @param {string} content - Current content
 * @param {EditorContentProps} props - Editor props
 * @returns {HandlerFunctions} Handler functions
 */
const getEditingHandlers = (
  content: string,
  props: EditorContentProps
): HandlerFunctions => {
  return {
    handleCancel: getCancelHandler(props),
    handleAccept: getAcceptHandler(content, props)
  };
};

/**
 * Creates a hook result object with handlers
 * @param {string} content - Content value
 * @param {Function} setter - Content setter function
 * @param {Object} handlers - Handler functions
 * @returns {EditingHookResult} Hook result object
 */
const createHookResult = (
  content: string,
  setter: React.Dispatch<React.SetStateAction<string>>,
  handlers: HandlerFunctions
): EditingHookResult => ({
  newContent: content,
  setNewContent: setter,
  handleCancel: handlers.handleCancel,
  handleAccept: handlers.handleAccept
});

/**
 * Custom hook for editing content
 * Sets up state and handlers for content editing
 * @param {EditorContentProps} props - Editor props
 * @returns {EditingHookResult} State and handlers for editing
 */
export const useEditing = (
  props: EditorContentProps
): EditingHookResult => {
  // Use React hooks directly in custom hook
  const [newContent, setNewContent] = React.useState(props.content);
  const handlers = getEditingHandlers(newContent, props);

  return createHookResult(newContent, setNewContent, handlers);
};
