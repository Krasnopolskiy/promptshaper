/**
 * Key handlers configuration
 *
 * @module components/placeholder/handlers/keyHandlersConfig
 */
import { KeyboardEvent } from 'react';
import { Placeholder } from '@/types';

/**
 * Configuration for enter key handler
 */
export interface EnterKeyConfig {
  /** Keyboard event */
  event: KeyboardEvent<HTMLInputElement>;
  /** Placeholder data */
  placeholder: Placeholder;
  /** Is editing mode active */
  isEditing: boolean;
  /** New name value */
  newName: string;
  /** Save handler */
  handleSave: () => void;
  /** Cancel handler */
  handleCancel: () => void;
  /** Previous default handler */
  preventDefault: () => void;
}
