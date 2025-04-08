/**
 * Content Editor Component
 *
 * Editor for placeholder content
 *
 * @module components/placeholder/components/ContentEditor
 */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Pencil } from 'lucide-react';

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
}

/**
 * Renders the edit button for the content editor
 * @description Renders a small pencil icon button that toggles editing mode
 * @param {Function} setIsEditing - Function to set editing mode
 * @returns {JSX.Element} The edit button
 */
function EditButton({ setIsEditing }: { setIsEditing: (editing: boolean) => void }): JSX.Element {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-6 w-6"
      onClick={() => setIsEditing(true)}
    >
      <Pencil className="h-3 w-3 text-muted-foreground"/>
    </Button>
  );
}

/**
 * Renders the content display area when not in edit mode
 * @description Shows the content text or an empty state
 * @param {Object} props - Component props
 * @param {string} props.content - The content to display
 * @param {Function} props.setIsEditing - Function to toggle editing mode
 * @returns {JSX.Element} The content display element
 */
function ContentDisplay({
  content,
  setIsEditing
}: {
  content: string;
  setIsEditing: (editing: boolean) => void
}): JSX.Element {
  const displayContent = content
    ? <span className="whitespace-pre-line">{content}</span>
    : <span className="italic text-muted-foreground">Empty (click to edit)</span>;

  return (
    <div
      className="min-h-[40px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm cursor-pointer transition-colors hover:bg-muted/20"
      onClick={() => setIsEditing(true)}
    >
      {displayContent}
    </div>
  );
}

/**
 * Renders the textarea for editing content
 * @description Provides an input area for editing the content
 * @param {Object} props - Component props
 * @param {string} props.newContent - The current content being edited
 * @param {Function} props.setNewContent - Function to update content
 * @param {React.RefObject<HTMLTextAreaElement>} props.textareaRef - Reference to the textarea
 * @param {Function} props.handleKeyDown - Function to handle keyboard events
 * @param {string} props.name - The name of the placeholder
 * @returns {JSX.Element} The textarea element
 */
function ContentTextarea({
  newContent,
  setNewContent,
  textareaRef,
  handleKeyDown,
  name
}: {
  newContent: string;
  setNewContent: (content: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  name: string;
}): JSX.Element {
  return (
    <Textarea
      ref={textareaRef}
      value={newContent}
      onChange={e => setNewContent(e.target.value)}
      onKeyDown={handleKeyDown}
      className="min-h-[100px] text-sm"
      placeholder={`Enter content for ${name}...`}
    />
  );
}

/**
 * Editor content when in editing mode
 * @param {Pick<ContentEditorProps, 'newContent' | 'setNewContent' | 'textareaRef' | 'handleKeyDown' | 'name'>} props - Component props
 * @returns {JSX.Element} Editor content
 */
function EditorContent({
  newContent,
  setNewContent,
  textareaRef,
  handleKeyDown,
  name,
}: Pick<ContentEditorProps, 'newContent' | 'setNewContent' | 'textareaRef' | 'handleKeyDown' | 'name'>): JSX.Element {
  return (
    <ContentTextarea
      newContent={newContent}
      setNewContent={setNewContent}
      textareaRef={textareaRef}
      handleKeyDown={handleKeyDown}
      name={name}
    />
  );
}

/**
 * Renders the editor header section
 * @param {Pick<ContentEditorProps, 'isEditing' | 'setIsEditing'>} props - Component props
 * @returns {JSX.Element} Editor header
 */
function EditorHeaderSection({ isEditing, setIsEditing }: Pick<ContentEditorProps, 'isEditing' | 'setIsEditing'>): JSX.Element {
  return (
    <div className="flex items-center justify-between">
      <label className="text-xs text-muted-foreground">Content:</label>
      {!isEditing && <EditButton setIsEditing={setIsEditing} />}
    </div>
  );
}

/**
 * Renders the editor content section
 * @param {Pick<ContentEditorProps, 'isEditing' | 'newContent' | 'setNewContent' | 'textareaRef' | 'handleKeyDown' | 'name' | 'content' | 'setIsEditing'>} props - Component props
 * @returns {JSX.Element} Editor content
 */
function EditorContentSection(props: Pick<ContentEditorProps, 'isEditing' | 'newContent' | 'setNewContent' | 'textareaRef' | 'handleKeyDown' | 'name' | 'content' | 'setIsEditing'>): JSX.Element {
  const { isEditing, newContent, setNewContent, textareaRef, handleKeyDown, name, content, setIsEditing } = props;
  return isEditing ? (
    <EditorContent
      newContent={newContent}
      setNewContent={setNewContent}
      textareaRef={textareaRef}
      handleKeyDown={handleKeyDown}
      name={name}
    />
  ) : (
    <ContentDisplay content={content} setIsEditing={setIsEditing} />
  );
}

/**
 * Renders the complete editor interface
 * @param {ContentEditorProps} props - Component props
 * @returns {JSX.Element} Complete editor interface
 */
function EditorInterface(props: ContentEditorProps): JSX.Element {
  const { isEditing, setIsEditing, content, newContent, setNewContent, textareaRef, name, handleKeyDown } = props;
  return (
    <div className="space-y-1">
      <EditorHeaderSection isEditing={isEditing} setIsEditing={setIsEditing} />
      <EditorContentSection
        isEditing={isEditing}
        newContent={newContent}
        setNewContent={setNewContent}
        textareaRef={textareaRef}
        handleKeyDown={handleKeyDown}
        name={name}
        content={content}
        setIsEditing={setIsEditing}
      />
    </div>
  );
}

/**
 * Content editor component
 * @param {ContentEditorProps} props - Component props
 * @returns {JSX.Element} Content editor
 */
export function ContentEditor(props: ContentEditorProps): JSX.Element {
  return <EditorInterface {...props} />;
}
