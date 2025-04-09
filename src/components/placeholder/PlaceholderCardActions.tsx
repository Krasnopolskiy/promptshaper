/**
 * Placeholder Card Actions Component
 *
 * Button actions for placeholder cards
 *
 * @module components/placeholder/PlaceholderCardActions
 */
import React from 'react';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Check, ChevronDown, ChevronUp, Copy, Pencil, Trash, Tag } from 'lucide-react';

/**
 * PlaceholderCardActions component props
 * @interface PlaceholderCardActionsProps
 */
interface PlaceholderCardActionsProps {
  /** Whether the component is in edit mode */
  isEditing: boolean;
  /** Whether the card is expanded */
  isExpanded: boolean;
  /** Current placeholder mode */
  mode: string;
  /** Mode description text */
  modeDescription: string;
  /** Function to toggle expanded state */
  toggleExpanded: () => void;
  /** Function to enable editing mode */
  onStartEdit: () => void;
  /** Function to save changes */
  onSave: () => void;
  /** Function to cancel editing */
  onCancel: () => void;
  /** Function to copy placeholder tag */
  onCopy: () => void;
  /** Function to delete placeholder */
  onDelete: () => void;
  /** Function to toggle placeholder mode */
  toggleMode: () => void;
}

/**
 * Creates a cancel button
 * @param {Function} onCancel - Cancel handler
 * @returns {JSX.Element} Cancel button
 */
function CancelButton({ onCancel }: { onCancel: () => void }): JSX.Element {
  return (
    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onCancel}>
      <Trash className="h-4 w-4 text-destructive" />
    </Button>
  );
}

/**
 * Creates a save button
 * @param {Function} onSave - Save handler
 * @returns {JSX.Element} Save button
 */
function SaveButton({ onSave }: { onSave: () => void }): JSX.Element {
  return (
    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onSave}>
      <Check className="h-4 w-4 text-primary" />
    </Button>
  );
}

/**
 * Renders editing mode action buttons
 * @param {Object} props - Component props
 * @param {Function} props.onCancel - Cancel editing handler
 * @param {Function} props.onSave - Save changes handler
 * @returns {JSX.Element} Editing mode buttons
 */
function EditModeActions({ onCancel, onSave }: Pick<PlaceholderCardActionsProps, 'onCancel' | 'onSave'>): JSX.Element {
  return (
    <div className="flex items-center space-x-1">
      <CancelButton onCancel={onCancel} />
      <SaveButton onSave={onSave} />
    </div>
  );
}

/**
 * Creates a tag icon with appropriate styling
 * @param {string} mode - Current mode
 * @returns {JSX.Element} Styled tag icon
 */
function ModeTagIcon({ mode }: { mode: string }): JSX.Element {
  return <Tag className={`h-4 w-4 ${mode === 'tag' ? 'text-primary' : 'text-muted-foreground'}`} />;
}

/**
 * Creates a tooltip content for mode toggle
 * @param {string} modeDescription - Mode description
 * @returns {JSX.Element} Tooltip content
 */
function ModeTooltipContent({ modeDescription }: { modeDescription: string }): JSX.Element {
  return (
    <TooltipContent side="bottom" align="center">
      <p className="text-xs">{modeDescription}</p>
      <p className="text-xs font-medium">Click to toggle mode</p>
    </TooltipContent>
  );
}

/**
 * Creates a mode toggle button
 * @param {string} mode - Current mode
 * @param {Function} toggleMode - Toggle mode function
 * @returns {JSX.Element} Mode toggle button
 */
function ToggleButton({ mode, toggleMode }: { mode: string; toggleMode: () => void }): JSX.Element {
  return (
    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={toggleMode}>
      <ModeTagIcon mode={mode} />
    </Button>
  );
}

/**
 * Creates tooltip for mode toggle
 * @param {React.ReactNode} trigger - Tooltip trigger element
 * @param {string} modeDescription - Mode description text
 * @returns {JSX.Element} Tooltip component
 */
function createModeTooltip(trigger: React.ReactNode, modeDescription: string): JSX.Element {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <ModeTooltipContent modeDescription={modeDescription} />
    </Tooltip>
  );
}

/**
 * Renders the mode toggle button with tooltip
 * @param {Object} props - Component props
 * @param {string} props.mode - Current placeholder mode
 * @param {string} props.modeDescription - Mode description text
 * @param {Function} props.toggleMode - Toggle mode handler
 * @returns {JSX.Element} Mode toggle button
 */
