/**
 * Editing Content Component
 *
 * Manages content in editing mode
 *
 * @module components/placeholder/components/EditingContent
 */
import React, { useState, useEffect } from 'react';
import { ContentTextarea } from './ContentTextarea';
import { EditorContentProps } from './EditorContent';
import type { ContentTextareaProps } from './ContentTextarea';

/**
 * Edit handlers interface
 * @interface EditHandlers
 */
interface EditHandlers {
  /** Handler for cancel action */
  handleCancel: () => void;
  /** Handler for accept action */
  handleAccept: () => void;
}

/**
 * Sets up the content editing state and effects
 * @param {string} content - Initial content
 * @returns {[string, (value: string) => void]} Content state and setter
 */
function useContentState(content: string): [string, (value: string) => void] {
  const [newContent, setNewContent] = useState(content);

  // Reset newContent when content props change
  useEffect(() => {
    setNewContent(content);
  }, [content]);

  return [newContent, setNewContent];
}

/**
 * Creates a cancel handler for editing actions
 * @param {Function} handleEditClick - Function to handle edit state
 * @returns {() => void} Cancel action handler
 */
function createCancelHandler(
  handleEditClick: (editing: boolean) => void
): () => void {
  return (): void => handleEditClick(false);
}

/**
 * Creates an accept handler for editing actions
 * @param {string} newContent - Current content being edited
 * @param {Function} setContent - Function to set content
 * @param {Function} handleEditClick - Function to handle edit state
 * @returns {() => void} Accept action handler
 */
function createAcceptHandler(
  newContent: string,
  setContent: (content: string) => void,
  handleEditClick: (editing: boolean) => void
): () => void {
  return (): void => {
    setContent(newContent);
    handleEditClick(false);
  };
}

/**
 * Creates a function to handle editing state changes
 * @param {Function} handleCancel - Function to handle cancel action
 * @returns {(editing: boolean) => void} Editing state handler
 */
function createEditingStateHandler(
  handleCancel: () => void
): (editing: boolean) => void {
  return (editing: boolean): void => {
    if (!editing) handleCancel();
  };
}

/**
 * Basic textarea parameters type
 */
interface BasicTextareaParams {
  newContent: string;
  setNewContent: (value: string) => void;
  handleAccept: () => void;
}

/**
 * Creates value props for the textarea component
 * @param {BasicTextareaParams} params - Parameters
 * @returns {Partial<ContentTextareaProps>} Value props
 */
function createValueProps(params: BasicTextareaParams): Partial<ContentTextareaProps> {
  return {
    value: params.newContent,
    setValue: params.setNewContent
  };
}

/**
 * Creates interaction props for the textarea component
 * @param {BasicTextareaParams} params - Parameters
 * @returns {Partial<ContentTextareaProps>} Interaction props
 */
function createInteractionProps(params: BasicTextareaParams): Partial<ContentTextareaProps> {
  return {
    isEditing: true,
    handleAcceptClick: params.handleAccept
  };
}

/**
 * Creates basic props for the textarea component
 * @param {BasicTextareaParams} params - Parameters
 * @returns {Partial<ContentTextareaProps>} Basic textarea props
 */
function createBasicTextareaProps(params: BasicTextareaParams): Partial<ContentTextareaProps> {
  const valueProps = createValueProps(params);
  const interactionProps = createInteractionProps(params);

  return { ...valueProps, ...interactionProps };
}

/**
 * Textarea props parameters type
 */
interface TextareaPropsParams {
  newContent: string;
  setNewContent: (value: string) => void;
  handleCancel: () => void;
  handleAccept: () => void;
  maxHeight?: number;
}

/**
 * Creates the basic parameters for textarea props
 * @param {TextareaPropsParams} params - Component parameters
 * @returns {BasicTextareaParams} Basic parameters
 */
function createBasicParams(params: TextareaPropsParams): BasicTextareaParams {
  return {
    newContent: params.newContent,
    setNewContent: params.setNewContent,
    handleAccept: params.handleAccept
  };
}

/**
 * Combines all props for the textarea component
 * @param {Partial<ContentTextareaProps>} basicProps - Basic textarea props
 * @param {TextareaPropsParams} params - Component parameters
 * @returns {ContentTextareaProps} Combined props
 */
function combineTextareaProps(
  basicProps: Partial<ContentTextareaProps>,
  params: TextareaPropsParams
): ContentTextareaProps {
  return {
    ...basicProps,
    setIsEditing: createEditingStateHandler(params.handleCancel),
    maxHeight: params.maxHeight
  } as ContentTextareaProps;
}

