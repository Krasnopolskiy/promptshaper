/**
 * Placeholder Helpers Hook
 *
 * Custom hook providing additional placeholder utilities
 *
 * @module hooks/usePlaceholderHelpers
 */
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/useToast';
import { Placeholder } from '@/types';
import {
  findPlaceholderByName,
  executeDeletion,
  processAddOrInsert,
  processPosition,
  createPositionHandlerParams,
  getRandomColor,
  type PositionHandlerParams
} from './placeholderHelperUtils';
import {
  BasicHelperParams,
  HelperParams,
  AdditionalHelperParams,
  InsertHelperParams,
  HelperHooksReturn,
  createReturnObject
} from './placeholderHelperParams';

/**
 * Return type for the usePlaceholderHelpers hook
 */
export interface UsePlaceholderHelpersReturn {
  cursorPosition: number;
  setCursorPosition: (position: number) => void;
  addPlaceholderWithRandomColor: (name: string) => void;
  handlePlaceholderDeletion: (name: string) => number;
  handlePlaceholderAddOrInsert: (name: string, position: number) => number;
  handleInsertPlaceholderAtPosition: (name: string, position: number) => number;
  showInsertionToast: (name: string) => void;
  handlePlaceholderNameChange: (oldName: string, newName: string) => void;
}

/**
 * Create random color placeholder hook
 * @param {(name: string, content: string, color: string) => void} addPlaceholder Function to add
 * @returns {(name: string) => void} Add function
 */
function useRandomColorPlaceholder(
  addPlaceholder: (name: string, content: string, color: string) => void
): (name: string) => void {
  return useCallback((name: string): void => {
    addPlaceholder(name, '', getRandomColor());
  }, [addPlaceholder]);
}

/**
 * Create placeholder deletion hook
 * @param {Placeholder[]} placeholders Placeholders
 * @param {(id: string) => void} deletePlaceholder Deletion function
 * @returns {(name: string) => number} Deletion handler
 */
function usePlaceholderDeletion(
  placeholders: Placeholder[],
  deletePlaceholder: (id: string) => void
): (name: string) => number {
  return useCallback((name: string): number => {
    const placeholder = findPlaceholderByName(placeholders, name);
    executeDeletion(placeholder, deletePlaceholder);
    return -1;
  }, [placeholders, deletePlaceholder]);
}

/**
 * Create placeholder add or insert hook
 * @param {InsertHelperParams} params Hook parameters
 * @returns {(name: string, position: number) => number} Add or insert handler
 */
function usePlaceholderAddOrInsert(params: InsertHelperParams): (name: string, position: number) => number {
  return useCallback((name: string, position: number): number =>
    processAddOrInsert({
      placeholders: params.placeholders,
      addFunc: params.addFunc,
      insertFunc: params.insertFunc,
      name, position
    }), [params.placeholders, params.addFunc, params.insertFunc]);
}

/**
 * Create insertion position handler hook
 * @param {PositionHandlerParams} params Hook parameters
 * @returns {(name: string, position: number) => number} Position handler
 */
function useInsertionPositionHandler(params: PositionHandlerParams): (name: string, position: number) => number {
  const { setCursorPosition, handlePlaceholderDeletion, handlePlaceholderAddOrInsert } = params;

  return useCallback(
    (name: string, position: number): number => {
      setCursorPosition(position);
      return processPosition(position, name, handlePlaceholderDeletion, handlePlaceholderAddOrInsert);
    },
    [setCursorPosition, handlePlaceholderDeletion, handlePlaceholderAddOrInsert]
  );
}

/**
 * Create toast notification hook
 * @returns {(name: string) => void} Toast notification handler
 */
function useInsertionToast(): (name: string) => void {
  const { toast } = useToast();
  return useCallback((name: string): void => {
    toast({
      title: 'Placeholder inserted',
      description: `<${name}> has been added to your prompt.`,
    });
  }, [toast]);
}

/**
 * Create name change hook
 * @param {(oldName: string, newName: string) => void} updateFunc Update function
 * @returns {(oldName: string, newName: string) => void} Name change handler
 */
function usePlaceholderNameChange(
  updateFunc: (oldName: string, newName: string) => void
): (oldName: string, newName: string) => void {
  return useCallback((oldName: string, newName: string): void => {
    updateFunc(oldName, newName);
  }, [updateFunc]);
}

/**
 * Create basic helpers
 * @param {BasicHelperParams} params Helper parameters
 * @returns {Pick<UsePlaceholderHelpersReturn, 'addPlaceholderWithRandomColor' | 'handlePlaceholderDeletion'>} Basic helpers
 */
function useBasicHelpers(params: BasicHelperParams):
  Pick<UsePlaceholderHelpersReturn, 'addPlaceholderWithRandomColor' | 'handlePlaceholderDeletion'> {
  return {
    addPlaceholderWithRandomColor: useRandomColorPlaceholder(params.addPlaceholder),
    handlePlaceholderDeletion: usePlaceholderDeletion(params.placeholders, params.deletePlaceholder)
  };
}

/**
 * Create notification helpers
 * @param {(oldName: string, newName: string) => void} updateFunc Update function
 * @returns {Pick<UsePlaceholderHelpersReturn, 'showInsertionToast' | 'handlePlaceholderNameChange'>} Toast and change handlers
 */
