/**
 * Placeholder Card Header Component
 *
 * Renders the header section of a placeholder card with editing capabilities
 *
 * @module components/placeholder/PlaceholderCardHeader
 */
import { HeaderContent } from './components/header/HeaderContent';
import type { PlaceholderCardHeaderProps } from './types';

/**
 * Renders the header section of a placeholder card
 * @param {PlaceholderCardHeaderProps} props - Component props
 * @returns {JSX.Element} Card header component
 */
export function PlaceholderCardHeader(props: PlaceholderCardHeaderProps): JSX.Element {
  return <HeaderContent {...props} />;
}
