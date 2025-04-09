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
 * Creates base editor props
 * @param {PlaceholderCardContentProps} props - Content props
 * @returns {Pick<React.ComponentProps<typeof ContentEditor>, 'content' | 'name' | 'isEditing' | 'setIsEditing'>} Base props
 */
function createBaseEditorProps(
  props: PlaceholderCardContentProps
): Pick<React.ComponentProps<typeof ContentEditor>, 'content' | 'name' | 'isEditing' | 'setIsEditing'> {
  return {
    content: props.content,
    name: props.name,
    isEditing: props.isEditing,
    setIsEditing: props.setIsEditing
  };
}

/**
 * Creates content editor props
 * @param {PlaceholderCardContentProps} props - Content props
 * @returns {Pick<React.ComponentProps<typeof ContentEditor>, 'newContent' | 'setNewContent' | 'handleKeyDown' | 'handleCancel'>} Content props
 */
function createContentEditProps(
  props: PlaceholderCardContentProps
): Pick<React.ComponentProps<typeof ContentEditor>, 'newContent' | 'setNewContent' | 'handleKeyDown' | 'handleCancel'> {
  return {
    newContent: props.newContent,
    setNewContent: props.setNewContent,
    handleKeyDown: props.handleKeyDown,
    handleCancel: props.handleCancel
  };
}

/**
 * Creates editor props object
 * @param {PlaceholderCardContentProps} props - Content props
 * @param {React.RefObject<HTMLTextAreaElement>} textareaRef - Textarea reference
 * @returns {React.ComponentProps<typeof ContentEditor>} Editor props
 */
function createEditorProps(
  props: PlaceholderCardContentProps,
  textareaRef: React.RefObject<HTMLTextAreaElement>
): React.ComponentProps<typeof ContentEditor> {
  const baseProps = createBaseEditorProps(props);
  const contentProps = createContentEditProps(props);
  return { ...baseProps, ...contentProps, textareaRef };
}

/**
 * Content editor wrapper component
 * @param {PlaceholderCardContentProps} props - Component props
 * @returns {JSX.Element} Content editor wrapper
 */
function ContentEditorWrapper(props: PlaceholderCardContentProps): JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorProps = createEditorProps(props, textareaRef);
  return <ContentEditor {...editorProps} />;
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
