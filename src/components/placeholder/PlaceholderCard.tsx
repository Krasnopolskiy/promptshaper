/**
 * Module for the placeholder card component
 * @module components/placeholder/PlaceholderCard
 */
import { renderPlaceholderCard } from './utils/renderUtils';
import { useCardProps, PlaceholderCardProps } from './hooks/useCardProps';

/**
 * Main placeholder card component
 * @param {PlaceholderCardProps} props - Component props
 * @returns {JSX.Element} Rendered placeholder card component
 */
function PlaceholderCard(props: PlaceholderCardProps): JSX.Element {
  const renderParams = useCardProps(props);
  return renderPlaceholderCard(...renderParams);
}

export default PlaceholderCard;
