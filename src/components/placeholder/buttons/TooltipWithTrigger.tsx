/**
 * Tooltip With Trigger Component
 *
 * Renders a tooltip with trigger element
 *
 * @module components/placeholder/buttons/TooltipWithTrigger
 */
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * Props for TooltipWithTrigger component
 * @interface TooltipWithTriggerProps
 */
interface TooltipWithTriggerProps {
  /** Tooltip trigger element */
  trigger: React.ReactNode;
  /** Tooltip content element */
  content: React.ReactNode;
  /** Optional side placement */
  side?: 'top' | 'right' | 'bottom' | 'left';
}

/** Supported tooltip sides type */
type TooltipSide = 'top' | 'right' | 'bottom' | 'left' | undefined;

/** Props for TooltipWithContent component */
interface TooltipWithContentProps {
  /** Content to display in tooltip */
  content: React.ReactNode;
  /** Side to display tooltip */
  side?: TooltipSide;
  /** Trigger element */
  children: React.ReactNode;
}

/**
 * Renders the tooltip with content
 * @param {TooltipWithContentProps} props - Component props
 * @returns {JSX.Element} Tooltip with content
 */
function TooltipWithContent(props: TooltipWithContentProps): JSX.Element {
  const { content, side, children } = props;
  return <Tooltip>{children}<TooltipContent side={side}>{content}</TooltipContent></Tooltip>;
}

/**
 * Renders a tooltip with trigger and content
 * @param {TooltipWithTriggerProps} props - Component props
 * @returns {JSX.Element} Tooltip component
 */
export function TooltipWithTrigger({ trigger, content, side = 'top' }: TooltipWithTriggerProps): JSX.Element {
  const triggerElement = <TooltipTrigger asChild>{trigger}</TooltipTrigger>;
  return <TooltipProvider><TooltipWithContent content={content} side={side}>{triggerElement}</TooltipWithContent></TooltipProvider>;
}
