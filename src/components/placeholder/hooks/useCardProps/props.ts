/**
 * Props creation functions
 *
 * @module components/placeholder/hooks/useCardProps/props
 */
import React from 'react';
import { getCardStyle } from './utils';
import { createHandlersObject } from './processHandlers';
import type { PlaceholderMeta, PlaceholderCardProps, ActionConfig } from 'types/placeholder';

/**
 * Handler type definition
 */
type Handlers = {
  handleCardClick: () => void;
  handleCopy: () => void;
  handleInputChange: (value: string) => void;
  handleEditAccept: () => void;
  handleEditCancel: () => void;
};

/**
 * Basic card props type
 */
type BasicCardProps = {
  meta: PlaceholderMeta;
  style: Record<string, unknown>;
  ref: React.RefObject<HTMLDivElement>;
};

/**
 * Card parameters type
 */
type CardParams = {
  meta: PlaceholderMeta;
  isActive: boolean;
  handlers: Handlers & { actionConfig: ActionConfig };
  cardRef: React.RefObject<HTMLDivElement>;
};

/**
 * Extracts click and copy handlers
 * @param {Object} handlers - Source handlers
 * @param {Function} handlers.handleCardClick - Card click handler function
 * @param {Function} handlers.handleCopy - Copy handler function
 * @returns {Object} Extracted handler properties
 */
function extractClickHandlers(handlers: Handlers): Pick<Handlers, 'handleCardClick' | 'handleCopy'> {
  return {
    handleCardClick: handlers.handleCardClick,
    handleCopy: handlers.handleCopy,
  };
}

/**
 * Extracts edit handlers
 * @param {Object} handlers - Source handlers
 * @param {Function} handlers.handleInputChange - Input change handler function
 * @param {Function} handlers.handleEditAccept - Edit accept handler function
 * @param {Function} handlers.handleEditCancel - Edit cancel handler function
 * @returns {Object} Extracted handler properties
 */
function extractEditHandlers(handlers: Handlers): Pick<Handlers, 'handleInputChange' | 'handleEditAccept' | 'handleEditCancel'> {
  return {
    handleInputChange: handlers.handleInputChange,
    handleEditAccept: handlers.handleEditAccept,
    handleEditCancel: handlers.handleEditCancel,
  };
}

/**
 * Combines handler parts
 * @param {Object} clickHandlers - Click handlers
 * @param {Object} editHandlers - Edit handlers
 * @returns {Handlers} Combined handlers
 */
function combineHandlers(
  clickHandlers: Pick<Handlers, 'handleCardClick' | 'handleCopy'>,
  editHandlers: Pick<Handlers, 'handleInputChange' | 'handleEditAccept' | 'handleEditCancel'>
): Handlers {
  return {
    ...clickHandlers,
    ...editHandlers,
  };
}

/**
 * Creates the processed handlers for card props
 * @param {Object} handlers - Handlers to process
 * @param {Function} handlers.handleCardClick - Card click handler function
 * @param {Function} handlers.handleCopy - Copy handler function
 * @param {Function} handlers.handleInputChange - Input change handler function
 * @param {Function} handlers.handleEditAccept - Edit accept handler function
 * @param {Function} handlers.handleEditCancel - Edit cancel handler function
 * @returns {Object} Processed handlers
 */
function createProcessedHandlers(handlers: Handlers): Record<string, unknown> {
  const clickHandlers = extractClickHandlers(handlers);
  const editHandlers = extractEditHandlers(handlers);
  const combinedHandlers = combineHandlers(clickHandlers, editHandlers);
  return createHandlersObject(combinedHandlers);
}

/**
 * Gets the style for a card
 * @param {boolean} isActive - Whether the card is active
 * @returns {Object} Card style
 */
function getCardStyleForProps(isActive: boolean): Record<string, unknown> {
  return getCardStyle(isActive);
}

/**
 * Creates the basic prop structure for a card
 * @param {PlaceholderMeta} meta - Metadata for the placeholder
 * @param {boolean} isActive - Whether the card is active
 * @param {React.RefObject<HTMLDivElement>} cardRef - Reference to the card element
 * @returns {BasicCardProps} Basic card props
 */
function createBasicCardProps(
  meta: PlaceholderMeta,
  isActive: boolean,
  cardRef: React.RefObject<HTMLDivElement>
): BasicCardProps {
  const style = getCardStyleForProps(isActive);
  return { meta, style, ref: cardRef };
}

/**
 * Creates merged props with handlers
 * @param {BasicCardProps} basicProps - Basic card props
 * @param {Record<string, unknown>} handlers - Processed handlers
 * @returns {Partial<PlaceholderCardProps>} Partial card props
 */
function mergePropsWithHandlers(
  basicProps: BasicCardProps,
  handlers: Record<string, unknown>
): Partial<PlaceholderCardProps> {
  return {
    ...basicProps,
    handlers,
  };
}

/**
 * Adds action config to props
 * @param {Partial<PlaceholderCardProps>} props - Partial props
 * @param {ActionConfig} actionConfig - Action configuration
 * @returns {PlaceholderCardProps} Complete card props
 */
function addActionConfig(
  props: Partial<PlaceholderCardProps>,
  actionConfig: ActionConfig
): PlaceholderCardProps {
  return {
    ...props,
    actionConfig,
  } as PlaceholderCardProps;
}

/**
 * Creates processed handlers
 * @param {Object} params - Card parameters
 * @param {PlaceholderMeta} params.meta - Card metadata
 * @param {boolean} params.isActive - Active state
 * @param {Object} params.handlers - Handler functions
 * @param {React.RefObject<HTMLDivElement>} params.cardRef - Card reference
 * @returns {Record<string, unknown>} Processed handlers
 */
function createProcessedHandlersFromParams(
  params: CardParams
): Record<string, unknown> {
  return createProcessedHandlers(params.handlers);
}

/**
 * Creates basic card props from parameters
 * @param {Object} params - Card parameters
 * @param {PlaceholderMeta} params.meta - Card metadata
 * @param {boolean} params.isActive - Active state
 * @param {Object} params.handlers - Handler functions
 * @param {React.RefObject<HTMLDivElement>} params.cardRef - Card reference
 * @returns {BasicCardProps} Basic card props
 */
function createBasicPropsFromParams(
  params: CardParams
): BasicCardProps {
  return createBasicCardProps(
    params.meta,
    params.isActive,
    params.cardRef
  );
}

/**
 * Creates props for the placeholder card
 * @param {Object} params - Parameters for props creation
 * @param {PlaceholderMeta} params.meta - Metadata for the placeholder
 * @param {boolean} params.isActive - Whether the card is active
 * @param {Object} params.handlers - Card handlers object
 * @param {Function} params.handlers.handleCardClick - Card click handler function
 * @param {ActionConfig} params.handlers.actionConfig - Action configuration
 * @param {Function} params.handlers.handleCopy - Copy handler function
 * @param {Function} params.handlers.handleInputChange - Input change handler function
 * @param {Function} params.handlers.handleEditAccept - Edit accept handler function
 * @param {Function} params.handlers.handleEditCancel - Edit cancel handler function
 * @param {React.RefObject<HTMLDivElement>} params.cardRef - Reference to the card element
 * @returns {PlaceholderCardProps} The card props
 */
export function createProps(params: CardParams): PlaceholderCardProps {
  const processedHandlers = createProcessedHandlersFromParams(params);
  const basicProps = createBasicPropsFromParams(params);
  const mergedProps = mergePropsWithHandlers(basicProps, processedHandlers);
  return addActionConfig(mergedProps, params.handlers.actionConfig);
}
