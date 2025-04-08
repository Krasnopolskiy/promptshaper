/**
 * EditorToolbar Component
 *
 * A toolbar for the prompt editor with undo/redo and placeholder insertion controls.
 *
 * @module components/EditorToolbar
 */
import React from 'react';
import {Button} from '@/components/ui/button';
import {PlusCircle, Redo, Undo} from 'lucide-react';
import {Placeholder} from '@/types';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

/**
 * EditorToolbar component props
 * @interface EditorToolbarProps
 */
interface EditorToolbarProps {
  /** List of available placeholders */
  placeholders: Placeholder[];
  /** Undo handler */
  handleUndo: () => void;
  /** Redo handler */
  handleRedo: () => void;
  /** Insert placeholder handler */
  handleInsertPlaceholder: (name: string) => void;
  /** Whether undo is disabled */
  undoDisabled: boolean;
  /** Whether redo is disabled */
  redoDisabled: boolean;
}

/**
 * PlaceholderButton component for individual placeholder items
 * @param {Object} props - Component props
 * @param {Placeholder} props.placeholder - The placeholder data
 * @param {(name: string) => void} props.onInsert - Placeholder insertion handler
 * @returns {JSX.Element} The rendered placeholder button
 */
function PlaceholderButton({placeholder, onInsert}: {placeholder: Placeholder; onInsert: (name: string) => void}): JSX.Element {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="justify-start font-normal"
      onClick={() => onInsert(placeholder.name)}
    >
      <span
        className="mr-2 h-2 w-2 rounded-full"
        style={{backgroundColor: placeholder.color}}
      />
      {placeholder.name}
    </Button>
  );
}

/**
 * EmptyPlaceholderList component for when no placeholders are available
 * @returns {JSX.Element} The rendered empty state
 */
function EmptyPlaceholderList(): JSX.Element {
  return (
    <div className="py-2 text-center text-sm text-muted-foreground">
      No placeholders available
    </div>
  );
}

/**
 * PlaceholderList component for displaying available placeholders
 * @param {Object} props - Component props
 * @param {Placeholder[]} props.placeholders - List of placeholders
 * @param {(name: string) => void} props.onInsert - Placeholder insertion handler
 * @returns {JSX.Element} The rendered placeholder list
 */
function PlaceholderList({placeholders, onInsert}: {placeholders: Placeholder[]; onInsert: (name: string) => void}): JSX.Element {
  if (placeholders.length === 0) {
    return <EmptyPlaceholderList />;
  }

  return (
    <div className="grid gap-1">
      {placeholders.map(placeholder => (
        <PlaceholderButton
          key={placeholder.id}
          placeholder={placeholder}
          onInsert={onInsert}
        />
      ))}
    </div>
  );
}

/**
 * UndoButton component for undo control
 * @param {Object} props - Component props
 * @param {() => void} props.handleUndo - Undo handler
 * @param {boolean} props.disabled - Whether undo is disabled
 * @returns {JSX.Element} The rendered undo button
 */
function UndoButton({handleUndo, disabled}: {handleUndo: () => void; disabled: boolean}): JSX.Element {
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleUndo}
      disabled={disabled}
      className="gap-1.5 text-sm"
    >
      <Undo size={14}/>
      Undo
    </Button>
  );
}

/**
 * RedoButton component for redo control
 * @param {Object} props - Component props
 * @param {() => void} props.handleRedo - Redo handler
 * @param {boolean} props.disabled - Whether redo is disabled
 * @returns {JSX.Element} The rendered redo button
 */
function RedoButton({handleRedo, disabled}: {handleRedo: () => void; disabled: boolean}): JSX.Element {
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleRedo}
      disabled={disabled}
      className="gap-1.5 text-sm"
    >
      <Redo size={14}/>
      Redo
    </Button>
  );
}

/**
 * UndoRedoButtons component for undo/redo controls
 * @param {Object} props - Component props
 * @param {() => void} props.handleUndo - Undo handler
 * @param {() => void} props.handleRedo - Redo handler
 * @param {boolean} props.undoDisabled - Whether undo is disabled
 * @param {boolean} props.redoDisabled - Whether redo is disabled
 * @returns {JSX.Element} The rendered undo/redo buttons
 */
function UndoRedoButtons({handleUndo, handleRedo, undoDisabled, redoDisabled}: {
  handleUndo: () => void;
  handleRedo: () => void;
  undoDisabled: boolean;
  redoDisabled: boolean;
}): JSX.Element {
  return (
    <>
      <UndoButton handleUndo={handleUndo} disabled={undoDisabled} />
      <RedoButton handleRedo={handleRedo} disabled={redoDisabled} />
    </>
  );
}

/**
 * InsertButton component for placeholder insertion
 * @param {Object} props - Component props
 * @param {Placeholder[]} props.placeholders - List of placeholders
 * @param {(name: string) => void} props.handleInsertPlaceholder - Placeholder insertion handler
 * @returns {JSX.Element} The rendered insert button with popover
 */
function InsertButton({placeholders, handleInsertPlaceholder}: {
  placeholders: Placeholder[];
  handleInsertPlaceholder: (name: string) => void;
}): JSX.Element {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5 text-sm hover:bg-background">
          <PlusCircle size={14}/>
          Insert
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <PlaceholderList placeholders={placeholders} onInsert={handleInsertPlaceholder} />
      </PopoverContent>
    </Popover>
  );
}

/**
 * EditorToolbar component for the prompt editor
 * @param {EditorToolbarProps} props - Component props
 * @returns {JSX.Element} The rendered toolbar
 */
export function EditorToolbar({
  placeholders,
  handleUndo,
  handleRedo,
  handleInsertPlaceholder,
  undoDisabled,
  redoDisabled,
}: EditorToolbarProps): JSX.Element {
  return (
    <div className="flex items-center gap-2 border-b border-border/50 p-2">
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
