/**
 * Icon Button Component
 *
 * Renders a button with an icon
 *
 * @module components/placeholder/buttons/IconButton
 */
import React from 'react';
import { Button } from '@/components/ui/button';

/**
 * Props for IconButton component
 * @interface IconButtonProps
 */
interface IconButtonProps {
  /** Icon to display in the button */
  icon: React.ReactNode;
  /** Function to call when button is clicked */
  onClick: () => void;
  /** Optional button size variant */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /** Optional button style variant */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /** Optional additional class names */
  className?: string;
}

/** Default props values for the IconButton */
const defaultSize = 'icon';
const defaultVariant = 'ghost';
const defaultClassName = 'h-7 w-7';

/**
 * Renders a button with an icon
 * @param {IconButtonProps} props - Component props
 * @returns {JSX.Element} Icon button component
 */
export function IconButton(props: IconButtonProps): JSX.Element {
  const size = props.size || defaultSize;
  const variant = props.variant || defaultVariant;
  const className = props.className || defaultClassName;
  return <Button size={size} variant={variant} className={className} onClick={props.onClick}>{props.icon}</Button>;
}
