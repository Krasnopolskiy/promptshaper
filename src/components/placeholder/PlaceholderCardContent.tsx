/**
 * Placeholder Card Content Component
 *
 * Content section of a placeholder card
 *
 * @module components/placeholder/PlaceholderCardContent
 */
import { CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ContentEditor } from '@/components/placeholder/components/ContentEditor';
import { useRef } from 'react';

interface ContentSectionProps {
  label: string;
  children: React.ReactNode;
}

interface PlaceholderCardContentProps {
  content: string;
  name: string;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  newContent: string;
  setNewContent: (content: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleCancel: () => void;
}

/**
 * Content section component
 * @param {ContentSectionProps} props - Component props
 * @returns {JSX.Element} Content section
 */
function ContentSection({ label, children }: ContentSectionProps): JSX.Element {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

/**
 * Content editor wrapper component
 * @param {PlaceholderCardContentProps} props - Component props
 * @returns {JSX.Element} Content editor wrapper
 */
function ContentEditorWrapper(props: PlaceholderCardContentProps): JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <ContentEditor
      content={props.content}
      name={props.name}
      isEditing={props.isEditing}
      setIsEditing={props.setIsEditing}
      newContent={props.newContent}
      setNewContent={props.setNewContent}
      textareaRef={textareaRef}
      handleKeyDown={props.handleKeyDown}
      handleCancel={props.handleCancel}
    />
  );
}

/**
 * Placeholder card content component
 * @param {PlaceholderCardContentProps} props - Component props
 * @returns {JSX.Element} Placeholder card content
 */
export function PlaceholderCardContent(props: PlaceholderCardContentProps): JSX.Element {
  return (
    <CardContent className="space-y-4">
      <ContentSection label="Content">
        <ContentEditorWrapper {...props} />
      </ContentSection>
    </CardContent>
  );
}
