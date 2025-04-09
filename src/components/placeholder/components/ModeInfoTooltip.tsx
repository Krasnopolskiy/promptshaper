/**
 * Mode Info Tooltip Component
 *
 * Displays information about placeholder modes
 *
 * @module components/placeholder/components/ModeInfoTooltip
 */
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

/**
 * ModeInfoTooltip component props
 * @interface ModeInfoTooltipProps
 */
interface ModeInfoTooltipProps {
  /** Current placeholder mode */
  mode: string;
}

/**
 * Returns the tooltip title based on mode
 * @description Gets the title text for the tooltip based on the current mode
 * @param {string} mode - Current placeholder mode
 * @returns {string} The tooltip title
 */
function getTooltipTitle(mode: string): string {
  return mode === 'tag' ? 'Tag Mode' : 'Replace Mode';
}

/**
 * Returns the tooltip description based on mode
 * @description Gets the description text for the tooltip based on the current mode
 * @param {string} mode - Current placeholder mode
 * @returns {string} The tooltip description
 */
function getTooltipDescription(mode: string): string {
  return mode === 'tag'
    ? "Content will be displayed between opening and closing tags: <tag>content</tag>"
    : "Placeholder will be directly replaced with its content";
}

/**
 * Renders the info button that triggers the tooltip
 * @description Creates a small circular button with an info icon
 * @returns {JSX.Element} The rendered button
 */
function InfoButtonTrigger(): JSX.Element {
  return (
    <TooltipTrigger asChild>
      <Button size="sm" variant="ghost" className="h-7 w-7">
        <Info className="h-3.5 w-3.5 text-muted-foreground" />
      </Button>
    </TooltipTrigger>
  );
}

/**
 * Renders the content of the tooltip
 * @description Creates the content shown when hovering over the info button
 * @param {string} mode - Current placeholder mode
 * @returns {JSX.Element} The tooltip content
 */
function TooltipContents({ mode }: { mode: string }): JSX.Element {
  return (
    <TooltipContent side="left" className="max-w-xs">
      <p className="text-xs font-medium mb-1">{getTooltipTitle(mode)}</p>
      <p className="text-xs text-muted-foreground">
        {getTooltipDescription(mode)}
      </p>
    </TooltipContent>
  );
}

/**
 * Creates the inner content of the tooltip
 * @param {string} mode - Current placeholder mode
 * @returns {JSX.Element} Tooltip inner content
 */
function createTooltipInner(mode: string): JSX.Element {
  return (
    <div className="flex items-center">
      <InfoButtonTrigger />
      <TooltipContents mode={mode} />
    </div>
  );
}

/**
 * Creates tooltip components
 * @param {string} mode - Current placeholder mode
 * @returns {JSX.Element} Tooltip component structure
 */
function createTooltipComponents(mode: string): JSX.Element {
  const inner = createTooltipInner(mode);
  return (
    <TooltipProvider>
      <Tooltip>
        {inner}
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * Renders the mode info tooltip
 * @description Displays information about placeholder modes when hovering over the info button
 * @param {ModeInfoTooltipProps} props - Component props
 * @returns {JSX.Element} Info tooltip
 */
export function ModeInfoTooltip({ mode }: ModeInfoTooltipProps): JSX.Element {
  return createTooltipComponents(mode);
}
