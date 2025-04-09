/**
 * Editing Components
 *
 * Components for content editing functionality in the ContentEditor
 *
 * @module components/placeholder/components/ContentEditor/EditingComponents
 */
import React from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createTextareaContent } from './TextareaComponents';
import {
  _TextareaContentParams,
  EditorContentProps,
  useEditing,
  createEditorProps
} from './EditingTypes';

/**
 * Button props type for pencil button
 * @interface PencilButtonProps
 */
interface PencilButtonProps {
  /** Click event handler */
  onClick: () => void;
  /** Optional class name */
  className?: string;
}

/**
 * Creates button attributes for the pencil icon button
 * @param {Function} onClick - Click handler function
 * @returns {React.ButtonHTMLAttributes<HTMLButtonElement>} The button attributes object
 */
const createButtonAttributes = (
  onClick: () => void
): React.ButtonHTMLAttributes<HTMLButtonElement> => ({
  onClick
});

/**
 * Button style props type
 * @interface ButtonStyleProps
 */
interface ButtonStyleProps {
  /** Button variant */
  variant: "ghost";
  /** Button size */
  size: "icon";
  /** Button class name */
  className: string;
}

/**
 * Creates button style props
 * @param {string} className - Optional CSS class name
 * @returns {ButtonStyleProps} The style props object
 */
const createButtonStyleProps = (
  className?: string
): ButtonStyleProps => ({
  variant: "ghost",
  size: "icon",
  className: cn("h-6 w-6", className)
});

/**
 * Creates styled button props for the pencil icon button
 * @param {Function} onClick - Click handler function
 * @param {string} className - Optional CSS class name
 * @returns {ButtonStyleProps & React.ButtonHTMLAttributes<HTMLButtonElement>} The styled button props
 */
const createPencilButtonProps = (
  onClick: () => void,
  className?: string
): ButtonStyleProps & React.ButtonHTMLAttributes<HTMLButtonElement> => ({
  ...createButtonAttributes(onClick),
  ...createButtonStyleProps(className)
});

/**
 * Renders a small pencil icon button
 * @param {PencilButtonProps} props - Button props
 * @returns {JSX.Element} The button component
 */
export const PencilIconButton = ({
  onClick,
  className
}: PencilButtonProps): JSX.Element => (
  <Button {...createPencilButtonProps(onClick, className)}>
    <Pencil className="h-4 w-4" />
  </Button>
);

/**
 * Edit button props type
 * @interface EditButtonProps
 */
interface EditButtonProps {
  /** Click handler for edits */
  onEditClick: () => void;
  /** Optional class name */
  className?: string;
}

/**
 * Renders the edit button for the content editor
 * @param {EditButtonProps} props - Component props
 * @returns {JSX.Element} The edit button component
 */
export const EditButton = ({
  onEditClick,
  className
}: EditButtonProps): JSX.Element => (
  <PencilIconButton onClick={onEditClick} className={className} />
);

/**
 * Renders the content placeholder text
 * @param {string} content - The content to check
 * @returns {JSX.Element} The content or placeholder text element
 */
const renderContent = (content: string): JSX.Element => (
  content
    ? <span className="whitespace-pre-line">{content}</span>
    : <span className="italic text-muted-foreground">Empty (click to edit)</span>
);

/**
 * Content display props type
 * @interface ContentDisplayProps
 */
interface ContentDisplayProps {
  /** Content to display */
  content: string;
  /** Function to set editing state */
  setIsEditing: (editing: boolean) => void;
}

/**
 * Creates click handler for the display div
 * @param {Function} setIsEditing - Function to set editing state
 * @returns {() => void} Click handler function
 */
const createClickHandler = (
  setIsEditing: (editing: boolean) => void
): () => void => {
  return () => setIsEditing(true);
};

/**
 * Creates class name for the display div
 * @returns {string} Class name string
 */
const createDisplayClassName = (): string => {
  return "min-h-[40px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm cursor-pointer transition-colors hover:bg-muted/20";
};

/**
 * Creates props for content display div
 * @param {Function} setIsEditing - Function to set editing state
 * @returns {React.HTMLAttributes<HTMLDivElement> & { className: string }} Props for the display div
 */
const createDisplayDivProps = (
  setIsEditing: (editing: boolean) => void
): React.HTMLAttributes<HTMLDivElement> & { className: string } => ({
  className: createDisplayClassName(),
  onClick: createClickHandler(setIsEditing)
});

/**
 * Renders the content display area when not in edit mode
 * @param {ContentDisplayProps} props - Component props
 * @returns {JSX.Element} The content display element
 */
export const ContentDisplay = ({
  content,
  setIsEditing
}: ContentDisplayProps): JSX.Element => (
  <div {...createDisplayDivProps(setIsEditing)}>
    {renderContent(content)}
  </div>
);

/**
 * Renders placeholder text for empty content
 * @param {string} name - Name of the content section
 * @returns {JSX.Element} Placeholder text element
 */
const renderEmptyContent = (name: string): JSX.Element => (
  <span className="text-muted-foreground italic">No content for {name}</span>
);

/**
 * Renders the editor content section with either editing or viewing mode
 * @param {EditorContentProps} props - Component props
 * @returns {JSX.Element} The editor content component
 */
export const EditorContent = (props: EditorContentProps): JSX.Element => (
  props.isEditing
    ? <EditingContent {...props} />
    : <ViewingContent {...props} />
);

/**
 * Renders the editor content section when in viewing mode
 * @param {EditorContentProps} props - Component props
 * @returns {JSX.Element} The editor content component in view mode
 */
export const ViewingContent = ({
  content,
  handleEditClick,
  name
}: EditorContentProps): JSX.Element => (
  <div onClick={() => handleEditClick(true)} className="cursor-pointer">
    {content || renderEmptyContent(name)}
  </div>
);

/**
 * Renders the editor content section when in editing mode
 * @param {EditorContentProps} props - Component props
 * @returns {JSX.Element} The editor content component in edit mode
 */
export const EditingContent = (props: EditorContentProps): JSX.Element => {
  const hooks = useEditing(props);
  const textareaProps = createEditorProps(hooks, props.maxHeight);
  return createTextareaContent(textareaProps);
};
