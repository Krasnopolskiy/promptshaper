/**
 * Content Editor Display Component
 *
 * Displays content in view mode
 *
 * @module components/placeholder/components/ContentEditorDisplay
 */
import React from 'react';

/**
 * Content display props interface
 * @interface ContentEditorDisplayProps
 */
interface ContentEditorDisplayProps {
  /** Current content */
  content: string;
  /** Function to set editing mode */
  setIsEditing: (editing: boolean) => void;
}

/**
 * Renders the content text based on provided content
 * @param {string} content - Content to display
 * @returns {JSX.Element} Content text element
 */
function ContentText({ content }: { content: string }): JSX.Element {
  return content
    ? <span className="whitespace-pre-line">{content}</span>
    : <span className="italic text-muted-foreground">Empty (click to edit)</span>;
}

/**
 * Creates the container for content display
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Child elements
 * @returns {JSX.Element} Container element
 */
function DisplayContainer({
  onClick,
  children
}: {
  onClick: () => void;
  children: React.ReactNode;
}): JSX.Element {
  const containerClassName = "min-h-[40px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm cursor-pointer transition-colors hover:bg-muted/20";
  return <div className={containerClassName} onClick={onClick}>{children}</div>;
}

/**
 * Renders the content display area when not in edit mode
 * @param {ContentEditorDisplayProps} props - Component props
 * @returns {JSX.Element} The content display element
 */
export function ContentEditorDisplay({
  content,
  setIsEditing
}: ContentEditorDisplayProps): JSX.Element {
  return (
    <DisplayContainer onClick={() => setIsEditing(true)}>
      <ContentText content={content} />
    </DisplayContainer>
  );
}
