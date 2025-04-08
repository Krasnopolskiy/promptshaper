import { Placeholder } from '@/types';
import { PlaceholderState, HandlerProps } from '../types';

/**
 * Creates toggle handlers for expanded state and mode
 * @param {PlaceholderState} state - Placeholder state
 * @param {Placeholder} placeholder - Placeholder data
 * @param {HandlerProps['onUpdate']} onUpdate - Update function
 * @returns {Object} Object containing toggle handlers for expanded state and mode
 */
export function createToggleHandlers(
  state: PlaceholderState,
  placeholder: Placeholder,
  onUpdate: HandlerProps['onUpdate']
): { toggleExpanded: () => void; toggleMode: () => void } {
  const { isExpanded, setIsExpanded, mode } = state;

  return {
    /**
     * Toggles the expanded state of the placeholder card
     * @returns {void}
     */
    toggleExpanded: (): void => {
      setIsExpanded(!isExpanded);
    },

    /**
     * Toggles between replace and tag modes
     * @returns {void}
     */
    toggleMode: (): void => {
      const newMode = mode === 'replace' ? 'tag' : 'replace';
      onUpdate(placeholder.id, { mode: newMode });
    }
  };
}
