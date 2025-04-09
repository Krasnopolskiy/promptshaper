/**
 * Handler functions for usePlaceholderCard hook
 *
 * @module components/placeholder/hooks/usePlaceholderCard/handlers
 */
import { createEditHandlers, createKeyDownHandler } from '../handlers/editHandlers';
import { createActionHandlers } from '../handlers/actionHandlers';
import { createToggleHandlers } from '../handlers/toggleHandlers';
import { createCardBorderStyle, getModeDescription } from '../utils/styleUtils';
import { UsePlaceholderCardProps, UsePlaceholderCardReturn } from '../types';
import { CardState } from './state';

/**
 * Return type for edit handlers
 */
type EditHandlersType = ReturnType<typeof createEditingHandlers>;

/**
 * Return type for action handlers
 */
type ActionHandlersType = ReturnType<typeof createPlaceholderActions>;

/**
 * Return type for toggle handlers
 */
type ToggleHandlersType = ReturnType<typeof createPlaceholderToggles>;

/**
 * Return type for UI handlers
 */
type UIHandlersType = ReturnType<typeof createKeyHandler> & ReturnType<typeof createAppearanceHandlers>;

/**
 * Return type for combined handlers
 */
type CombinedHandlersType = EditHandlersType & ActionHandlersType & ToggleHandlersType;

/**
 * Create edit related handlers
 * @param {CardState} state - Card state
 * @param {UsePlaceholderCardProps} props - Component props
 * @returns {Object} Edit handlers
 */
export function createEditingHandlers(
  state: CardState,
  props: UsePlaceholderCardProps
): ReturnType<typeof createEditHandlers> {
  return createEditHandlers(state, props.placeholder, props);
}

/**
 * Create action handlers
 * @param {UsePlaceholderCardProps} props - Component props
 * @returns {Object} Action handlers
 */
export function createPlaceholderActions(
  props: UsePlaceholderCardProps
): ReturnType<typeof createActionHandlers> {
  return createActionHandlers(props.placeholder, props);
}

/**
 * Create toggle handlers
 * @param {CardState} state - Card state
 * @param {UsePlaceholderCardProps} props - Component props
 * @returns {Object} Toggle handlers
 */
export function createPlaceholderToggles(
  state: CardState,
  props: UsePlaceholderCardProps
): ReturnType<typeof createToggleHandlers> {
  return createToggleHandlers(
    state,
    props.placeholder,
    props.onUpdate
  );
}

/**
 * Create keyboard handler
 * @param {() => void} saveHandler - Save handler function
 * @param {() => void} cancelHandler - Cancel handler function
 * @returns {Object} Keyboard handler
 */
export function createKeyboardHandler(
  saveHandler: () => void,
  cancelHandler: () => void
): { handleKeyDown: ReturnType<typeof createKeyDownHandler> } {
  return {
    handleKeyDown: createKeyDownHandler(saveHandler, cancelHandler)
  };
}

/**
 * Create appearance properties
 * @param {string} color - Selected color
 * @param {string} mode - Current mode
 * @returns {Object} Appearance properties
 */
export function createAppearanceProps(
  color: string,
  mode: string
): { cardBorderStyle: ReturnType<typeof createCardBorderStyle>; modeDescription: string } {
  return {
    cardBorderStyle: createCardBorderStyle(color),
    modeDescription: getModeDescription(mode)
  };
}

/**
 * Create edit handlers from state and props
 * @param {CardState} state - Card state
 * @param {UsePlaceholderCardProps} props - Component props
 * @returns {Object} Edit handlers
 */
export function createEditHandlersForCard(
  state: CardState,
  props: UsePlaceholderCardProps
): EditHandlersType {
  return createEditingHandlers(state, props);
}

/**
 * Create action and toggle handlers
 * @param {CardState} state - Card state
 * @param {UsePlaceholderCardProps} props - Component props
 * @returns {Object} Action and toggle handlers
 */
export function createActionToggleHandlers(
  state: CardState,
  props: UsePlaceholderCardProps
): ActionHandlersType & ToggleHandlersType {
  return {
    ...createPlaceholderActions(props),
    ...createPlaceholderToggles(state, props)
  };
}

/**
 * Create basic handlers from card state
 * @param {CardState} state - Card state
 * @param {UsePlaceholderCardProps} props - Component props
 * @returns {Object} Basic handlers
 */
export function createBaseHandlers(
  state: CardState,
  props: UsePlaceholderCardProps
): CombinedHandlersType {
  const editHandlers = createEditHandlersForCard(state, props);
  return { ...editHandlers, ...createActionToggleHandlers(state, props) };
}

/**
 * Create key handler from edit handlers
 * @param {ReturnType<typeof createEditingHandlers>} editHandlers - Edit handlers
 * @returns {Object} Key handler
 */
export function createKeyHandler(
  editHandlers: EditHandlersType
): { handleKeyDown: ReturnType<typeof createKeyDownHandler> } {
  return createKeyboardHandler(
    editHandlers.handleSave,
    editHandlers.handleCancel
  );
}

/**
 * Create appearance handlers from state
 * @param {CardState} state - Card state
 * @returns {Object} Appearance handlers
 */
export function createAppearanceHandlers(
  state: CardState
): { cardBorderStyle: ReturnType<typeof createCardBorderStyle>; modeDescription: string } {
  return createAppearanceProps(
    state.selectedColor,
    state.mode
  );
}

/**
 * Create keyboard and appearance handlers
 * @param {CardState} state - Card state
 * @param {ReturnType<typeof createEditingHandlers>} editHandlers - Edit handlers
 * @returns {Object} Keyboard and appearance handlers
 */
export function createUIHandlers(
  state: CardState,
  editHandlers: EditHandlersType
): UIHandlersType {
  return { ...createKeyHandler(editHandlers), ...createAppearanceHandlers(state) };
}

/**
 * Type for card handlers
 */
type HandlerReturnType = Pick<UsePlaceholderCardReturn,
  'handleSave' | 'handleCancel' | 'handleKeyDown' |
  'handleCopyToClipboard' | 'handleDelete' | 'handleInsert' |
  'toggleMode' | 'modeDescription' | 'cardBorderStyle'>;

/**
 * Create base and UI handlers
 * @param {CardState} state - Card state
 * @param {UsePlaceholderCardProps} props - Props
 * @returns {Object} All handlers
 */
export function createAllCardHandlers(
  state: CardState,
  props: UsePlaceholderCardProps
): HandlerReturnType {
  const baseHandlers = createBaseHandlers(state, props);
  return { ...baseHandlers, ...createUIHandlers(state, baseHandlers) };
}
