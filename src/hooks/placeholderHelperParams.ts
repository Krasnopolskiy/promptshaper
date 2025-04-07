/**
 * Placeholder Helper Parameter Types
 *
 * Type definitions and parameter helpers for placeholders
 */
import { Placeholder } from '@/types';
import type { UsePlaceholderHelpersReturn } from './usePlaceholderHelpers';

/**
 * Type for basic helper parameters
 */
export interface BasicHelperParams {
  addPlaceholder: (name: string, content: string, color: string) => void;
  deletePlaceholder: (id: string) => void;
  placeholders: Placeholder[];
}

/**
 * Type for extended helper parameters
 */
export interface HelperParams extends BasicHelperParams {
  insertPlaceholderTag: (name: string, position: number) => number;
  updatePlaceholdersInPrompt: (oldName: string, newName: string) => void;
}

/**
 * Type for additional helper parameters
 */
export interface AdditionalHelperParams {
  placeholders: Placeholder[];
  addRandomColor: (name: string) => void;
  insertTag: (name: string, position: number) => number;
  updateFunc: (oldName: string, newName: string) => void;
}

/**
 * Type for insert helper parameters
 */
export interface InsertHelperParams {
  placeholders: Placeholder[];
  addFunc: (name: string) => void;
  insertFunc: (name: string, position: number) => number;
}

/**
 * Type for helper hooks return value
 */
export type HelperHooksReturn =
  Omit<UsePlaceholderHelpersReturn, 'cursorPosition' | 'setCursorPosition' | 'handleInsertPlaceholderAtPosition'>;

/**
 * Type for position handler return value
 */
export type PositionHandlerReturn = (name: string, position: number) => number;

/**
 * Create the complete return object for the hook
 * @param {number} cursorPosition Current cursor position
 * @param {React.Dispatch<React.SetStateAction<number>>} setCursorPosition Position setter function
 * @param {HelperHooksReturn} helpers Helper functions
 * @param {PositionHandlerReturn} positionHandler Position handler function
 * @returns {UsePlaceholderHelpersReturn} Complete helper return object
 */
export function createReturnObject(
  cursorPosition: number, setCursorPosition: React.Dispatch<React.SetStateAction<number>>,
  helpers: HelperHooksReturn, positionHandler: PositionHandlerReturn
): UsePlaceholderHelpersReturn {
  return { cursorPosition, setCursorPosition, ...helpers, handleInsertPlaceholderAtPosition: positionHandler };
}
