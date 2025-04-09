/**
 * Content Editor Component
 *
 * Editor for placeholder content
 *
 * @module components/placeholder/components/ContentEditor
 */
import React from 'react';
import {
  ContentDisplay,
  EditorContent,
  EditButton
} from './EditingComponents';

// Import the type from the correct location
import { EditorContentProps } from './EditingTypes';

/**
 * ContentEditor component props
 * @interface ContentEditorProps
 */
interface ContentEditorProps {
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
 * Renders the editor header section
 * @param {Object} props - Component props
 * @param {boolean} props.isEditing - Whether in editing mode
 * @param {Function} props.setIsEditing - Function to set editing state
 * @returns {JSX.Element} Editor header
 */
const EditorHeaderSection = ({
  isEditing,
  setIsEditing
}: Pick<ContentEditorProps, 'isEditing' | 'setIsEditing'>): JSX.Element => (
  <div className="flex items-center justify-between">
    <label className="text-xs text-muted-foreground">Content:</label>
    {!isEditing && <EditButton onEditClick={() => setIsEditing(true)} />}
  </div>
);

/**
 * Creates basic editor props
 * @param {Object} props - Component props
 * @param {boolean} props.isEditing - Whether editing mode is active
 * @param {string} props.content - Current content text
 * @returns {Pick<EditorContentProps, 'isEditing' | 'content'>} Basic props
 */
const createBasicEditorProps = (props: {
  isEditing: boolean;
  content: string;
}): Pick<EditorContentProps, 'isEditing' | 'content'> => ({
  isEditing: props.isEditing,
  content: props.content
});

/**
 * Creates handler props for editor
 * @param {Object} props - Component props
 * @param {Function} props.setIsEditing - Function to set editing state
 * @param {Function} props.setNewContent - Function to update content
 * @returns {Pick<EditorContentProps, 'handleEditClick' | 'setContent'>} Handler props
 */
const createHandlerProps = (props: {
  setIsEditing: (editing: boolean) => void;
  setNewContent: (content: string) => void;
}): Pick<EditorContentProps, 'handleEditClick' | 'setContent'> => ({
  handleEditClick: props.setIsEditing,
  setContent: props.setNewContent
});

/**
 * Creates metadata props for editor
 * @param {Object} props - Component props
 * @param {string} props.name - Placeholder name
 * @param {number} [props.maxHeight] - Maximum height for textarea
 * @returns {Pick<EditorContentProps, 'name' | 'maxHeight'>} Metadata props
 */
const createMetadataProps = (props: {
  name: string;
  maxHeight?: number;
}): Pick<EditorContentProps, 'name' | 'maxHeight'> => ({
  name: props.name,
  maxHeight: props.maxHeight
});

// Props types for better readability
type BasicProps = Pick<EditorContentProps, 'isEditing' | 'content'>;
type HandlerProps = Pick<EditorContentProps, 'handleEditClick' | 'setContent'>;
type MetadataProps = Pick<EditorContentProps, 'name' | 'maxHeight'>;
type DisplayProps = { content: string; setIsEditing: (editing: boolean) => void };

/**
 * Combines props objects into EditorContentProps
 * @param {BasicProps} basic - Basic props
 * @param {HandlerProps} handler - Handler props
 * @param {MetadataProps} metadata - Metadata props
 * @returns {EditorContentProps} Complete props
 */
const combineProps = (
  basic: BasicProps,
  handler: HandlerProps,
  metadata: MetadataProps
): EditorContentProps => ({
  ...basic,
  ...handler,
  ...metadata
});

/**
 * Creates editor props for component
 * @param {ContentEditorProps} props - Full component props
 * @returns {EditorContentProps} Editor props
 */
const createEditorProps = (props: ContentEditorProps): EditorContentProps => {
  const basic = createBasicEditorProps(props);
  const handler = createHandlerProps(props);
  const metadata = createMetadataProps(props);
  return combineProps(basic, handler, metadata);
};

/**
 * Renders component when in editing mode
 * @param {EditorContentProps} props - Editor props
 * @returns {JSX.Element} Editor component
 */
const renderEditor = (props: EditorContentProps): JSX.Element => (
  <EditorContent {...props} />
);

/**
 * Renders component when not in editing mode
 * @param {DisplayProps} props - Display props
 * @returns {JSX.Element} Display component
 */
const renderDisplay = (props: DisplayProps): JSX.Element => (
  <ContentDisplay {...props} />
);

/**
 * Renders editor or display based on mode
 * @param {boolean} isEditing - Whether in editing mode
 * @param {EditorContentProps} editorProps - Editor props
 * @param {DisplayProps} displayProps - Display props
 * @returns {JSX.Element} The appropriate component
 */
const renderContent = (
  isEditing: boolean,
  editorProps: EditorContentProps,
  displayProps: DisplayProps
): JSX.Element => (
  isEditing ? renderEditor(editorProps) : renderDisplay(displayProps)
);

/**
 * Creates the container div for the editor
 * @param {React.ReactNode} children - Child elements
 * @returns {JSX.Element} Container div
 */
const createContainer = (children: React.ReactNode): JSX.Element => (
  <div className="space-y-1">{children}</div>
);

/**
 * Renders the header section
 * @param {boolean} isEditing - Editing state
 * @param {Function} setIsEditing - Set editing function
 * @returns {JSX.Element} Header component
 */
const renderHeader = (
  isEditing: boolean,
  setIsEditing: (editing: boolean) => void
): JSX.Element => (
  <EditorHeaderSection isEditing={isEditing} setIsEditing={setIsEditing} />
);

/**
 * Creates editor content
 * @param {Object} params - Content parameters
 * @param {boolean} params.isEditing - Whether in editing mode
 * @param {EditorContentProps} params.editorProps - Props for editor component
 * @param {DisplayProps} params.displayProps - Props for display component
 * @returns {JSX.Element} Editor content
 */
const createEditorContent = (params: {
  isEditing: boolean;
  editorProps: EditorContentProps;
  displayProps: DisplayProps;
}): JSX.Element => (
  <>
    {renderHeader(params.isEditing, params.displayProps.setIsEditing)}
    {renderContent(params.isEditing, params.editorProps, params.displayProps)}
  </>
);

/**
 * Content editor component
 * @param {ContentEditorProps} props - Component props
 * @returns {JSX.Element} Content editor
 */
export function ContentEditor(props: ContentEditorProps): JSX.Element {
  const { isEditing, content, setIsEditing, setNewContent, name, maxHeight } = props;
  const displayProps = { content, setIsEditing };
  const editorProps = createEditorProps({
    isEditing, content, setIsEditing, setNewContent, name, maxHeight
  } as ContentEditorProps);

  return createContainer(
    createEditorContent({ isEditing, editorProps, displayProps })
  );
}
