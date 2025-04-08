import {Sparkles} from 'lucide-react';

/**
 * Renders the panel header with title and description
 * @returns {JSX.Element} The header component
 */
export function PanelHeader(): JSX.Element {
  return (
    <div className="border-b border-border/50 bg-background p-4">
      <HeaderTitle />
      <p className="text-sm text-muted-foreground">Create and manage your prompt placeholders</p>
    </div>
  );
}

/**
 * Renders the header title with icon
 * @returns {JSX.Element} The header title component
 */
function HeaderTitle(): JSX.Element {
  return (
    <div className="flex items-center gap-2 text-primary mb-2">
      <Sparkles className="h-4 w-4" />
      <h2 className="text-lg font-medium">Placeholders</h2>
    </div>
  );
}
