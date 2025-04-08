/**
 * UndoRedoButtons Component
 *
 * Undo and redo buttons for the editor toolbar
 *
 * @module components/EditorToolbar/UndoRedoButtons
 */
import { Button } from '@/components/ui/button';
import { Redo, Undo } from 'lucide-react';

/**
 * UndoRedoButtons component props
 * @interface UndoRedoButtonsProps
 */
interface UndoRedoButtonsProps {
  /** Undo handler */
  handleUndo: () => void;
  /** Redo handler */
  handleRedo: () => void;
  /** Whether undo is disabled */
  undoDisabled: boolean;
  /** Whether redo is disabled */
  redoDisabled: boolean;
}

/**
 * UndoRedoButtons component
 * @param {UndoRedoButtonsProps} props - Component props
 * @returns {JSX.Element} The rendered buttons
 */
export function UndoRedoButtons({ handleUndo, handleRedo, undoDisabled, redoDisabled }: UndoRedoButtonsProps): JSX.Element {
  const buttonProps = { size: "sm", variant: "ghost", className: "gap-1.5 text-sm" } as const;
  return (
    <>
      <Button {...buttonProps} onClick={handleUndo} disabled={undoDisabled}>
        <Undo size={14}/> Undo
      </Button>
      <Button {...buttonProps} onClick={handleRedo} disabled={redoDisabled}>
        <Redo size={14}/> Redo
      </Button>
    </>
  );
}
