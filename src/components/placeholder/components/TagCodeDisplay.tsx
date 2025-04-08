/**
 * Tag Code Display Component
 *
 * Displays a placeholder tag in code format
 *
 * @module components/placeholder/components/TagCodeDisplay
 */
import React from 'react';

/**
 * TagCodeDisplay component props
 * @interface TagCodeDisplayProps
 */
interface TagCodeDisplayProps {
  /** Placeholder name */
  name: string;
}

/**
 * Renders the placeholder tag code
 * @param {TagCodeDisplayProps} props - Component props
 * @returns {JSX.Element} Tag code element
 */
export function TagCodeDisplay({ name }: TagCodeDisplayProps): JSX.Element {
  return (
    <div className="flex justify-between items-start">
      <div className="rounded-md border p-2 text-sm max-w-[80%]">
        <code className="font-mono text-xs text-muted-foreground">{`<${name}>`}</code>
      </div>
    </div>
  );
}
