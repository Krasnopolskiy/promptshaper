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
 * Renders a button for a single placeholder
 * @param {Object} props - Component props
 * @param {Placeholder} props.placeholder - The placeholder data
 * @param {(name: string) => void} props.onInsert - Insertion handler
 * @returns {JSX.Element} Rendered button
 */
function PlaceholderButton({placeholder, onInsert}: {placeholder: Placeholder; onInsert: (name: string) => void}): JSX.Element {
  const buttonStyle = { backgroundColor: placeholder.color };
  return <Button variant="ghost" size="sm" className="justify-start font-normal" onClick={() => onInsert(placeholder.name)}>
    <span className="mr-2 h-2 w-2 rounded-full" style={buttonStyle} />{placeholder.name}
  </Button>;
}

/**
 * Renders empty state when no placeholders exist
 * @returns {JSX.Element} Empty state message
 */
function EmptyPlaceholderList(): JSX.Element {
  return <div className="py-2 text-center text-sm text-muted-foreground">No placeholders available</div>;
}

/**
 * Renders a list of available placeholders
 * @param {Object} props - Component props
 * @param {Placeholder[]} props.placeholders - List of placeholders
 * @param {(name: string) => void} props.onInsert - Insertion handler
 * @returns {JSX.Element} Rendered list
 */
function PlaceholderList({placeholders, onInsert}: {placeholders: Placeholder[]; onInsert: (name: string) => void}): JSX.Element {
  if (placeholders.length === 0) return <EmptyPlaceholderList />;
  return <div className="grid gap-1">
    {placeholders.map(p => <PlaceholderButton key={p.id} placeholder={p} onInsert={onInsert} />)}
  </div>;
}

/**
 * Renders undo button
 * @param {Object} props - Component props
 * @param {() => void} props.handleUndo - Undo handler
 * @param {boolean} props.disabled - Whether disabled
 * @returns {JSX.Element} Rendered button
 */
function UndoButton({handleUndo, disabled}: {handleUndo: () => void; disabled: boolean}): JSX.Element {
  return <Button size="sm" variant="ghost" onClick={handleUndo} disabled={disabled} className="gap-1.5 text-sm">
    <Undo size={14}/>Undo
  </Button>;
}

/**
 * Renders redo button
 * @param {Object} props - Component props
 * @param {() => void} props.handleRedo - Redo handler
 * @param {boolean} props.disabled - Whether disabled
 * @returns {JSX.Element} Rendered button
 */
function RedoButton({handleRedo, disabled}: {handleRedo: () => void; disabled: boolean}): JSX.Element {
  return <Button size="sm" variant="ghost" onClick={handleRedo} disabled={disabled} className="gap-1.5 text-sm">
    <Redo size={14}/>Redo
  </Button>;
}

/**
 * Renders undo/redo button group
 * @param {Object} props - Component props
 * @param {() => void} props.handleUndo - Undo handler
 * @param {() => void} props.handleRedo - Redo handler
 * @param {boolean} props.undoDisabled - Whether undo disabled
 * @param {boolean} props.redoDisabled - Whether redo disabled
 * @returns {JSX.Element} Rendered button group
 */
function UndoRedoButtons({handleUndo, handleRedo, undoDisabled, redoDisabled}: {
  handleUndo: () => void; handleRedo: () => void; undoDisabled: boolean; redoDisabled: boolean;
}): JSX.Element {
  return <><UndoButton handleUndo={handleUndo} disabled={undoDisabled} /><RedoButton handleRedo={handleRedo} disabled={redoDisabled} /></>;
}

/**
 * Renders insert placeholder button with popover
 * @param {Object} props - Component props
 * @param {Placeholder[]} props.placeholders - Available placeholders
 * @param {(name: string) => void} props.handleInsertPlaceholder - Insert handler
 * @returns {JSX.Element} Rendered button with popover
 */
function InsertButton({placeholders, handleInsertPlaceholder}: {placeholders: Placeholder[]; handleInsertPlaceholder: (name: string) => void;}): JSX.Element {
  return <Popover>
    <PopoverTrigger asChild><Button size="sm" variant="outline" className="gap-1.5 text-sm hover:bg-background"><PlusCircle size={14}/>Insert</Button></PopoverTrigger>
    <PopoverContent className="w-56 p-2" align="end"><PlaceholderList placeholders={placeholders} onInsert={handleInsertPlaceholder} /></PopoverContent>
  </Popover>;
}

/**
 * Renders the editor toolbar with undo/redo and insert controls
 * @param {EditorToolbarProps} props - Component props
 * @returns {JSX.Element} Rendered toolbar
 */
export function EditorToolbar({placeholders, handleUndo, handleRedo, handleInsertPlaceholder, undoDisabled, redoDisabled}: EditorToolbarProps): JSX.Element {
  return <div className="flex items-center gap-2 border-b border-border/50 p-2">
    <UndoRedoButtons handleUndo={handleUndo} handleRedo={handleRedo} undoDisabled={undoDisabled} redoDisabled={redoDisabled} />
    <InsertButton placeholders={placeholders} handleInsertPlaceholder={handleInsertPlaceholder} />
  </div>;
}
