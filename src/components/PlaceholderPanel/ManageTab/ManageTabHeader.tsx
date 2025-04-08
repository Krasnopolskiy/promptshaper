/**
 * Props for the manage tab header
 */
interface ManageTabHeaderProps {
  count: number;
}

/**
 * Renders the header for the manage tab content
 * @param {ManageTabHeaderProps} props - Component properties
 * @returns {JSX.Element} The manage tab header
 */
export function ManageTabHeader({ count }: ManageTabHeaderProps): JSX.Element {
  return (
    <div className="border-b border-border/50 p-4">
      <HeaderContent count={count} />
    </div>
  );
}

/**
 * Renders the content of the manage tab header
 * @param {ManageTabHeaderProps} props - Component properties
 * @returns {JSX.Element} The header content
 */
function HeaderContent({ count }: ManageTabHeaderProps): JSX.Element {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium">All Placeholders</h3>
      <span className="rounded-full bg-accent/30 px-2 py-0.5 text-xs text-muted-foreground">
        {count} total
      </span>
    </div>
  );
}
