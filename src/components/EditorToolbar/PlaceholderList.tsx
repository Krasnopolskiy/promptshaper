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
 * Renders empty state when no placeholders are available
 * @returns {JSX.Element} Empty state message
 */
function EmptyState(): JSX.Element {
  return <div className="py-2 text-center text-sm text-muted-foreground">No placeholders available</div>;
}

/**
 * Renders the list of placeholder buttons
 * @param {PlaceholderListProps} props - Component props
 * @returns {JSX.Element} The placeholder list component
 */
export function PlaceholderList({ placeholders, handleInsertPlaceholder }: PlaceholderListProps): JSX.Element {
  if (placeholders.length === 0) return <EmptyState />;
  return <div className="grid gap-1">
    {placeholders.map(p => <PlaceholderButton key={p.id} placeholder={p} handleInsertPlaceholder={handleInsertPlaceholder} />)}
  </div>;
}
