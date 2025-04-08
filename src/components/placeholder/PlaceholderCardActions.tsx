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
 * Renders editing mode action buttons
 * @param {Object} props - Component props
 * @param {Function} props.onCancel - Cancel editing handler
 * @param {Function} props.onSave - Save changes handler
 * @returns {JSX.Element} Editing mode buttons
 */
function EditModeActions({ onCancel, onSave }: Pick<PlaceholderCardActionsProps, 'onCancel' | 'onSave'>): JSX.Element {
  return (
    <div className="flex items-center space-x-1">
      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onCancel}>
        <Trash className="h-4 w-4 text-destructive" />
      </Button>
      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onSave}>
        <Check className="h-4 w-4 text-primary" />
      </Button>
    </div>
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
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={toggleMode}>
            <Tag className={`h-4 w-4 ${mode === 'tag' ? 'text-primary' : 'text-muted-foreground'}`} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="center">
          <p className="text-xs">{modeDescription}</p>
          <p className="text-xs font-medium">Click to toggle mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
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
function ActionButtons({
  onCopy,
  onStartEdit,
  onDelete,
  toggleExpanded,
  isExpanded
}: Pick<PlaceholderCardActionsProps, 'onCopy' | 'onStartEdit' | 'onDelete' | 'toggleExpanded' | 'isExpanded'>): JSX.Element {
  return (
    <>
      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onCopy}>
        <Copy className="h-4 w-4" />
      </Button>

      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onStartEdit}>
        <Pencil className="h-4 w-4" />
      </Button>

      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onDelete}>
        <Trash className="h-4 w-4" />
      </Button>

      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={toggleExpanded}>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
    </>
  );
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
