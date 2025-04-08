import {PlusCircle} from 'lucide-react';

/**
 * Renders the empty state when no placeholders exist
 * @returns {JSX.Element} The empty state component
 */
export function EmptyState(): JSX.Element {
  return (
    <div className="px-4 py-8 text-center">
      <EmptyStateIcon />
      <p className="text-sm text-muted-foreground">
        No placeholders yet. Create your first one in the "Add New" tab.
      </p>
    </div>
  );
}

/**
 * Renders the icon for the empty state
 * @returns {JSX.Element} The empty state icon
 */
function EmptyStateIcon(): JSX.Element {
  return (
    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
      <PlusCircle className="h-6 w-6 text-primary"/>
    </div>
  );
}
