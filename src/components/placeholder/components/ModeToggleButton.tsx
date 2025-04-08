/**
 * Mode Toggle Button Component
 *
 * Renders a button to toggle between placeholder modes
 *
 * @module components/placeholder/components/ModeToggleButton
 */
import React from 'react';
import { RefreshCw, Tag } from 'lucide-react';
import { IconButton } from '../buttons/IconButton';
import { TooltipWithTrigger } from '../buttons/TooltipWithTrigger';

/**
 * Props for ModeToggleButton component
 * @interface ModeToggleButtonProps
 */
interface ModeToggleButtonProps {
  /** Current mode (replace or tag) */
  mode: string;
  /** Function to toggle mode */
  toggleMode: () => void;
  /** Function to get mode description */
  getModeDescription: () => string;
}

/**
 * Get icon for the current mode
 * @param {string} mode - Current mode
 * @returns {JSX.Element} Mode icon
 */
function getModeIcon(mode: string): JSX.Element {
  return mode === 'replace'
    ? <RefreshCw className="h-4 w-4 text-muted-foreground"/>
    : <Tag className="h-4 w-4 text-primary"/>;
}

/**
 * Create tooltip content for mode
 * @param {string} description - Mode description
 * @returns {JSX.Element} Tooltip content
 */
function createTooltipContent(description: string): JSX.Element {
  return (
    <>
      <p className="text-xs">{description}</p>
      <p className="text-xs text-muted-foreground">Click to toggle mode</p>
    </>
  );
}

/**
 * Renders a button to toggle between placeholder modes
 * @param {ModeToggleButtonProps} props - Component props
 * @returns {JSX.Element} Mode toggle button
 */
export function ModeToggleButton({ mode, toggleMode, getModeDescription }: ModeToggleButtonProps): JSX.Element {
  const icon = getModeIcon(mode);
  const content = createTooltipContent(getModeDescription());
  const trigger = <IconButton icon={icon} onClick={toggleMode} />;

  return <TooltipWithTrigger trigger={trigger} content={content} />;
}