function useNotificationHelpers(
  updateFunc: (oldName: string, newName: string) => void
): Pick<UsePlaceholderHelpersReturn, 'showInsertionToast' | 'handlePlaceholderNameChange'> {
  return {
    showInsertionToast: useInsertionToast(),
    handlePlaceholderNameChange: usePlaceholderNameChange(updateFunc)
  };
}

/**
 * Creates the parameters for placeholder add/insert
 * @param {AdditionalHelperParams} params Parameters for creating the handlers
 * @returns {InsertHelperParams} Insert helper parameters
 */
function createInsertHelperParams(params: AdditionalHelperParams): InsertHelperParams {
  return {
    placeholders: params.placeholders,
    addFunc: params.addRandomColor,
    insertFunc: params.insertTag
  };
}

/**
 * Create additional handler parameters object
 * @param {HelperParams} helperParams - Helper parameters
 * @param {Pick<UsePlaceholderHelpersReturn, 'addPlaceholderWithRandomColor'>} basicHelpers - Basic helper functions
 * @returns {AdditionalHelperParams} Additional helper parameters
 */
const createAdditionalParams = (
  helperParams: HelperParams,
  basicHelpers: Pick<UsePlaceholderHelpersReturn, 'addPlaceholderWithRandomColor'>
): AdditionalHelperParams => ({
  placeholders: helperParams.placeholders,
  addRandomColor: basicHelpers.addPlaceholderWithRandomColor,
  insertTag: helperParams.insertPlaceholderTag,
  updateFunc: helperParams.updatePlaceholdersInPrompt
});

/**
 * Generate additional placeholder handlers object
 * @param {(name: string, position: number) => number} addInsertHandler - Add/insert handler function
 * @param {Pick<UsePlaceholderHelpersReturn, 'showInsertionToast' | 'handlePlaceholderNameChange'>} notifications - Notification handlers
 * @returns {Pick<UsePlaceholderHelpersReturn, 'handlePlaceholderAddOrInsert' | 'showInsertionToast' | 'handlePlaceholderNameChange'>} Combined handlers
 */
function generateAdditionalHelpers(
  addInsertHandler: (name: string, position: number) => number,
  notifications: Pick<UsePlaceholderHelpersReturn, 'showInsertionToast' | 'handlePlaceholderNameChange'>
): Pick<UsePlaceholderHelpersReturn, 'handlePlaceholderAddOrInsert' | 'showInsertionToast' | 'handlePlaceholderNameChange'> {
  return {
    handlePlaceholderAddOrInsert: addInsertHandler,
    ...notifications
  };
}

/**
 * Custom Hook for creating additional placeholder handlers
 * @param {AdditionalHelperParams} params Parameter object
 * @returns {Pick<UsePlaceholderHelpersReturn, 'handlePlaceholderAddOrInsert' | 'showInsertionToast' | 'handlePlaceholderNameChange'>} Additional helpers
 */
function useAdditionalHelpers(params: AdditionalHelperParams):
  Pick<UsePlaceholderHelpersReturn, 'handlePlaceholderAddOrInsert' | 'showInsertionToast' | 'handlePlaceholderNameChange'> {
  const insertParams = createInsertHelperParams(params);
  const addHandler = usePlaceholderAddOrInsert(insertParams);
  const notifications = useNotificationHelpers(params.updateFunc);

  return generateAdditionalHelpers(addHandler, notifications);
}

/**
 * Create placeholder helper hooks
 * @param {HelperParams} params Helper parameters
 * @returns {HelperHooksReturn} Helper functions
 */
function useHelperHooks(params: HelperParams): HelperHooksReturn {
  const basicHelpers = useBasicHelpers(params);
  const additionalParams = createAdditionalParams(params, basicHelpers);
  const additionalHelpers = useAdditionalHelpers(additionalParams);
  return { ...basicHelpers, ...additionalHelpers };
}

/**
 * Creates position handling parameters
 * @param {HelperHooksReturn} helpers Helper functions
 * @param {React.Dispatch<React.SetStateAction<number>>} setCursorPosition Position setter
 * @returns {PositionHandlerParams} Position handler parameters
 */
function createPositionHandlingParams(
  helpers: HelperHooksReturn,
  setCursorPosition: React.Dispatch<React.SetStateAction<number>>
): PositionHandlerParams {
  return createPositionHandlerParams(
    setCursorPosition,
    helpers.handlePlaceholderDeletion,
    helpers.handlePlaceholderAddOrInsert
  );
}

/**
 * Hook for additional placeholder helper functions
 * @param {HelperParams} params Hook parameters
 * @returns {UsePlaceholderHelpersReturn} Helper functions for placeholders
 */
export function usePlaceholderHelpers(params: HelperParams): UsePlaceholderHelpersReturn {
  const [cursorPosition, setCursorPosition] = useState(0);
  const helpers = useHelperHooks(params);
  const positionParams = createPositionHandlingParams(helpers, setCursorPosition);
  const positionHandler = useInsertionPositionHandler(positionParams);
  return createReturnObject(cursorPosition, setCursorPosition, helpers, positionHandler);
}
