/**
 * useCardProps Hook
 *
 * Creates and returns props for the placeholder card component
 *
 * @module components/placeholder/hooks/useCardProps
 */
import { useRef, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { togglePlaceholderMode as _togglePlaceholderMode } from 'store/actions';
import { DeleteIcon as _DeleteIcon, FlipIcon as _FlipIcon } from 'components/Icons';
import type { PlaceholderViewMode as _PlaceholderViewMode } from 'types/placeholder';
import type {
  PlaceholderCardProps as _PlaceholderCardProps,
  ActionConfig as _ActionConfig,
  PlaceholderMeta as _PlaceholderMeta,
  CardStyle as _CardStyle,
} from 'types/placeholder';
import { usePrimaryHandlers } from './usePrimaryHandlers';
import { useActionHandlers } from './useActionHandlers';
import { useEditHandlers } from './useEditHandlers';
import {
  getCardStyle,
  createCardClickHandler,
  prepareActionConfig
} from './useCardProps/utils';
import { createHandlersObject } from './useCardProps/processHandlers';
import { prepareSafeHandlers } from './useCardProps/handlers';

/**
 * Creates action config from handlers
 * @param {unknown} handlers - Handlers object
 * @returns {unknown} Action configuration
 */
function createActionConfig(handlers: unknown): unknown {
  const safeHandlers = prepareSafeHandlers(handlers);
  return prepareActionConfig(safeHandlers);
}

/**
 * Configure click handler
 * @param {unknown} dispatch - Dispatch function
 * @param {unknown} id - ID value
 * @param {unknown} mode - Mode value
 * @returns {() => void} Click handler
 */
function configureClickHandler(
  dispatch: unknown,
  id: unknown,
  mode: unknown
): () => void {
  const typedDispatch = dispatch as (...args: unknown[]) => void;
  const typedId = id as string;
  const typedMode = mode as string;

  return createCardClickHandler(typedDispatch, typedId, typedMode);
}

/**
 * Create props structure config type
 */
type PropsStructureConfig = {
  meta: unknown;
  isActive: unknown;
  cardRef: unknown;
  handlers: unknown;
  actionConfig: unknown;
}

/**
 * Create props return object
 * @param {PropsStructureConfig} config - Props configuration
 * @returns {Record<string, unknown>} Props object
 */
function createPropsStructure(config: PropsStructureConfig): Record<string, unknown> {
  return {
    meta: config.meta,
    ref: config.cardRef,
    style: getCardStyle(config.isActive as boolean),
    handlers: config.handlers,
    actionConfig: config.actionConfig
  };
}

/**
 * Process handlers for props
 * @param {unknown} handlers - Handlers
 * @returns {Object} Processed handlers and config
 */
function processHandlersForProps(handlers: unknown): {
  processedHandlers: unknown;
  actionConfig: unknown;
} {
  const h = handlers as Record<string, unknown>;
  return {
    processedHandlers: createHandlersObject(h),
    actionConfig: h.actionConfig
  };
}

/**
 * Extract props from parameters
 * @param {Record<string, unknown>} params - Source parameters
 * @returns {PropsStructureConfig} Props config
 */
function extractPropsConfig(params: Record<string, unknown>): PropsStructureConfig {
  const { processedHandlers, actionConfig } = processHandlersForProps(params.handlers);

  return {
    meta: params.meta,
    isActive: params.isActive,
    cardRef: params.cardRef,
    handlers: processedHandlers,
    actionConfig
  };
}

/**
 * Creates props for the placeholder card
 * @param {Object} params - Parameters for props creation
 * @returns {Object} The card props
 */
function createProps(params: Record<string, unknown>): Record<string, unknown> {
  const config = extractPropsConfig(params);
  return createPropsStructure(config);
}

/**
 * Initializes state for the card props
 * @param {Object} meta - Card metadata
 * @returns {Object} State and handlers for the card
 */
function useCardState(meta: Record<string, unknown>): Record<string, unknown> {
  const dispatch = useDispatch();
  const cardRef = useRef(null);
  const [editValue, setEditValue] = useState(meta.content as string);

  return { dispatch, cardRef, editValue, setEditValue };
}

/**
 * Edit params factory
 * @param {unknown} id - Card ID
 * @param {unknown} content - Content
 * @param {Object} state - State object
 * @returns {Object} Edit params
 */
function createEditParams(
  id: unknown, content: unknown, state: Record<string, unknown>
): Record<string, unknown> {
  return {
    id, editValue: state.editValue,
    setEditValue: state.setEditValue, originalValue: content
  };
}

/**
 * Initializes handlers for card props
 * @param {Object} meta - Card metadata
 * @param {Object} state - Card state
 * @returns {Object} Handlers
 */
function useCardHandlers(
  meta: Record<string, unknown>,
  state: Record<string, unknown>
): Record<string, unknown> {
  const actionHandlers = useActionHandlers(meta.id as string);
  const { handleCopy } = usePrimaryHandlers(meta);
  const editParams = createEditParams(meta.id, meta.content, state);
  const editHandlers = useEditHandlers(editParams);

  return { actionHandlers, handleCopy, editHandlers };
}

/**
 * Type for handlers params
 */
type HandlersConfig = {
  meta: Record<string, unknown>;
  isActive: unknown;
  state: Record<string, unknown>;
  handlers: Record<string, unknown>;
}

/**
 * Prepare handlers config
 * @param {Record<string, unknown>} primaryHandlers - Primary handlers
 * @param {Record<string, unknown>} handlers - Card handlers
 * @returns {Record<string, unknown>} Handlers config
 */
function prepareHandlersConfig(
  primaryHandlers: Record<string, unknown>,
  handlers: Record<string, unknown>
): Record<string, unknown> {
  return {
    ...primaryHandlers,
    handleCopy: handlers.handleCopy,
    ...(handlers.editHandlers as Record<string, unknown> || {})
  };
}

/**
 * Creates parameters for card props
 * @param {HandlersConfig} config - Configuration object
 * @returns {Record<string, unknown>} Props parameters
 */
function createPropParams(config: HandlersConfig): Record<string, unknown> {
  const { meta, isActive, state, handlers } = config;
  const primaryHandlers = buildPrimaryHandlers(meta, state, handlers);
  const handlersConfig = prepareHandlersConfig(primaryHandlers, handlers);

  return {
    meta, isActive,
    handlers: handlersConfig,
    cardRef: state.cardRef
  };
}

/**
 * Hook for creating placeholder card props
 * @param {Object} meta - Metadata
 * @param {boolean} isActive - Is active
 * @returns {Object} Card props
 */
export function useCardProps(
  meta: Record<string, unknown>,
  isActive: boolean
): Record<string, unknown> {
  const [state, handlers] = usePrepareComponents(meta);
  return useMemo(
    () => createFinalProps(meta, isActive, state, handlers),
    [meta, isActive, state, handlers]
  );
}

/**
 * Build primary handlers directly
 * @param {Object} meta - Metadata
 * @param {Object} state - State
 * @param {Object} handlers - Handlers
 * @returns {Record<string, unknown>} Primary handlers
 */
function buildPrimaryHandlers(
  meta: Record<string, unknown>,
  state: Record<string, unknown>,
  handlers: Record<string, unknown>
): Record<string, unknown> {
  const handleCardClick = configureClickHandler(state.dispatch, meta.id, meta.mode);
  const actionConfig = createActionConfig(handlers.actionHandlers);
  return { handleCardClick, actionConfig };
}

/**
 * Creates final props
 * @param {Object} meta - Metadata
 * @param {boolean} isActive - Is active
 * @param {Object} state - State
 * @param {Object} handlers - Handlers
 * @returns {Object} Card props
 */
function createFinalProps(
  meta: Record<string, unknown>,
  isActive: boolean,
  state: Record<string, unknown>,
  handlers: Record<string, unknown>
): Record<string, unknown> {
  const propsParams = buildPropsParams(meta, isActive, state, handlers);
  return createProps(propsParams);
}

/**
 * Prepares hook components
 * @param {Object} meta - Metadata
 * @returns {Array} Array of state and handlers
 */
function usePrepareComponents(meta: Record<string, unknown>): [
  Record<string, unknown>, Record<string, unknown>
] {
  const state = useCardState(meta);
  const handlers = useCardHandlers(meta, state);
  return [state, handlers];
}

/**
 * Builds props parameters
 * @param {Object} meta - Metadata
 * @param {boolean} isActive - Is active
 * @param {Object} state - Card state
 * @param {Object} handlers - Handlers
 * @returns {Object} Props parameters
 */
function buildPropsParams(
  meta: Record<string, unknown>,
  isActive: boolean,
  state: Record<string, unknown>,
  handlers: Record<string, unknown>
): Record<string, unknown> {
  const config: HandlersConfig = { meta, isActive, state, handlers };
  return createPropParams(config);
}