function ModeToggleButton({ mode, modeDescription, toggleMode }: Pick<PlaceholderCardActionsProps, 'mode' | 'modeDescription' | 'toggleMode'>): JSX.Element {
  const trigger = <ToggleButton mode={mode} toggleMode={toggleMode} />;
  const tooltip = createModeTooltip(trigger, modeDescription);
  return <TooltipProvider>{tooltip}</TooltipProvider>;
}

/**
 * Creates a copy button
 * @param {Function} onCopy - Copy handler function
 * @returns {JSX.Element} Copy button
 */
function CopyButton({ onCopy }: { onCopy: () => void }): JSX.Element {
  return (
    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onCopy}>
      <Copy className="h-4 w-4" />
    </Button>
  );
}

/**
 * Creates an edit button
 * @param {Function} onStartEdit - Edit handler function
 * @returns {JSX.Element} Edit button
 */
function EditButton({ onStartEdit }: { onStartEdit: () => void }): JSX.Element {
  return (
    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onStartEdit}>
      <Pencil className="h-4 w-4" />
    </Button>
  );
}

/**
 * Creates a delete button
 * @param {Function} onDelete - Delete handler function
 * @returns {JSX.Element} Delete button
 */
function DeleteButton({ onDelete }: { onDelete: () => void }): JSX.Element {
  return (
    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onDelete}>
      <Trash className="h-4 w-4" />
    </Button>
  );
}

/**
 * Creates an expand/collapse button
 * @param {boolean} isExpanded - Whether the card is expanded
 * @param {Function} toggleExpanded - Toggle expanded function
 * @returns {JSX.Element} Expand/collapse button
 */
function ExpandButton({ isExpanded, toggleExpanded }: { isExpanded: boolean; toggleExpanded: () => void }): JSX.Element {
  return (
    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={toggleExpanded}>
      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </Button>
  );
}

/**
 * Creates an array of action buttons
 * @param {Object} props - Button properties
 * @returns {JSX.Element[]} Array of button elements
 */
function createActionButtonArray(props: Pick<PlaceholderCardActionsProps, 'onCopy' | 'onStartEdit' | 'onDelete' | 'toggleExpanded' | 'isExpanded'>): JSX.Element[] {
  const { onCopy, onStartEdit, onDelete, toggleExpanded, isExpanded } = props;
  return [
    <CopyButton key="copy" onCopy={onCopy} />,
    <EditButton key="edit" onStartEdit={onStartEdit} />,
    <DeleteButton key="delete" onDelete={onDelete} />,
    <ExpandButton key="expand" isExpanded={isExpanded} toggleExpanded={toggleExpanded} />
  ];
}

/**
 * Renders the action buttons for view mode
 * @param {Object} props - Component props
 * @param {Function} props.onCopy - Copy handler
 * @param {Function} props.onStartEdit - Start edit handler
 * @param {Function} props.onDelete - Delete handler
 * @param {Function} props.toggleExpanded - Toggle expanded handler
 * @param {boolean} props.isExpanded - Whether the card is expanded
 * @returns {JSX.Element} Action buttons
 */
function ActionButtons(props: Pick<PlaceholderCardActionsProps, 'onCopy' | 'onStartEdit' | 'onDelete' | 'toggleExpanded' | 'isExpanded'>): JSX.Element {
  const buttons = createActionButtonArray(props);
  return <>{buttons}</>;
}

/**
 * Renders view mode action buttons
 * @param {Object} props - Component props
 * @param {string} props.mode - Current placeholder mode
 * @param {string} props.modeDescription - Mode description text
 * @param {boolean} props.isExpanded - Whether the card is expanded
 * @param {Function} props.toggleMode - Toggle mode handler
 * @param {Function} props.onCopy - Copy handler
 * @param {Function} props.onStartEdit - Start edit handler
 * @param {Function} props.onDelete - Delete handler
 * @param {Function} props.toggleExpanded - Toggle expanded handler
 * @returns {JSX.Element} View mode buttons
 */
function ViewModeActions(props: Omit<PlaceholderCardActionsProps, 'isEditing' | 'onSave' | 'onCancel'>): JSX.Element {
  return (
    <div className="flex items-center space-x-1">
      <ModeToggleButton {...props} />
      <ActionButtons {...props} />
    </div>
  );
}

/**
 * Render action buttons for the placeholder card
 * @param {PlaceholderCardActionsProps} props - Component props
 * @returns {JSX.Element} Card action buttons
 */
export function PlaceholderCardActions(props: PlaceholderCardActionsProps): JSX.Element {
  const { isEditing } = props;
  return isEditing ? <EditModeActions {...props} /> : <ViewModeActions {...props} />;
}
