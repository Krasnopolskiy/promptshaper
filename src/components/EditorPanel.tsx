import {PromptEditor} from './PromptEditor';
import {Placeholder} from '@/types';
import {FileEdit} from 'lucide-react';

/**
 * Props for the EditorPanel component
 * @interface EditorPanelProps
 */
interface EditorPanelProps {
  /**
   * The current prompt text
   */
  promptText: string;
  /**
   * Function to update the prompt text
   */
  setPromptText: (text: string) => void;
  /**
   * Array of available placeholders
   */
  placeholders: Placeholder[];
  /**
   * Function to insert a placeholder at a specific position
   */
  onInsertPlaceholder: (name: string, position: number) => number;
}

/**
 * Props for the EditorContent component
 * @interface EditorContentProps
 */
type EditorContentProps = EditorPanelProps;

/**
 * Creates the header title element for the editor
 * @returns {JSX.Element} Header title element
 */
const EditorHeaderTitle = (): JSX.Element => (
  <div className="flex items-center gap-2 text-primary mb-2">
    <FileEdit className="h-4 w-4"/>
    <h2 className="text-lg font-medium">Editor</h2>
  </div>
);

/**
 * Renders the editor description
 * @returns {JSX.Element} Editor description element
 */
const EditorDescription = (): JSX.Element => (
  <p className="text-sm text-muted-foreground">
    Create and edit your prompt template
  </p>
);

/**
 * Renders the editor header section
 * @returns {JSX.Element} Header section JSX element
 */
const EditorHeader = (): JSX.Element => (
  <div className="border-b border-border/50 bg-background p-4">
    <EditorHeaderTitle />
    <EditorDescription />
  </div>
);

/**
 * Renders the prompt editor component with proper props
 * @param {EditorContentProps} props - Component props
 * @returns {JSX.Element} Prompt editor component
 */
const EditorPromptComponent = (props: EditorContentProps): JSX.Element => (
  <PromptEditor
    value={props.promptText}
    onChange={props.setPromptText}
    placeholders={props.placeholders}
    onInsertPlaceholder={props.onInsertPlaceholder}
  />
);

/**
 * Renders the editor content area
 * @param {EditorContentProps} props - Component props
 * @returns {JSX.Element} Editor content JSX element
 */
const EditorContent = (props: EditorContentProps): JSX.Element => (
  <div className="flex-1 overflow-hidden">
    <EditorPromptComponent {...props} />
  </div>
);

/**
 * Props for the EditorContainer component
 * @interface EditorContainerProps
 */
interface EditorContainerProps {
  /**
   * The header element
   */
  header: JSX.Element;
  /**
   * The content element
   */
  content: JSX.Element;
}

/**
 * Renders the editor container structure
 * @param {EditorContainerProps} props - Component props
 * @returns {JSX.Element} Editor container element
 */
const EditorContainer = (props: EditorContainerProps): JSX.Element => (
  <div className="flex h-full w-full flex-col bg-background">
    {props.header}
    {props.content}
  </div>
);

/**
 * Editor panel component for editing prompt templates
 * @param {EditorPanelProps} props - Component props
 * @returns {JSX.Element} Editor panel component
 */
export function EditorPanel(props: EditorPanelProps): JSX.Element {
  const header = <EditorHeader />;
  const content = <EditorContent {...props} />;

  return <EditorContainer header={header} content={content} />;
}
