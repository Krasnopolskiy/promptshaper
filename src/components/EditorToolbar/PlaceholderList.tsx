/**
 * PlaceholderList Component
 *
 * List of placeholders in the insert button popover
 *
 * @module components/EditorToolbar/PlaceholderList
 */
import { Placeholder } from '@/types';
import { PlaceholderButton } from './PlaceholderButton';

/**
 * PlaceholderList component props
 * @interface PlaceholderListProps
 */
interface PlaceholderListProps {
  /** List of available placeholders */
  placeholders: Placeholder[];
  /** Insert placeholder handler */
  handleInsertPlaceholder: (name: string) => void;
}

/**
 * PlaceholderList component
 * @param {PlaceholderListProps} props - Component props
 * @returns {JSX.Element} The rendered list
 */
export function PlaceholderList({ placeholders, handleInsertPlaceholder }: PlaceholderListProps): JSX.Element {
  if (placeholders.length === 0) {
    return (
      <div className="py-2 text-center text-sm text-muted-foreground">
        No placeholders available
      </div>
    );
  }

  return (
    <div className="grid gap-1">
      {placeholders.map(placeholder => (
        <PlaceholderButton
          key={placeholder.id}
          placeholder={placeholder}
          handleInsertPlaceholder={handleInsertPlaceholder}
        />
      ))}
    </div>
  );
}
