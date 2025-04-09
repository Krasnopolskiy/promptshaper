/**
 * Editor Header Section Component
 *
 * Header section for content editor with label and edit button
 *
 * @module components/placeholder/components/EditorHeaderSection
 */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Editor header section props
 * @interface EditorHeaderSectionProps
 */
interface EditorHeaderSectionProps {
  /** Whether editing mode is active */
  isEditing: boolean;
  /** Function to set editing mode */
  setIsEditing: (editing: boolean) => void;
}

/**
 * Renders a small pencil icon button
 * @param {Object} props - Button properties
 * @param {Function} props.onClick - Click handler
 * @param {string} [props.className] - Optional additional class names
 * @returns {JSX.Element} The button
 */
function PencilIconButton(props: { onClick: () => void; className?: string }): JSX.Element {
  return (
    <Button variant="ghost" size="icon" className={cn("h-6 w-6", props.className)} onClick={props.onClick}>
      <Pencil className="h-4 w-4" />
    </Button>
  );
}

/**
 * Renders the header content label
 * @returns {JSX.Element} Content label
 */
function ContentLabel(): JSX.Element {
  return <label className="text-xs text-muted-foreground">Content:</label>;
}

/**
 * Creates editor header section content
 * @param {EditorHeaderSectionProps} props - Component props
 * @returns {JSX.Element[]} Header content elements
 */
function createHeaderContent(props: EditorHeaderSectionProps): JSX.Element[] {
  const editButton = !props.isEditing
    ? <PencilIconButton key="edit" onClick={() => props.setIsEditing(true)} />
    : null;

  return [<ContentLabel key="label" />, editButton].filter(Boolean) as JSX.Element[];
}

/**
 * Renders the editor header section
 * @param {EditorHeaderSectionProps} props - Component props
 * @returns {JSX.Element} Editor header
 */
export function EditorHeaderSection(props: EditorHeaderSectionProps): JSX.Element {
  return <div className="flex items-center justify-between">{createHeaderContent(props)}</div>;
}
