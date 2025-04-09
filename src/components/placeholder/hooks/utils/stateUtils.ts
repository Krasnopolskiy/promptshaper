/**
 * State utility functions
 * @module components/placeholder/hooks/utils/stateUtils
 */
import React from 'react';

/**
 * Type for state hook tuple
 */
export type StateHook<T> = [T, React.Dispatch<React.SetStateAction<T>>];

/**
 * Type for all state values
 */
export type StateValues = {
  isEditing: StateHook<boolean>;
  isExpanded: StateHook<boolean>;
  newName: StateHook<string>;
  newContent: StateHook<string>;
  selectedColor: StateHook<string>;
  mode: StateHook<string>;
};

/**
 * Type for extracted state values
 */
export type ExtractedStateValues = {
  isEditing: boolean;
  isExpanded: boolean;
  newName: string;
  newContent: string;
  selectedColor: string;
  mode: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  setNewContent: React.Dispatch<React.SetStateAction<string>>;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
};

/**
 * Extract state value from hook
 * @param {StateHook<T>} hook - The state hook
 * @returns {T} The state value
 */
export function getValueFromHook<T>(hook: StateHook<T>): T {
  return hook[0];
}

/**
 * Extract state setter from hook
 * @param {StateHook<T>} hook - The state hook
 * @returns {React.Dispatch<React.SetStateAction<T>>} The state setter
 */
export function getSetterFromHook<T>(hook: StateHook<T>): React.Dispatch<React.SetStateAction<T>> {
  return hook[1];
}

/**
 * Extract basic state values
 * @param {StateValues} hooks - State hooks
 * @returns {Object} Basic state values
 */
export function getBasicStateValues(hooks: StateValues): {
  isEditing: boolean;
  isExpanded: boolean;
} {
  return {
    isEditing: getValueFromHook(hooks.isEditing),
    isExpanded: getValueFromHook(hooks.isExpanded)
  };
}

/**
 * Extract content state values
 * @param {StateValues} hooks - State hooks
 * @returns {Object} Content state values
 */
export function getContentStateValues(hooks: StateValues): {
  newName: string;
  newContent: string;
} {
  return {
    newName: getValueFromHook(hooks.newName),
    newContent: getValueFromHook(hooks.newContent)
  };
}

/**
 * Extract appearance state values
 * @param {StateValues} hooks - State hooks
 * @returns {Object} Appearance state values
 */
export function getAppearanceStateValues(hooks: StateValues): {
  selectedColor: string;
  mode: string;
} {
  return {
    selectedColor: getValueFromHook(hooks.selectedColor),
    mode: getValueFromHook(hooks.mode)
  };
}

/**
 * Extract basic state setters
 * @param {StateValues} hooks - State hooks
 * @returns {Object} Basic state setters
 */
export function getBasicStateSetters(hooks: StateValues): {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
} {
  return {
    setIsEditing: getSetterFromHook(hooks.isEditing),
    setIsExpanded: getSetterFromHook(hooks.isExpanded)
  };
}

/**
 * Extract content state setters
 * @param {StateValues} hooks - State hooks
 * @returns {Object} Content state setters
 */
export function getContentStateSetters(hooks: StateValues): {
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  setNewContent: React.Dispatch<React.SetStateAction<string>>;
} {
  return {
    setNewName: getSetterFromHook(hooks.newName),
    setNewContent: getSetterFromHook(hooks.newContent)
  };
}

/**
 * Extract appearance state setters
 * @param {StateValues} hooks - State hooks
 * @returns {Object} Appearance state setters
 */
export function getAppearanceStateSetters(hooks: StateValues): {
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
} {
  return {
    setSelectedColor: getSetterFromHook(hooks.selectedColor),
    setMode: getSetterFromHook(hooks.mode)
  };
}

/**
 * Combine all state values from extracted values
 * @param {Object} valuesObjects - Values objects to combine
 * @returns {ExtractedStateValues} Combined state values
 */
export function combineStateObjects(
  ...valuesObjects: Record<string, unknown>[]
): ExtractedStateValues {
  return Object.assign({}, ...valuesObjects) as ExtractedStateValues;
}

/**
 * Extract all state values from the hooks
 * @param {StateValues} hooks - State hooks
 * @returns {Object} All extracted values
 */
export function extractAllStateValues(hooks: StateValues): Record<string, unknown>[] {
  return [
    getBasicStateValues(hooks),
    getContentStateValues(hooks),
    getAppearanceStateValues(hooks)
  ];
}

/**
 * Extract all state setters from the hooks
 * @param {StateValues} hooks - State hooks
 * @returns {Object} All extracted setters
 */
export function extractAllStateSetters(hooks: StateValues): Record<string, unknown>[] {
  return [
    getBasicStateSetters(hooks),
    getContentStateSetters(hooks),
    getAppearanceStateSetters(hooks)
  ];
}

/**
 * Create complete state values from hooks
 * @param {StateValues} hooks - State hooks
 * @returns {ExtractedStateValues} Complete state values and setters
 */
export function createStateValues(hooks: StateValues): ExtractedStateValues {
  const values = extractAllStateValues(hooks);
  const setters = extractAllStateSetters(hooks);
  return combineStateObjects(...values, ...setters);
}

/**
 * Creates state hook tuple
 * @param {T} _initialValue - Initial value
 * @returns {StateHook<T>} State hook tuple
 */
export function createHookState<T>(_initialValue: T): StateHook<T> {
  // This is a helper function that would be used in a React component
  // When the function is actually used in a component, it will call useState
  // This is just a type signature for documentation purposes
  throw new Error('This function should only be called from a React component or hook');
}
