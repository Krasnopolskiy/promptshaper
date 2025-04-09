/**
 * Configuration types for keyboard handlers
 * @module components/placeholder/handlers/keyHandlersConfig
 */
import React from 'react';
import { Placeholder } from '@/types';

/**
 * Configuration for Enter key handler
 */
export interface EnterKeyConfig {
  /** Keyboard event */
  event: React.KeyboardEvent<HTMLInputElement>;
  /** Placeholder object */
  placeholder: Placeholder;
  /** Whether in editing mode */
  isEditing: boolean;
  /** New name value */
  newName: string;
  /** Function to handle save */
  handleSave: () => void;
  /** Function to handle cancel */
  handleCancel: () => void;
  /** Function to prevent default */
  preventDefault: () => void;
}
