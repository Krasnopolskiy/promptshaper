/**
 * Module for placeholder keyboard handlers
 * @module components/placeholder/handlers/keyHandlers
 */
import React from 'react';
import { Placeholder } from '@/types';
import { createUpdatePayload, updatePlaceholder } from './saveHandlers';
import { EnterKeyConfig } from './keyHandlersConfig';

/**
 * Handles Enter key press event
 * @param {EnterKeyConfig} config - Configuration for the enter key handler
 * @returns {boolean} Whether the event was handled
 */
export function handleEnterKey(config: EnterKeyConfig): boolean {
  const { event, isEditing, handleSave, handleCancel, preventDefault } = config;

  if (event.key === 'Enter' && !event.shiftKey) {
    preventDefault();
    if (isEditing) {
      handleSave();
    } else {
      handleCancel();
    }
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
 * Creates keyboard event handler for placeholder editing
 * @param {KeyHandlerParams} params - Key handler parameters
 * @returns {Function} Keyboard event handler
 */
export function createKeyDownHandler(
  params: KeyHandlerParams
): (e: React.KeyboardEvent) => void {
  const { id, newName, newContent, selectedColor, updateFn, setEditingFn, resetFn } = params;

  return (e: React.KeyboardEvent): void => {
    // Create a placeholder object with the ID
    const placeholder = { id } as Placeholder;

    // Create the enter key config
    const enterKeyConfig: EnterKeyConfig = {
      event: e as unknown as React.KeyboardEvent<HTMLInputElement>,
      placeholder,
      isEditing: true,
      newName,
      /**
       * Handles saving the placeholder changes
       * @returns {void}
       */
      handleSave: (): void => {
        const updates = createUpdatePayload(newName, newContent, selectedColor);
        updatePlaceholder(id, updates, updateFn, setEditingFn);
      },
      /**
       * Handles cancelling the editing operation
       * @returns {void}
       */
      handleCancel: (): void => resetFn?.(),
      /**
       * Prevents the default event behavior
       * @returns {void}
       */
      preventDefault: (): void => e.preventDefault()
    };

    if (!handleEnterKey(enterKeyConfig)) {
      handleEscapeKey(e, resetFn);
    }
  };
}
