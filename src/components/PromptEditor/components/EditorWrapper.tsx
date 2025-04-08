import { ReactNode } from 'react';
import { EditorToolbar } from '../../EditorToolbar';
import { Placeholder } from '@/types';

interface EditorWrapperProps {
  /** Child elements */
  children: ReactNode;
  /** List of available placeholders */
  placeholders: Placeholder[];
  /** Handler for undo operation */
  onUndo: () => void;
  /** Handler for redo operation */
  onRedo: () => void;
  /** Handler for inserting placeholders */
  onInsertPlaceholder: (name: string) => void;
  /** Whether undo is disabled */
  undoDisabled: boolean;
  /** Whether redo is disabled */
  redoDisabled: boolean;
}

/**
 * Wrapper component for the editor with toolbar
 * @param {EditorWrapperProps} props - Component props
 * @returns {JSX.Element} The rendered editor wrapper
 */
export function EditorWrapper({
  children,
  placeholders,
  onUndo,
  onRedo,
  onInsertPlaceholder,
  undoDisabled,
  redoDisabled
}: EditorWrapperProps): JSX.Element {
  return (
    <div className="flex h-full flex-col">
      <EditorToolbar
        placeholders={placeholders}
        handleUndo={onUndo}
        handleRedo={onRedo}
        handleInsertPlaceholder={onInsertPlaceholder}
        undoDisabled={undoDisabled}
        redoDisabled={redoDisabled}
      />
      {children}
    </div>
  );
}
