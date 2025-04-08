/**
 * EditorToolbar Component
 *
 * Toolbar for the editor with undo/redo and insert functionality
 *
 * @module components/EditorToolbar
 */
import { UndoRedoButtons } from './UndoRedoButtons';
import { InsertButton } from './InsertButton';
import { Placeholder } from '@/types';

/**
 * EditorToolbar component props
 * @interface EditorToolbarProps
 */
interface EditorToolbarProps {
  /** Undo handler */
  handleUndo: () => void;
  /** Redo handler */
  handleRedo: () => void;
  /** Whether undo is disabled */
  undoDisabled: boolean;
  /** Whether redo is disabled */
  redoDisabled: boolean;
  /** List of available placeholders */
  placeholders: Placeholder[];
  /** Insert placeholder handler */
  handleInsertPlaceholder: (name: string) => void;
}

/**
 * ToolbarContent component
 * @param {EditorToolbarProps} props - Component props
 * @returns {JSX.Element} The rendered toolbar content
 */
function ToolbarContent({
  handleUndo,
  handleRedo,
  undoDisabled,
  redoDisabled,
  placeholders,
  handleInsertPlaceholder
}: EditorToolbarProps): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <UndoRedoButtons
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        undoDisabled={undoDisabled}
        redoDisabled={redoDisabled}
      />
      <InsertButton
        placeholders={placeholders}
        handleInsertPlaceholder={handleInsertPlaceholder}
      />
    </div>
  );
}

/**
 * EditorToolbar component
 * @param {EditorToolbarProps} props - Component props
 * @returns {JSX.Element} The rendered toolbar
 */
export function EditorToolbar(props: EditorToolbarProps): JSX.Element {
  return <ToolbarContent {...props} />;
}
