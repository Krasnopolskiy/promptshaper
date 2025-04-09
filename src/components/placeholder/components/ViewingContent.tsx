/**
 * Viewing Content Component
 *
 * Displays content in view mode
 *
 * @module components/placeholder/components/ViewingContent
 */
import React from 'react';
import { EditorContentProps } from './EditorContent';

/**
 * Renders content placeholder if no content exists
 * @param {string} name - Placeholder name
 * @returns {JSX.Element} Placeholder element
 */
function ContentPlaceholder({ name }: { name: string }): JSX.Element {
  return (
    <span className="text-muted-foreground italic">
      No content for {name}
    </span>
  );
}

/**
 * Creates the container for viewing content
 * @param {Object} props - Container properties
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Container children
 * @returns {JSX.Element} Container element
 */
function ViewContainer(props: { onClick: () => void; children: React.ReactNode }): JSX.Element {
  return <div onClick={props.onClick} className="cursor-pointer">{props.children}</div>;
}

/**
 * Determines what content to display
 * @param {string} content - Current content
 * @param {string} name - Placeholder name
 * @returns {JSX.Element} Content or placeholder
 */
function DisplayContent({
  content,
  name
}: {
  content: string;
  name: string;
}): JSX.Element {
  return content ? <>{content}</> : <ContentPlaceholder name={name} />;
}

/**
 * Creates an onClick handler for view container
 * @description Prepares a function to toggle editing mode
 * @param {Function} handleEditClick - Edit mode toggle handler
 * @returns {Function} Click handler function
 */
function createClickHandler(handleEditClick: (isEditing: boolean) => void): () => void {
  return () => handleEditClick(true);
}

/**
 * Creates display child element
 * @description Creates the content display element
 * @param {string} content - Content to display
 * @param {string} name - Placeholder name
 * @returns {JSX.Element} Display content element
 */
function createDisplayChild(content: string, name: string): JSX.Element {
  return <DisplayContent content={content} name={name} />;
}

/**
 * Renders the editor content section when in viewing mode
 * @param {EditorContentProps} props - Component props
 * @returns {JSX.Element} The editor content component in view mode
 */
export function ViewingContent(props: EditorContentProps): JSX.Element {
  const onClick = createClickHandler(props.handleEditClick);
  const children = createDisplayChild(props.content, props.name);
  return <ViewContainer onClick={onClick} children={children} />;
}
