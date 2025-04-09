/**
 * Utility functions for card props
 *
 * @module components/placeholder/hooks/useCardProps/utils
 */
import React from 'react';
import { DeleteIcon, FlipIcon } from 'components/Icons';
import type { PlaceholderViewMode } from 'types/placeholder';
import { noop } from 'util/functions';
import type {
  ActionConfig,
  CardStyle,
} from 'types/placeholder';
import { useDispatch } from 'react-redux';
import { togglePlaceholderMode } from 'store/actions';

// Types for card actions
/**
 * Action item interface
 */
interface Action {
  icon: React.ElementType;
  tooltip: string;
  onClick: () => void;
}

/**
 * Dropdown action item interface
 */
interface DropdownAction {
  label: string;
  onClick: () => void;
}

// Style utilities

/**
 * Gets the style for the card based on the active state
 * @param {boolean} isActive - Whether the card is active
 * @returns {CardStyle} The style object for the card
 */
export function getCardStyle(isActive: boolean): CardStyle {
  return {
    opacity: isActive ? 1 : 0.7,
    transform: isActive ? 'translateY(0)' : 'translateY(8px)',
  };
}

// Event handlers

/**
 * Creates a handler for clipboard actions
 * @param {Function} handleCopy - Function to handle copy action
 * @returns {Function} Handler for clipboard action
 */
export function createClipboardHandler(handleCopy: () => void): (e: React.MouseEvent) => void {
  return (e: React.MouseEvent): void => {
    e.stopPropagation();
    handleCopy();
  };
}

/**
 * Creates a handler for mode toggle
 * @param {Function} dispatch - Redux dispatch function
 * @param {string} id - Placeholder ID
 * @param {PlaceholderViewMode} mode - Current view mode
 * @returns {Function} Handler for mode toggle
 */
export function createModeToggleHandler(
  dispatch: ReturnType<typeof useDispatch>,
  id: string,
  mode: PlaceholderViewMode
): () => void {
  return (): void => {
    dispatch(togglePlaceholderMode({ id, mode }));
  };
}

// Action configuration utilities

/**
 * Creates delete action item
 * @param {Function} handleDelete - Delete handler function
 * @returns {Object} Delete action item
 */
export function createDeleteAction(
  handleDelete: () => void
): { icon: React.ElementType; handler: () => void; tooltip: string; ariaLabel: string } {
  return {
    icon: DeleteIcon,
    handler: handleDelete,
    tooltip: 'Delete',
    ariaLabel: 'Delete placeholder',
  };
}

/**
 * Creates flip action item
 * @param {Function} handleFlip - Flip handler function
 * @returns {Object} Flip action item
 */
export function createFlipAction(
  handleFlip: () => void
): { icon: React.ElementType; handler: () => void; tooltip: string; ariaLabel: string } {
  return {
    icon: FlipIcon,
    handler: handleFlip,
    tooltip: 'Flip',
    ariaLabel: 'Flip placeholder',
  };
}

/**
 * Creates action items for card actions
 * @param {Function} handleDelete - Delete handler function
 * @param {Function} handleFlip - Flip handler function
 * @returns {Action[]} List of action items
 */
function createActionItems(handleDelete: () => void, handleFlip: () => void): Action[] {
  return [
    { icon: DeleteIcon, tooltip: 'Delete', onClick: handleDelete },
    { icon: FlipIcon, tooltip: 'Flip', onClick: handleFlip }
  ];
}

/**
 * Creates dropdown action items
 * @param {Function} handleDuplicate - Duplicate handler function
 * @returns {DropdownAction[]} List of dropdown actions
 */
function createDropdownItems(handleDuplicate: () => void): DropdownAction[] {
  return [
    { label: 'Duplicate', onClick: handleDuplicate }
  ];
}

/**
 * Prepares action configuration based on handlers
 * @param {Object} config - Object containing handler functions
 * @param {Function} config.handleDelete - Delete handler function
 * @param {Function} config.handleDuplicate - Duplicate handler function
 * @param {Function} config.handleFlip - Flip handler function
 * @returns {ActionConfig} The prepared action configuration
 */
export function prepareActionConfig(config: {
  handleDelete: () => void; handleDuplicate: () => void; handleFlip: () => void;
}): ActionConfig {
  const { handleDelete, handleDuplicate, handleFlip } = config;
  return {
    actions: createActionItems(handleDelete, handleFlip),
    dropdownActions: createDropdownItems(handleDuplicate)
  };
}

/**
 * Process input change handler
 * @param {Function} handler - Input change handler
 * @returns {Function} Processed handler
 */
export function processInputChangeHandler(
  handler?: (value: string) => void
): (value: string) => void {
  return handler || noop;
}

/**
 * Process edit handlers
 * @param {Function} acceptHandler - Accept handler
 * @param {Function} cancelHandler - Cancel handler
 * @returns {Object} Processed edit handlers
 */
export function processEditHandlers(
  acceptHandler?: () => void,
  cancelHandler?: () => void
): { handleEditAccept: () => void; handleEditCancel: () => void } {
  return {
    handleEditAccept: acceptHandler || noop,
    handleEditCancel: cancelHandler || noop,
  };
}

/**
 * Creates click handler for card
 * @param {Function} dispatch - Redux dispatch function
 * @param {string} id - Placeholder ID
 * @param {PlaceholderViewMode} mode - Current view mode
 * @returns {Function} Card click handler
 */
export function createCardClickHandler(
  dispatch: ReturnType<typeof useDispatch>,
  id: string,
  mode: PlaceholderViewMode
): () => void {
  return createModeToggleHandler(dispatch, id, mode);
}
