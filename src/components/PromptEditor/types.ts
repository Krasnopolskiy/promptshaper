/**
 * Type definitions for PromptEditor component
 * @module components/PromptEditor/types
 */
import { Placeholder } from '@/types';

/**
 * PromptEditor component props
 * @interface PromptEditorProps
 */
export interface PromptEditorProps {
  /** Current prompt text value */
  value: string;
  /** Callback for when the prompt text changes */
  onChange: (value: string) => void;
  /** List of available placeholders */
  placeholders: Placeholder[];
  /** Callback for when a placeholder is inserted */
  onInsertPlaceholder?: (name: string, position: number) => number;
}

/**
 * Wrapper props type for editor wrapper component
 */
export interface WrapperProps {
  placeholders: Placeholder[];
  onUndo: () => void;
  onRedo: () => void;
  undoDisabled: boolean;
  redoDisabled: boolean;
  onInsertPlaceholder: (name: string) => void;
}

/**
 * Editor content props type
 */
export interface EditorContentProps {
  /** Current text value */
  value: string;
  /** Change handler function */
  onChange: (value: string) => void;
  /** Reference to editor element */
  editorRef: React.RefObject<HTMLTextAreaElement>;
  /** Undo action handler */
  handleUndo: () => void;
  /** Redo action handler */
  handleRedo: () => void;
  /** Current theme */
  theme: string;
}

/**
 * Type definition for editor content creation parameters
 */
export type EditorContentCreationParams = {
  value: string;
  onChange: (value: string) => void;
  editorRef: React.RefObject<HTMLTextAreaElement>;
  handlers: { undo: () => void; redo: () => void };
  theme: string;
};
