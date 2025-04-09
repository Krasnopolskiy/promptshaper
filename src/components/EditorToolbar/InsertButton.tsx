/**
 * InsertButton Component
 *
 * Insert button with placeholder selection popover
 *
 * @module components/EditorToolbar/InsertButton
 */
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Placeholder } from '@/types';
import { PlaceholderList } from './PlaceholderList';

/**
 * InsertButton component props
 * @interface InsertButtonProps
 */
interface InsertButtonProps {
  /** List of available placeholders */
  placeholders: Placeholder[];
  /** Insert placeholder handler */
  handleInsertPlaceholder: (name: string) => void;
}

/**
 * Renders the trigger button for the popover
 * @returns {JSX.Element} The trigger button component
 */
function TriggerButton(): JSX.Element {
  return <Button size="sm" variant="outline" className="gap-1.5 text-sm hover:bg-background">
    <PlusCircle size={14}/>Insert
  </Button>;
}

/**
 * Renders the popover content with placeholder list
 * @param {InsertButtonProps} props - Component props
 * @returns {JSX.Element} The popover content component
 */
function Content({ placeholders, handleInsertPlaceholder }: InsertButtonProps): JSX.Element {
  return <PlaceholderList placeholders={placeholders} handleInsertPlaceholder={handleInsertPlaceholder} />;
}

/**
 * Insert button component with placeholder selection popover
 * @param {InsertButtonProps} props - Component props
 * @returns {JSX.Element} The insert button component
 */
export function InsertButton(props: InsertButtonProps): JSX.Element {
  return <Popover>
    <PopoverTrigger asChild><TriggerButton /></PopoverTrigger>
    <PopoverContent className="w-56 p-2" align="end"><Content {...props} /></PopoverContent>
  </Popover>;
}
