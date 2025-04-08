/**
 * ToggleExpandButton Component
 *
 * Renders a button that toggles the expanded state of a card
 *
 * @module components/placeholder/components/ToggleExpandButton
 */
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Props for ToggleExpandButton component
 * @interface ToggleExpandButtonProps
 */
interface ToggleExpandButtonProps {
  /** Whether the card is expanded */
  isExpanded: boolean;
  /** Function to toggle expanded state */
  onToggleExpand: () => void;
}

/**
 * Icon map for expanded states
 */
const icons = {
  expanded: <ChevronUp className="h-4 w-4" />,
  collapsed: <ChevronDown className="h-4 w-4" />
};

/**
 * Creates button props for the toggle button
 * @param {ToggleExpandButtonProps} props - Component props
 * @returns {Record<string, unknown>} Button props
 */
function createButtonProps(props: ToggleExpandButtonProps): Record<string, unknown> {
  return {
    variant: 'ghost',
    size: 'sm',
    className: 'h-8 w-8 p-0',
    onClick: props.onToggleExpand,
    'aria-label': props.isExpanded ? 'Collapse' : 'Expand'
  };
}

/**
 * Renders a button to toggle the expanded state
 * @param {ToggleExpandButtonProps} props - Component props
 * @returns {JSX.Element} Toggle expand button
 */
export function ToggleExpandButton(props: ToggleExpandButtonProps): JSX.Element {
  const buttonIcon = props.isExpanded ? icons.expanded : icons.collapsed;
  const buttonProps = createButtonProps(props);

  return <Button {...buttonProps}>{buttonIcon}</Button>;
}
