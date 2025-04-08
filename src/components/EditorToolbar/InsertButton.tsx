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
 * InsertButtonTrigger component
 * @returns {JSX.Element} The rendered button trigger
 */
function InsertButtonTrigger(): JSX.Element {
  return (
    <Button size="sm" variant="outline" className="gap-1.5 text-sm hover:bg-background">
      <PlusCircle size={14}/>
      Insert
    </Button>
  );
}

/**
 * InsertButton component
 * @param {InsertButtonProps} props - Component props
 * @returns {JSX.Element} The rendered button
 */
export function InsertButton({ placeholders, handleInsertPlaceholder }: InsertButtonProps): JSX.Element {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <InsertButtonTrigger />
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <PlaceholderList
          placeholders={placeholders}
          handleInsertPlaceholder={handleInsertPlaceholder}
        />
      </PopoverContent>
    </Popover>
  );
}
