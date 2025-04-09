/**
 * Module for placeholder keyboard handlers
 * @module components/placeholder/handlers/keyHandlers
 */
import React from 'react';
import { Placeholder } from '@/types';
import { EnterKeyConfig } from './keyHandlersConfig';
import {
  createEnterKeyConfig,
  createSaveHandler,
  extractParamsData
} from './keyHandlerUtils';

/**
 * Executes the appropriate action based on editing state
 * @param {boolean} isEditing - Whether in editing mode
 * @param {() => void} handleSave - Save handler function
 * @param {() => void} handleCancel - Cancel handler function
 */
function executeEnterAction(
  isEditing: boolean,
  handleSave: () => void,
  handleCancel: () => void
): void {
  isEditing ? handleSave() : handleCancel();
}

/**
 * Handles Enter key press event
 * @param {EnterKeyConfig} config - Configuration for the enter key handler
 * @returns {boolean} Whether the event was handled
 */
export function handleEnterKey(config: EnterKeyConfig): boolean {
  const { event, isEditing, handleSave, handleCancel, preventDefault } = config;

  if (event.key === 'Enter' && !event.shiftKey) {
    preventDefault();
    executeEnterAction(isEditing, handleSave, handleCancel);
    return true;
  }
  return false;
}

/**
 * Handles Escape key press event
 * @param {React.KeyboardEvent} e - Keyboard event
 * @param {Function|undefined} resetFn - Function to reset state
 * @returns {boolean} Whether the event was handled
 */
export function handleEscapeKey(
  e: React.KeyboardEvent,
  resetFn?: () => void
): boolean {
  if (e.key === 'Escape' && resetFn) {
    resetFn();
    return true;
  }
  return false;
}

/**
 * Interface for keydown handler parameters
 */
export interface KeyHandlerParams {
  /** Placeholder ID */
  id: string;
  /** New name for the placeholder */
  newName: string;
  /** New content for the placeholder */
  newContent: string;
  /** Selected color for the placeholder */
  selectedColor: string;
  /** Update function */
  updateFn?: (id: string, updates: Partial<Placeholder>) => void;
  /** Function to set editing state */
  setEditingFn?: (value: boolean) => void;
  /** Function to reset state */
  resetFn?: () => void;
}

/**
 * Processes keydown event for placeholder editing
 * @param {React.KeyboardEvent} e - Keyboard event
 * @param {EnterKeyConfig} config - Enter key configuration
 * @param {Function|undefined} resetFn - Reset function
 */
function processKeyEvent(
  e: React.KeyboardEvent,
  config: EnterKeyConfig,
  resetFn?: () => void
): void {
  if (!handleEnterKey(config)) {
    handleEscapeKey(e, resetFn);
  }
}

/**
 * Creates a save handler from parameter objects
 * @param {string} id - Placeholder ID
 * @param {KeyHandlerParams} params - All parameters
 * @returns {() => void} Save handler function
 */
function createSaveHandlerFromParams(
  id: string,
  params: KeyHandlerParams
): () => void {
  const { newName, newContent, selectedColor, updateFn, setEditingFn } = params;
  const updateParams = { newName, newContent, selectedColor };

  return createSaveHandler(
    id, updateParams, updateFn, setEditingFn
  );
}

/**
 * Extract placeholder from handler parameters
 * @param {KeyHandlerParams} params - Handler parameters
 * @returns {Placeholder} The placeholder
 */
function extractPlaceholder(params: KeyHandlerParams): Placeholder {
  const [placeholder] = extractParamsData(params);
  return placeholder;
}

/**
 * Type for config inputs
 */
type ConfigInputType = Parameters<typeof createEnterKeyConfig>[0];

/**
 * Creates a config params object with required properties
 * @param {KeyHandlerParams} params - Handler parameters
 * @param {React.KeyboardEvent} event - Keyboard event
 * @param {() => void} handleSave - Save handler function
 * @returns {Object} Config parameters
 */
function createConfigInputs(
  params: KeyHandlerParams,
  event: React.KeyboardEvent,
  handleSave: () => void
): ConfigInputType {
  return {
    event, placeholder: extractPlaceholder(params),
    newName: params.newName, handleSave, resetFn: params.resetFn
  };
}

/**
 * Creates save handler and config for keyboard event
 * @param {KeyHandlerParams} params - Key handler parameters
 * @param {React.KeyboardEvent} event - Keyboard event
 * @returns {EnterKeyConfig} Enter key configuration
 */
function prepareKeyHandling(
  params: KeyHandlerParams,
  event: React.KeyboardEvent
): EnterKeyConfig {
  const handleSave = createSaveHandlerFromParams(params.id, params);
  const configInputs = createConfigInputs(params, event, handleSave);
  return createEnterKeyConfig(configInputs);
}

/**
 * Creates keyboard event handler for placeholder editing
 * @param {KeyHandlerParams} params - Key handler parameters
 * @returns {Function} Keyboard event handler
 */
export function createKeyDownHandler(
  params: KeyHandlerParams
): (e: React.KeyboardEvent) => void {
  return (e: React.KeyboardEvent): void => {
    const config = prepareKeyHandling(params, e);
    processKeyEvent(e, config, params.resetFn);
  };
}
