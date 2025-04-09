/**
 * Custom hook for PlaceholderCard functionality
 *
 * @module components/placeholder/hooks/usePlaceholderCard
 */
import { UsePlaceholderCardProps, UsePlaceholderCardReturn } from './types';
import {
  CardState,
  useInitialCardState,
  useCardState,
  useFocusEffect
} from './usePlaceholderCard/state';
import { createAllCardHandlers } from './usePlaceholderCard/handlers';

/**
 * Create all handlers for card
 * @param {CardState} state - Card state
 * @param {UsePlaceholderCardProps} props - Props
 * @returns {UsePlaceholderCardReturn} Complete return object
 */
function useCardHandlers(
  state: CardState,
  props: UsePlaceholderCardProps
): UsePlaceholderCardReturn {
  const handlers = createAllCardHandlers(state, props);

  // Combine state and handlers
  return {
    ...state,
    ...handlers
  };
}

/**
 * Hook for managing placeholder card
 * @param {UsePlaceholderCardProps} props - Hook properties
 * @returns {UsePlaceholderCardReturn} State and handlers for the placeholder card
 */
export function usePlaceholderCard(
  props: UsePlaceholderCardProps
): UsePlaceholderCardReturn {
  const { hooks, inputRef, textareaRef } = useInitialCardState(props);
  const state = useCardState(hooks, inputRef, textareaRef);
  const result = useCardHandlers(state, props);

  useFocusEffect(state.isEditing, inputRef);

  return result;
}
