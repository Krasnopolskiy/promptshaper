/**
 * Hook for managing placeholder card state and behavior
 *
 * @module components/placeholder/hooks/usePlaceholderCard
 */
import { useEffect } from 'react';
import { UsePlaceholderCardProps, UsePlaceholderCardReturn } from '../types';
import { useCardState } from './state';
import { useCardHandlers } from './handlers';
import { createCardBorderStyle, getModeDescription } from '../utils/styleUtils';

/**
 * Creates the card style and description
 * @param {string} selectedColor - The selected color
 * @param {string} mode - The current mode
 * @returns {Object} The card style and description
 */
const createCardStyle = (selectedColor: string, mode: string): {
  cardBorderStyle: ReturnType<typeof createCardBorderStyle>;
  modeDescription: ReturnType<typeof getModeDescription>;
} => ({
  cardBorderStyle: createCardBorderStyle(selectedColor),
  modeDescription: getModeDescription(mode)
});

/**
 * Sets up focus effect for the input ref
 * @param {boolean} isEditing - Whether the card is in editing mode
 * @param {React.RefObject<HTMLInputElement>} inputRef - Reference to the input element
 */
const useFocusEffect = (
  isEditing: boolean,
  inputRef: React.RefObject<HTMLInputElement>
): void => {
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing, inputRef]);
};

/**
 * Creates the return value for the placeholder card hook
 * @param {Object} state - The card state
 * @param {Object} handlers - The card handlers
 * @param {Object} style - The card style
 * @returns {UsePlaceholderCardReturn} The combined return value
 */
const createReturnValue = (
  state: ReturnType<typeof useCardState>['state'],
  handlers: ReturnType<typeof useCardHandlers>,
  style: ReturnType<typeof createCardStyle>
): UsePlaceholderCardReturn => ({
  ...state,
  ...handlers,
  ...style
});

/**
 * Hook for managing placeholder card state and behavior
 * @param {UsePlaceholderCardProps} props - Hook properties
 * @returns {UsePlaceholderCardReturn} Object containing state and handlers for the placeholder card
 */
export function usePlaceholderCard(props: UsePlaceholderCardProps): UsePlaceholderCardReturn {
  const { state, refs } = useCardState(props.placeholder);
  const handlers = useCardHandlers(state, props);
  const style = createCardStyle(state.selectedColor, state.mode);

  useFocusEffect(state.isEditing, refs.inputRef);
  return createReturnValue(state, handlers, style);
}
