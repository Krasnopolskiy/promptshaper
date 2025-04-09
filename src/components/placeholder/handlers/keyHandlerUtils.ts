/**
 * Utility functions for keyboard handlers
 * @module components/placeholder/handlers/keyHandlerUtils
 */
import React from 'react';
import { Placeholder } from '@/types';
import { createUpdatePayload, updatePlaceholder } from './saveHandlers';
import { EnterKeyConfig } from './keyHandlersConfig';

/**
 * Parameters for creating updates payload
 */
export interface UpdateParams {
  /** New name for the placeholder */
  newName: string;
  /** New content for the placeholder */
  newContent: string;
  /** Selected color for the placeholder */
  selectedColor: string;
}

/**
 * Parameters for creating enter key config
 */
export interface EnterKeyConfigParams {
  /** Keyboard event */
  event: React.KeyboardEvent;
  /** Placeholder object */
  placeholder: Placeholder;
  /** New name value */
  newName: string;
  /** Save handler function */
  handleSave: () => void;
  /** Reset function */
  resetFn?: () => void;
}

/**
 * Creates the update payload from parameters
 * @param {UpdateParams} params - Update parameters
 * @returns {Partial<Placeholder>} The update payload
 */
export function createUpdates(
  params: UpdateParams
): Partial<Placeholder> {
  const { newName, newContent, selectedColor } = params;
  return createUpdatePayload(newName, newContent, selectedColor);
}

/**
 * Applies update to a placeholder
 * @param {string} id - Placeholder ID
 * @param {Partial<Placeholder>} updates - Updates to apply
 * @param {Function|undefined} updateFn - Update function
 * @param {Function|undefined} setEditingFn - Function to set editing state
 */
export function applyUpdate(
  id: string,
  updates: Partial<Placeholder>,
  updateFn?: (id: string, updates: Partial<Placeholder>) => void,
  setEditingFn?: (value: boolean) => void
): void {
  updatePlaceholder(id, updates, updateFn, setEditingFn);
}

/**
 * Creates an update payload and applies the update
 * @param {string} id - Placeholder ID
 * @param {UpdateParams} params - Update parameters
 * @param {Function|undefined} updateFn - Update function
 * @param {Function|undefined} setEditingFn - Function to set editing state
 */
export function applyPlaceholderUpdate(
  id: string,
  params: UpdateParams,
  updateFn?: (id: string, updates: Partial<Placeholder>) => void,
  setEditingFn?: (value: boolean) => void
): void {
  const updates = createUpdates(params);
  applyUpdate(id, updates, updateFn, setEditingFn);
}

/**
 * Creates a save handler for placeholder editing
 * @param {string} id - Placeholder ID
 * @param {UpdateParams} updateParams - Update parameters
 * @param {Function|undefined} updateFn - Update function
 * @param {Function|undefined} setEditingFn - Function to set editing state
 * @returns {Function} Save handler
 */
export function createSaveHandler(
  id: string,
  updateParams: UpdateParams,
  updateFn?: (id: string, updates: Partial<Placeholder>) => void,
  setEditingFn?: (value: boolean) => void
): () => void {
  return (): void => {
    applyPlaceholderUpdate(id, updateParams, updateFn, setEditingFn);
  };
}

/**
 * Creates a cancel handler function for the enter key config
 * @param {Function|undefined} resetFn - Reset function
 * @returns {Function} Cancel handler
 */
export function createCancelHandler(resetFn?: () => void): () => void {
  /**
   * Handles cancellation by calling the reset function
   * @returns {void}
   */
  return (): void => resetFn?.();
}

/**
 * Creates a prevent default function for the event
 * @param {React.KeyboardEvent} event - Keyboard event
 * @returns {Function} Prevent default function
 */
export function createPreventDefault(event: React.KeyboardEvent): () => void {
  /**
   * Prevents default event behavior
   * @returns {void}
   */
  return (): void => event.preventDefault();
}

/**
 * Creates base event property for enter key config
 * @param {React.KeyboardEvent} event - Keyboard event
 * @returns {React.KeyboardEvent<HTMLInputElement>} Typed event
 */
export function createTypedEvent(
  event: React.KeyboardEvent
): React.KeyboardEvent<HTMLInputElement> {
  return event as unknown as React.KeyboardEvent<HTMLInputElement>;
}

