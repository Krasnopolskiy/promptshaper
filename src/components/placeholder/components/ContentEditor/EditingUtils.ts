import { useState, useEffect } from 'react';
import { EditHandlers } from './types';

/**
 * Creates cancel handler
 * @param {Function} handleEditClick - Edit click handler
 * @returns {Function} Cancel handler
 */
export const createCancelHandler = (
  handleEditClick: (editing: boolean) => void
): () => void => (): void => {
  handleEditClick(false);
};

/**
 * Creates accept handler
 * @param {string} newContent - New content
 * @param {Function} setContent - Content setter
 * @param {Function} handleEditClick - Edit click handler
 * @returns {Function} Accept handler
 */
export const createAcceptHandler = (
  newContent: string,
  setContent: (content: string) => void,
  handleEditClick: (editing: boolean) => void
): () => void => (): void => {
  setContent(newContent);
  handleEditClick(false);
};

/**
 * Manages state updates for the editing component
 * @param {string} newContent - Current content being edited
 * @param {Function} handleEditClick - Function to handle edit state
 * @param {Function} setContent - Function to set content
 * @returns {EditHandlers} State update handlers
 */
export const useEditingHandlers = (
  newContent: string,
  handleEditClick: (editing: boolean) => void,
  setContent: (content: string) => void
): EditHandlers => ({
  handleCancel: createCancelHandler(handleEditClick),
  handleAccept: createAcceptHandler(newContent, setContent, handleEditClick)
});

/**
 * Sets up the content editing state and effects
 * @param {string} content - Initial content
 * @returns {[string, (value: string) => void]} Content state and setter
 */
export const useContentState = (content: string): [string, (value: string) => void] => {
  const [newContent, setNewContent] = useState(content);

  // Reset newContent when content props change
  useEffect(() => {
    setNewContent(content);
  }, [content]);

  return [newContent, setNewContent];
};

/**
 * Creates a handler for when editing is cancelled
 * @param {Function} handleCancel - Cancel handler
 * @returns {Function} Edit state handler
 */
export const createEditingCancelHandler = (
  handleCancel: () => void
): ((editing: boolean) => void) => {
  return (editing: boolean): void => {
    if (!editing) handleCancel();
  };
};

/**
 * Properties for content textarea
 */
export interface ContentTextareaProps {
  /** Content value */
  value: string;
  /** Function to set value */
  setValue: (value: string) => void;
  /** Whether editing mode is active */
  isEditing: boolean;
  /** Function to set editing mode */
  setIsEditing: (editing: boolean) => void;
  /** Function to handle accept click */
  handleAcceptClick: () => void;
  /** Maximum height for textarea */
  maxHeight?: number;
}

/**
 * Creates basic props for textarea
 * @param {string} newContent - Current content
 * @param {Function} setNewContent - Content setter function
 * @returns {Object} Basic props
 */
export const createBasicTextareaProps = (
  newContent: string,
  setNewContent: (value: string) => void
): Pick<ContentTextareaProps, 'value' | 'setValue' | 'isEditing'> => ({
  value: newContent,
  setValue: setNewContent,
  isEditing: true
});

/**
 * Creates handler props for textarea
 * @param {Function} handleCancel - Cancel handler
 * @param {Function} handleAccept - Accept handler
 * @returns {Object} Handler props
 */
export const createHandlerTextareaProps = (
  handleCancel: () => void,
  handleAccept: () => void
): Pick<ContentTextareaProps, 'setIsEditing' | 'handleAcceptClick'> => ({
  setIsEditing: createEditingCancelHandler(handleCancel),
  handleAcceptClick: handleAccept
});

/**
 * Creates properties for building textarea component
 */
export interface TextareaPropsParams {
  /** Current content */
  newContent: string;
  /** Function to set new content */
  setNewContent: (value: string) => void;
  /** Function to handle cancel action */
  handleCancel: () => void;
  /** Function to handle accept action */
  handleAccept: () => void;
  /** Maximum height for textarea */
  maxHeight?: number;
}

/**
 * Creates props for ContentTextarea - combines basic and handler props
 * @param {TextareaPropsParams} params - Parameters
 * @returns {ContentTextareaProps} Props object
 */
export const createTextareaProps = (
  params: TextareaPropsParams
): ContentTextareaProps => {
  const basicProps = createBasicTextareaProps(
    params.newContent,
    params.setNewContent
  );

  return createCompleteTextareaProps(basicProps, params);
};

/**
 * Creates handler props for the complete textarea
 * @param {TextareaPropsParams} params - Original parameters
 * @returns {Pick<ContentTextareaProps, 'setIsEditing' | 'handleAcceptClick'>} Handler props
 */
export const createCompleteHandlerProps = (
  params: TextareaPropsParams
): Pick<ContentTextareaProps, 'setIsEditing' | 'handleAcceptClick'> => {
  return createHandlerTextareaProps(
    params.handleCancel,
    params.handleAccept
  );
};

/**
 * Type for combined props
 */
type CombinedProps = Pick<
  ContentTextareaProps,
  'value' | 'setValue' | 'isEditing' | 'setIsEditing' | 'handleAcceptClick'
>;

/**
 * Adds height to props
 * @param {CombinedProps} props - Combined base props
 * @param {number} [maxHeight] - Maximum height for textarea
 * @returns {ContentTextareaProps} Complete props
 */
export const addHeightToProps = (
  props: CombinedProps,
  maxHeight?: number
): ContentTextareaProps => ({
  ...props,
  maxHeight
});

/**
 * Combines basic and handler props
 * @param {Pick<ContentTextareaProps, 'value' | 'setValue' | 'isEditing'>} basicProps - Basic props
 * @param {Pick<ContentTextareaProps, 'setIsEditing' | 'handleAcceptClick'>} handlerProps - Handler props
 * @returns {CombinedProps} Combined props without height
 */
export const combineBasicHandlerProps = (
  basicProps: Pick<ContentTextareaProps, 'value' | 'setValue' | 'isEditing'>,
  handlerProps: Pick<ContentTextareaProps, 'setIsEditing' | 'handleAcceptClick'>
): CombinedProps => ({
  ...basicProps,
  ...handlerProps
});

/**
 * Creates complete textarea props by combining basic props with handlers
 * @param {Pick<ContentTextareaProps, 'value' | 'setValue' | 'isEditing'>} basicProps - Basic props
 * @param {TextareaPropsParams} params - Original parameters
 * @returns {ContentTextareaProps} Complete props
 */
export const createCompleteTextareaProps = (
  basicProps: Pick<ContentTextareaProps, 'value' | 'setValue' | 'isEditing'>,
  params: TextareaPropsParams
): ContentTextareaProps => {
  const handlerProps = createCompleteHandlerProps(params);
  const combinedProps = combineBasicHandlerProps(basicProps, handlerProps);
  return addHeightToProps(combinedProps, params.maxHeight);
};
