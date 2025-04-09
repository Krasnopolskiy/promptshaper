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
 * Renders the toolbar content with undo/redo and insert functionality
 * @param {EditorToolbarProps} props - Component props
 * @returns {JSX.Element} The toolbar content component
 */
function ToolbarContent(props: EditorToolbarProps): JSX.Element {
  return <div className="flex items-center gap-2">
    <UndoRedoButtons {...props} />
    <InsertButton placeholders={props.placeholders} handleInsertPlaceholder={props.handleInsertPlaceholder} />
  </div>;
}

/**
 * Editor toolbar component
 * @param {EditorToolbarProps} props - Component props
 * @returns {JSX.Element} The editor toolbar component
 */
export function EditorToolbar(props: EditorToolbarProps): JSX.Element {
  return <div className="border-b p-2"><ToolbarContent {...props} /></div>;
}
