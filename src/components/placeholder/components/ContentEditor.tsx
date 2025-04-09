/**
 * Content Editor Component
 *
 * Editor for placeholder content
 *
 * @module components/placeholder/components/ContentEditor
 */
import React from 'react';
import { ContentEditorDisplay } from './ContentEditorDisplay';
import { EditorContent } from './EditorContent';
import { EditorHeaderSection } from './EditorHeaderSection';

/**
 * ContentEditor component props
 * @interface ContentEditorProps
 */
export interface ContentEditorProps {
  /** Whether editing mode is active */
  isEditing: boolean;
  /** Function to set editing mode */
  setIsEditing: (editing: boolean) => void;
  /** Current content */
  content: string;
  /** New content value */
  newContent: string;
  /** Function to update content */
  setNewContent: (content: string) => void;
  /** Reference to textarea element */
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  /** Function to cancel editing */
  handleCancel: () => void;
  /** Placeholder name */
  name: string;
  /** Function to handle keyboard events */
  handleKeyDown: (e: React.KeyboardEvent) => void;
  /** Maximum height for the textarea */
  maxHeight?: number;
}

/**
 * Type for editor content props
 */
type EditorContentProps = {
  /** Whether editing mode is active */
  isEditing: boolean;
  /** Current content */
  content: string;
  /** Function to set editing state */
  setIsEditing: (editing: boolean) => void;
  /** Function to update content */
  setNewContent: (content: string) => void;
  /** Placeholder name */
  name: string;
  /** Maximum height for the textarea */
  maxHeight?: number;
};

/**
 * Type for editor content return props
 */
type EditorContentReturnProps = {
  isEditing: boolean;
  content: string;
  handleEditClick: (editing: boolean) => void;
  setContent: (content: string) => void;
  name: string;
  maxHeight?: number;
};

/**
 * Creates props for EditorContent component
 * @param {EditorContentProps} props - Source props with content editing parameters
 * @returns {EditorContentReturnProps} Formatted props for EditorContent component
 */
function createEditorProps(props: EditorContentProps): EditorContentReturnProps {
  return {
    isEditing: props.isEditing,
    content: props.content,
    /**
     * Handles click events for editing mode toggle
     * @param {boolean} editing - Whether to enable editing mode
     * @returns {void}
     */
    handleEditClick: (editing: boolean) => props.setIsEditing(editing),
    setContent: props.setNewContent,
    name: props.name,
    maxHeight: props.maxHeight,
  };
}

/**
 * Editor component for edit mode
 * @param {EditorContentProps} props - Component props
 * @returns {JSX.Element} Editor component
 */
function EditorMode(props: EditorContentProps): JSX.Element {
  return <EditorContent {...createEditorProps(props)} />;
}

/**
 * Display component for view mode
 * @param {Object} props - Component props
 * @param {string} props.content - Current content
 * @param {Function} props.setIsEditing - Function to set editing state
 * @returns {JSX.Element} Display component
 */
function DisplayMode(props: {
  content: string;
  setIsEditing: (editing: boolean) => void;
}): JSX.Element {
  return <ContentEditorDisplay {...props} />;
}

/**
 * Renders editor content based on editing state
 * @param {EditorContentProps} props - Component props
 * @returns {JSX.Element} Editor content component
 */
function RenderContent(props: EditorContentProps): JSX.Element {
  return props.isEditing
    ? <EditorMode {...props} />
    : <DisplayMode content={props.content} setIsEditing={props.setIsEditing} />;
}

/**
 * Creates render content props
 * @param {ContentEditorProps} props - Component props
 * @returns {EditorContentProps} Props for RenderContent
 */
function createRenderContentProps(props: ContentEditorProps): EditorContentProps {
  const { isEditing, setIsEditing, content, setNewContent, name, maxHeight } = props;
  return { isEditing, setIsEditing, content, setNewContent, name, maxHeight };
}

/**
 * Content editor component
 * @param {ContentEditorProps} props - Component props
 * @returns {JSX.Element} Content editor
 */
export function ContentEditor(props: ContentEditorProps): JSX.Element {
  const { isEditing, setIsEditing } = props;
  return (
    <div className="space-y-1">
      <EditorHeaderSection isEditing={isEditing} setIsEditing={setIsEditing} />
      <RenderContent {...createRenderContentProps(props)} />
    </div>
  );
}