/**
 * Creates props for ContentTextarea component
 * @param {TextareaPropsParams} params - Component parameters
 * @returns {ContentTextareaProps} Props for textarea
 */
function createTextareaProps(params: TextareaPropsParams): ContentTextareaProps {
  const basicParams = createBasicParams(params);
  const basicProps = createBasicTextareaProps(basicParams);
  return combineTextareaProps(basicProps, params);
}

/**
 * Creates cancel and accept handlers for editing
 * @param {string} newContent - Current content being edited
 * @param {Function} handleEditClick - Function to handle edit state
 * @param {Function} setContent - Function to set content
 * @returns {EditHandlers} Edit action handlers
 */
function createHandlers(
  newContent: string,
  handleEditClick: (editing: boolean) => void,
  setContent: (content: string) => void
): EditHandlers {
  return {
    handleCancel: createCancelHandler(handleEditClick),
    handleAccept: createAcceptHandler(newContent, setContent, handleEditClick)
  };
}

/**
 * Parameters for editing
 */
interface EditingParams {
  /** Current content value */
  newContent: string;
  /** Function to set content */
  setNewContent: (content: string) => void;
  /** Maximum height for textarea */
  maxHeight?: number;
}

/**
 * Creates handler parameters for textarea
 * @param {EditHandlers} handlers - Edit handlers
 * @returns {Pick<TextareaPropsParams, 'handleCancel' | 'handleAccept'>} Handler parameters
 */
function createHandlerParams(
  handlers: EditHandlers
): Pick<TextareaPropsParams, 'handleCancel' | 'handleAccept'> {
  return {
    handleCancel: handlers.handleCancel,
    handleAccept: handlers.handleAccept
  };
}

/**
 * Creates content parameters for textarea
 * @param {EditingParams} params - Editing parameters
 * @returns {Pick<TextareaPropsParams, 'newContent' | 'setNewContent' | 'maxHeight'>} Content parameters
 */
function createContentParams(
  params: EditingParams
): Pick<TextareaPropsParams, 'newContent' | 'setNewContent' | 'maxHeight'> {
  return {
    newContent: params.newContent,
    setNewContent: params.setNewContent,
    maxHeight: params.maxHeight
  };
}

/**
 * Creates main parameters for textarea
 * @param {EditingParams} params - Basic editing parameters
 * @param {EditHandlers} handlers - Edit handlers
 * @returns {TextareaPropsParams} Textarea props parameters
 */
function createMainParams(
  params: EditingParams,
  handlers: EditHandlers
): TextareaPropsParams {
  return {
    ...createContentParams(params),
    ...createHandlerParams(handlers)
  };
}

/**
 * Creates handlers from props and state
 * @param {EditorContentProps} props - Component props
 * @param {string} newContent - Current content
 * @returns {EditHandlers} Edit handlers
 */
function createEditHandlers(
  props: EditorContentProps,
  newContent: string
): EditHandlers {
  return createHandlers(
    newContent,
    props.handleEditClick,
    props.setContent
  );
}

/**
 * Creates editing parameters object
 * @param {EditorContentProps} props - Component props
 * @param {string} newContent - Current content
 * @param {Function} setNewContent - Content setter function
 * @returns {EditingParams} Editing parameters
 */
function createEditingParams(
  props: EditorContentProps,
  newContent: string,
  setNewContent: (content: string) => void
): EditingParams {
  return { newContent, setNewContent, maxHeight: props.maxHeight };
}

/**
 * Creates parameters for textarea
 * @param {EditorContentProps} props - Component props
 * @param {string} newContent - Current content
 * @param {Function} setNewContent - Content setter
 * @param {EditHandlers} handlers - Edit handlers
 * @returns {TextareaPropsParams} Textarea params
 */
function createTextareaParams(
  props: EditorContentProps,
  newContent: string,
  setNewContent: (content: string) => void,
  handlers: EditHandlers
): TextareaPropsParams {
  const editingParams = createEditingParams(props, newContent, setNewContent);
  return createMainParams(editingParams, handlers);
}

/**
 * Renders the editor content section when in editing mode
 * @param {EditorContentProps} props - Component props
 * @returns {JSX.Element} The editor content component in edit mode
 */
export function EditingContent(props: EditorContentProps): JSX.Element {
  const [newContent, setNewContent] = useContentState(props.content);
  const handlers = createEditHandlers(props, newContent);
  const params = createTextareaParams(props, newContent, setNewContent, handlers);
  return <ContentTextarea {...createTextareaProps(params)} />;
}
