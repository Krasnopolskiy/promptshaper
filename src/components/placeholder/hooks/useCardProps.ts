/**
 * Module for placeholder card hook
 * @module components/placeholder/hooks/useCardProps
 */
import React from 'react';
import { Placeholder } from '@/types';
import { createCardStyle } from '../styles/cardStyles';
import { createActions } from './useCardActions';
import { useStateHandlers } from '../utils/stateHandlers';
import { PlaceholderCardRenderConfig } from '../utils/renderUtils';
import { createKeyDownHandler, ActionHandlers } from '../utils/actionHandlers';

/**
 * Props for the placeholder card component
 */
export interface PlaceholderCardProps {
  /** The placeholder data */
  placeholder: Placeholder;
  /** Function to update the placeholder */
  onUpdate?: (id: string, updates: Partial<Placeholder>) => void;
  /** Function to delete the placeholder */
  onDelete?: (id: string) => void;
  /** Function to insert the placeholder */
  onInsert?: (name: string) => void;
}

/**
 * Creates the card style
 * @param {Placeholder} placeholder - The placeholder data
 * @param {boolean} isEditing - Whether the card is in edit mode
 * @param {boolean} isExpanded - Whether the card is expanded
 * @returns {Object} Card style and class name
 */
function getCardStyle(placeholder: Placeholder, isEditing: boolean, isExpanded: boolean): { className: string; style: React.CSSProperties } {
  return createCardStyle(placeholder, isEditing, isExpanded);
}

/**
 * Creates the clipboard handler
 * @param {string} content - Content to copy
 * @returns {Promise<void>} Promise that resolves when content is copied
 */
async function createClipboardHandler(content: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(content);
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
  }
}

/**
 * Creates the mode toggle handler
 * @param {Placeholder} placeholder - The placeholder data
 * @param {Function} onUpdate - Update callback
 * @returns {() => void} Mode toggle handler
 */
function createModeToggleHandler(
  placeholder: Placeholder,
  onUpdate?: (id: string, updates: Partial<Placeholder>) => void
): () => void {
  return () => onUpdate?.(placeholder.id, { mode: placeholder.mode === 'replace' ? 'tag' : 'replace' });
}

/**
 * Creates action handlers for the placeholder card
 * @param {Object} params - Parameters for creating action handlers
 * @param {Placeholder} params.placeholder - The placeholder data
 * @param {Object} params.state - Component state
 * @param {Object} params.handlers - State handlers
 * @param {Function} params.onUpdate - Update callback
 * @param {Function} params.onDelete - Delete callback
 * @param {Function} params.onInsert - Insert callback
 * @returns {ActionHandlers} Action handlers for the card
 */
function getActionHandlers(params: {
  /** The placeholder data */
  placeholder: Placeholder;
  /** Component state */
  state: ReturnType<typeof useStateHandlers>['state'];
  /** State handlers */
  handlers: ReturnType<typeof useStateHandlers>['handlers'];
  /** Update callback */
  onUpdate?: (id: string, updates: Partial<Placeholder>) => void;
  /** Delete callback */
  onDelete?: (id: string) => void;
  /** Insert callback */
  onInsert?: (name: string) => void;
}): ActionHandlers {
  /**
   * Creates the action handlers using the provided configuration
   * Creates handlers for saving, canceling, deleting, inserting, copying, and toggling mode
   * @returns {ActionHandlers} The action handlers object
   */
  const actions = createActions({
    placeholder: params.placeholder,
    onUpdate: params.onUpdate,
    onDelete: params.onDelete,
    onInsert: params.onInsert,
    /**
     * Creates a handler for copying placeholder content to clipboard
     * @returns {() => Promise<void>} A function that copies the placeholder content to clipboard
     */
    copyToClipboard: () => createClipboardHandler(params.placeholder.content),
    /**
     * Creates a handler for toggling the placeholder mode between 'replace' and 'tag'
     * @returns {() => void} A function that toggles the placeholder mode
     */
    toggleMode: () => createModeToggleHandler(params.placeholder, params.onUpdate)()
  });

  /**
   * Combines the action handlers with the keydown handler
   * Adds keyboard event handling for save and cancel operations
   * @returns {ActionHandlers} The complete action handlers object
   */
  return {
    ...actions,
    handleKeyDown: createKeyDownHandler(actions.handleSave, actions.handleCancel)
  };
}

/**
 * Custom hook to prepare the placeholder card props
 * @param {PlaceholderCardProps} props - Component props
 * @returns {PlaceholderCardRenderConfig} Parameters for render function
 */
export function useCardProps(
  props: PlaceholderCardProps
): PlaceholderCardRenderConfig {
  const { placeholder, onUpdate, onDelete, onInsert } = props;

  // Create refs
  const inputRef = React.useRef<HTMLInputElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Set up state
  const { state, handlers } = useStateHandlers(placeholder);

  // Create styles
  const { className, style } = getCardStyle(placeholder, state.isEditing, state.isExpanded);

  // Create action handlers with memoization
  const actionHandlers = React.useMemo(
    () => getActionHandlers({ placeholder, state, handlers, onUpdate, onDelete, onInsert }),
    [placeholder, state, handlers, onUpdate, onDelete, onInsert]
  );

  return {
    className,
    style,
    placeholder,
    state,
    inputRef,
    textareaRef,
    actionHandlers,
    stateHandlers: handlers
  };
}
