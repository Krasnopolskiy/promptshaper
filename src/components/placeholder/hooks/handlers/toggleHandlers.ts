import { Placeholder } from '@/types';
import { PlaceholderState, HandlerProps } from '../types';

/**
 * Creates expanded state toggle handler
 * @param {PlaceholderState} state - Placeholder state
 * @returns {() => void} Toggle expanded handler
 */
function createExpandedToggle(state: PlaceholderState): () => void {
  const { isExpanded, setIsExpanded } = state;
  return (): void => setIsExpanded(!isExpanded);
}

/**
 * Creates mode toggle handler
 * @param {PlaceholderState} state - Placeholder state
 * @param {Placeholder} placeholder - Placeholder data
 * @param {HandlerProps['onUpdate']} onUpdate - Update function
 * @returns {() => void} Toggle mode handler
 */
function createModeToggle(
  state: PlaceholderState,
  placeholder: Placeholder,
  onUpdate: HandlerProps['onUpdate']
): () => void {
  const { mode } = state;
  return (): void => onUpdate(placeholder.id, { mode: mode === 'replace' ? 'tag' : 'replace' });
}

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
  return {
    toggleExpanded: createExpandedToggle(state),
    toggleMode: createModeToggle(state, placeholder, onUpdate)
  };
}