/**
 * Creates primary prop values for config
 * @param {Placeholder} placeholder - Placeholder object
 * @param {string} newName - New name value
 * @param {() => void} handleSave - Save handler function
 * @returns {Object} Primary prop values
 */
export function createPrimaryPropValues(
  placeholder: Placeholder,
  newName: string,
  handleSave: () => void
): Pick<EnterKeyConfig, 'placeholder' | 'isEditing' | 'newName' | 'handleSave'> {
  return { placeholder, isEditing: true, newName, handleSave };
}

/**
 * Creates primary config properties
 * @param {EnterKeyConfigParams} params - Config parameters
 * @returns {Partial<EnterKeyConfig>} Config properties
 */
export function createPrimaryConfigProps(
  params: EnterKeyConfigParams
): Partial<EnterKeyConfig> {
  const { placeholder, newName, handleSave } = params;
  return createPrimaryPropValues(placeholder, newName, handleSave);
}

/**
 * Creates enter key config base properties
 * @param {EnterKeyConfigParams} params - Config parameters
 * @returns {Partial<EnterKeyConfig>} Base config properties
 */
export function createConfigBase(
  params: EnterKeyConfigParams
): Partial<EnterKeyConfig> {
  const { event } = params;
  return {
    event: createTypedEvent(event),
    ...createPrimaryConfigProps(params)
  };
}

/**
 * Creates handler functions for enter key config
 * @param {EnterKeyConfigParams} params - Config parameters
 * @returns {Pick<EnterKeyConfig, 'handleCancel' | 'preventDefault'>} Handler functions
 */
export function createConfigHandlers(
  params: EnterKeyConfigParams
): Pick<EnterKeyConfig, 'handleCancel' | 'preventDefault'> {
  const { event, resetFn } = params;

  return {
    handleCancel: createCancelHandler(resetFn),
    preventDefault: createPreventDefault(event)
  };
}

/**
 * Creates an enter key config for key handling
 * @param {EnterKeyConfigParams} params - Enter key config parameters
 * @returns {EnterKeyConfig} Enter key configuration
 */
export function createEnterKeyConfig(
  params: EnterKeyConfigParams
): EnterKeyConfig {
  return {
    ...createConfigBase(params),
    ...createConfigHandlers(params)
  } as EnterKeyConfig;
}

/**
 * Creates placeholder object from ID
 * @param {string} id - Placeholder ID
 * @returns {Placeholder} Placeholder object
 */
export function createPlaceholderFromId(id: string): Placeholder {
  return { id } as Placeholder;
}

/**
 * Creates update parameters object
 * @param {string} newName - New name
 * @param {string} newContent - New content
 * @param {string} selectedColor - Selected color
 * @returns {UpdateParams} Update parameters
 */
export function createUpdateParams(
  newName: string,
  newContent: string,
  selectedColor: string
): UpdateParams {
  return { newName, newContent, selectedColor };
}

/**
 * Parameter type for extractParamsData function
 */
export interface ExtractParams {
  /** Placeholder ID */
  id: string;
  /** New name for the placeholder */
  newName: string;
  /** New content for the placeholder */
  newContent: string;
  /** Selected color for the placeholder */
  selectedColor: string;
}

/**
 * Creates placeholder and update params from handler params
 * @param {ExtractParams} params - Key handler parameters
 * @returns {[Placeholder, UpdateParams]} Placeholder and update params
 */
export function extractParamsData(
  params: ExtractParams
): [Placeholder, UpdateParams] {
  const { id, newName, newContent, selectedColor } = params;

  const placeholder = createPlaceholderFromId(id);
  const updateParams = createUpdateParams(newName, newContent, selectedColor);

  return [placeholder, updateParams];
}

/**
 * Creates config params object
 * @param {Object} options - Config options
 * @returns {EnterKeyConfigParams} Config parameters
 */
export interface ConfigParamsOptions {
  /** Placeholder object */
  placeholder: Placeholder;
  /** Keyboard event */
  event: React.KeyboardEvent;
  /** New name */
  newName: string;
  /** Save handler */
  handleSave: () => void;
  /** Reset function */
  resetFn?: () => void;
}

/**
 * Creates config parameters for enter key config
 * @param {ConfigParamsOptions} options - Config options
 * @returns {EnterKeyConfigParams} Config parameters
 */
export function createConfigParams(
  options: ConfigParamsOptions
): EnterKeyConfigParams {
  return options;
}
