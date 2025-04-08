/**
 * Mode Indicator Component
 *
 * Displays the current mode (tag or replace) as a label
 *
 * @module components/placeholder/components/ModeIndicator
 */
import React from 'react';

/**
 * Props for ModeIndicator component
 * @interface ModeIndicatorProps
 */
interface ModeIndicatorProps {
  /** Current mode of the placeholder */
  mode: string;
}

/**
 * Renders a label indicating the current mode
 * @param {ModeIndicatorProps} props - Component props
 * @returns {JSX.Element} Mode indicator label
 */
export function ModeIndicator({ mode }: ModeIndicatorProps): JSX.Element {
  const className = `ml-2 text-xs rounded px-1.5 py-0.5 ${
    mode === 'tag' ? 'bg-primary/10 text-primary' : 'bg-muted/50 text-muted-foreground'
  }`;

  return <span className={className}>{mode === 'tag' ? 'Tag' : 'Replace'}</span>;
}
