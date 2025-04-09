/**
 * Editor Content Component
 *
 * Contains the editing and viewing components for content
 *
 * @module components/placeholder/components/EditorContent
 */
import React from 'react';
import { EditingContent } from './EditingContent';
import { ViewingContent } from './ViewingContent';

/**
 * Editor content props interface
 * @interface EditorContentProps
 */
export interface EditorContentProps {
  /** Whether editing mode is active */
  isEditing: boolean;
  /** Current content */
  content: string;
  /** Function to handle edit click */
  handleEditClick: (editing: boolean) => void;
  /** Function to set content */
  setContent: (content: string) => void;
  /** Placeholder name */
  name: string;
  /** Maximum height for the textarea */
  maxHeight?: number;
}

/**
 * Renders the editor content section with either editing or viewing mode
 * @param {EditorContentProps} props - Component props
 * @returns {JSX.Element} The editor content component
 */
export function EditorContent(props: EditorContentProps): JSX.Element {
  return props.isEditing ?
    <EditingContent {...props} /> :
    <ViewingContent {...props} />;
}
