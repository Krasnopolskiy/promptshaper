/**
 * Expand effect utilities for placeholder cards
 *
 * @module components/placeholder/utils/expandUtils
 */
import React from 'react';
import { createInitialState } from './stateHandlers';
import { focusInputIfEditing, expandIfNeeded } from './stateHandlers';

/**
 * Creates expand handler
 * @param {boolean} isExpanded - Is card expanded
 * @param {React.Dispatch<React.SetStateAction<ReturnType<typeof createInitialState>>>} setState - State setter
 * @returns {Function} Expand handler
 */
function createExpandHandler(
  isExpanded: boolean,
  setState: React.Dispatch<React.SetStateAction<ReturnType<typeof createInitialState>>>
): (expanded: boolean) => void {
  return (expanded: boolean): void => {
    if (expanded && !isExpanded) {
      setState(prev => ({ ...prev, isExpanded: true }));
    }
  };
}

/**
 * Creates focus handler
 * @param {boolean} isEditing - Is card in editing mode
 * @param {React.RefObject<HTMLInputElement>} inputRef - Reference to input element
 * @returns {Function} Focus handler
 */
function createFocusHandler(
  isEditing: boolean,
  inputRef: React.RefObject<HTMLInputElement>
): () => void {
  return (): void => {
    if (isEditing) {
      focusInputIfEditing(inputRef, isEditing);
    }
  };
}

/**
 * Creates expand effect handler
 * @param {boolean} isExpanded - Is card expanded
 * @param {boolean} isEditing - Is card in editing mode
 * @param {React.Dispatch<React.SetStateAction<ReturnType<typeof createInitialState>>>} setState - State setter
 * @returns {Function} Expand effect handler
 */
function createExpandEffectHandler(
  isExpanded: boolean,
  isEditing: boolean,
  setState: React.Dispatch<React.SetStateAction<ReturnType<typeof createInitialState>>>
): () => void {
  const expandHandler = createExpandHandler(isExpanded, setState);
  return (): void => isExpanded && expandIfNeeded(isEditing, expandHandler);
}

/**
 * Creates expand effect handlers
 * @param {boolean} isEditing - Is card in editing mode
 * @param {boolean} isExpanded - Is card expanded
 * @param {React.RefObject<HTMLInputElement>} inputRef - Reference to input element
 * @param {React.Dispatch<React.SetStateAction<ReturnType<typeof createInitialState>>>} setState - State setter
 * @returns {Object} Expand effect handlers
 */
function createExpandEffectHandlers(
  isEditing: boolean,
  isExpanded: boolean,
  inputRef: React.RefObject<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<ReturnType<typeof createInitialState>>>
): { handleFocus: () => void; handleExpand: () => void } {
  const handleFocus = createFocusHandler(isEditing, inputRef);
  const handleExpand = createExpandEffectHandler(isExpanded, isEditing, setState);
  return { handleFocus, handleExpand };
}

/**
 * Creates expand effect
 * @param {Function} handleFocus - Focus handler
 * @param {Function} handleExpand - Expand handler
 * @returns {void}
 */
export function useExpandEffect(handleFocus: () => void, handleExpand: () => void): void {
  React.useEffect(() => {
    handleFocus();
    handleExpand();
  }, [handleFocus, handleExpand]);
}

/**
 * Hook for handling expand effect
 * @param {boolean} isEditing - Is card in editing mode
 * @param {boolean} isExpanded - Is card expanded
 * @param {React.RefObject<HTMLInputElement>} inputRef - Reference to input element
 * @param {React.Dispatch<React.SetStateAction<ReturnType<typeof createInitialState>>>} setState - State setter
 */
export function useExpandEffectWithHandlers(
  isEditing: boolean,
  isExpanded: boolean,
  inputRef: React.RefObject<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<ReturnType<typeof createInitialState>>>
): void {
  const { handleFocus, handleExpand } = createExpandEffectHandlers(isEditing, isExpanded, inputRef, setState);
  useExpandEffect(handleFocus, handleExpand);
}
