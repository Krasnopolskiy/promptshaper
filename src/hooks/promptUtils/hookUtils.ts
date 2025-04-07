/**
 * Utilities for creating hook sections
 */
import { UsePromptReturn } from '../usePrompt';

/**
 * Type for state object
 */
type StateObject = {
  promptText: string;
  handleSetPromptText: (text: string) => void;
  resetPromptText: () => void;
};

/**
 * Type for functions object
 */
type FunctionsObject = Pick<UsePromptReturn, 'insertPlaceholderTag' | 'updatePlaceholdersInPrompt'>;

/**
 * Type for generation object
 */
type GenerationObject = Pick<UsePromptReturn, 'generateFullPrompt' | 'generateCopyablePrompt'>;

/**
 * Type for clipboard object
 */
type ClipboardObject = {
  copyToClipboard: (text: string) => Promise<boolean>;
};

/**
 * Create state values
 * @param {Object} state State object
 * @param {string} state.promptText Current prompt text
 * @returns {Object} State values
 */
export function createStateValues(state: {
  promptText: string;
}): Pick<UsePromptReturn, 'promptText'> {
  return { promptText: state.promptText };
}

/**
 * Create state handlers
 * @param {Object} state State object
 * @param {Function} state.handleSetPromptText Function to set prompt text
 * @param {Function} state.resetPromptText Function to reset prompt text
 * @returns {Object} State handlers
 */
export function createStateHandlers(state: {
  handleSetPromptText: (text: string) => void;
  resetPromptText: () => void;
}): Pick<UsePromptReturn, 'setPromptText' | 'resetPromptText'> {
  return {
    setPromptText: state.handleSetPromptText,
    resetPromptText: state.resetPromptText,
  };
}

/**
 * Create state section
 * @param {StateObject} state State object
 * @returns {Object} State section
 */
export function createStateSection(
  state: StateObject
): Pick<UsePromptReturn, 'promptText' | 'setPromptText' | 'resetPromptText'> {
  return {
    ...createStateValues(state),
    ...createStateHandlers(state),
  };
}

/**
 * Create functions section
 * @param {FunctionsObject} functions Function object
 * @returns {Object} Functions section
 */
export function createFunctionsSection(
  functions: FunctionsObject
): FunctionsObject {
  return functions;
}

/**
 * Create generation section
 * @param {GenerationObject} generation Generation object
 * @returns {Object} Generation section
 */
export function createGenerationSection(
  generation: GenerationObject
): GenerationObject {
  return generation;
}

/**
 * Create clipboard section
 * @param {ClipboardObject} clipboard Clipboard object
 * @returns {Object} Clipboard section
 */
export function createClipboardSection(
  clipboard: ClipboardObject
): Pick<UsePromptReturn, 'copyToClipboard'> {
  return { copyToClipboard: clipboard.copyToClipboard };
}

/**
 * Create combined state and functions
 * @param {StateObject} state State object
 * @param {FunctionsObject} functions Function object
 * @returns {Pick<UsePromptReturn, 'promptText' | 'setPromptText' | 'resetPromptText' | 'insertPlaceholderTag' | 'updatePlaceholdersInPrompt'>} Combined state and functions
 */
function createStateAndFunctions(
  state: StateObject,
  functions: FunctionsObject
): Pick<UsePromptReturn, 'promptText' | 'setPromptText' | 'resetPromptText' | 'insertPlaceholderTag' | 'updatePlaceholdersInPrompt'> {
  return {
    ...createStateSection(state),
    ...createFunctionsSection(functions)
  };
}

/**
 * Create combined generation and clipboard
 * @param {GenerationObject} generation Generation object
 * @param {ClipboardObject} clipboard Clipboard object
 * @returns {Pick<UsePromptReturn, 'generateFullPrompt' | 'generateCopyablePrompt' | 'copyToClipboard'>} Combined generation and clipboard
 */
function createGenerationAndClipboard(
  generation: GenerationObject,
  clipboard: ClipboardObject
): Pick<UsePromptReturn, 'generateFullPrompt' | 'generateCopyablePrompt' | 'copyToClipboard'> {
  return {
    ...createGenerationSection(generation),
    ...createClipboardSection(clipboard)
  };
}

/**
 * Create combined hooks object
 * @param {StateObject} state State object
 * @param {FunctionsObject} functions Function object
 * @param {GenerationObject} generation Generation object
 * @param {ClipboardObject} clipboard Clipboard object
 * @returns {UsePromptReturn} Combined hook return
 */
export function createCombinedHooksObject(
  state: StateObject,
  functions: FunctionsObject,
  generation: GenerationObject,
  clipboard: ClipboardObject
): UsePromptReturn {
  const stateAndFunctions = createStateAndFunctions(state, functions);
  const generationAndClipboard = createGenerationAndClipboard(generation, clipboard);

  return { ...stateAndFunctions, ...generationAndClipboard };
}
