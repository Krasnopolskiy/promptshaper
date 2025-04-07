/**
 * Placeholder Helpers Utilities
 *
 * Factory functions for placeholder helpers
 */
import { useState } from 'react';
import { Placeholder } from '@/types';

/**
 * Interface for notification helpers
 */
interface NotificationHelpers {
  setMessage: (message: string) => void;
  handleReset: () => void;
  setResetting: (resetting: boolean) => void;
}

/**
 * Interface for handler functions
 */
interface HandlerFunctions {
  handleClear: () => void;
  handleRandomColors: () => void;
}

/**
 * Interface for basic helper return
 */
interface BasicHelperReturn {
  resetting: boolean;
  message: string;
  handleClear: () => void;
  handleRandomColors: () => void;
}

/**
 * Creates a handler for clearing placeholders
 * @param {NotificationHelpers} params - Helper parameters
 * @returns {() => void} The clear handler function
 */
const createClearHandler = (params: NotificationHelpers): () => void => {
  const { setMessage, handleReset, setResetting } = params;
  return () => {
    setResetting(true);
    handleReset();
    setMessage('Placeholders cleared');
    setResetting(false);
  };
};

/**
 * Creates a random colors handler function
 * @param {NotificationHelpers} params - Helper parameters
 * @returns {() => void} The random colors handler function
 */
const createRandomColorsHandler = (params: NotificationHelpers): () => void => {
  return () => params.setMessage('Random colors applied');
};

/**
 * Creates handlers for basic placeholder operations
 * @param {NotificationHelpers} params - Helper parameters
 * @returns {HandlerFunctions} The handlers
 */
export const createBasicHandlers = (params: NotificationHelpers): HandlerFunctions => {
  return {
    handleClear: createClearHandler(params),
    handleRandomColors: createRandomColorsHandler(params)
  };
};

/**
 * Creates a reset function for placeholders
 * @param {Function} setPlaceholders - Function to set placeholders
 * @returns {() => void} The reset function
 */
const createResetFunction = (
  setPlaceholders: (placeholders: Placeholder[]) => void
): () => void => {
  return () => setPlaceholders([]);
};

/**
 * Custom hook for creating the state for basic helper hook
 * @returns {[boolean, string, React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<React.SetStateAction<string>>]} State values and setters
 */
function useHelperState(): [
  boolean,
  string,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [resetting, setResetting] = useState(false);
  const [message, setMessage] = useState('');
  return [resetting, message, setResetting, setMessage];
}

/**
 * Creates helper parameters from state
 * @param {React.Dispatch<React.SetStateAction<string>>} setMessage - Message setter
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setResetting - Resetting state setter
 * @param {() => void} handleReset - Reset function
 * @returns {NotificationHelpers} Helper parameters
 */
function createHelperParamsFromState(
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setResetting: React.Dispatch<React.SetStateAction<boolean>>,
  handleReset: () => void
): NotificationHelpers {
  return { setMessage, handleReset, setResetting };
}

/**
 * Extracts state setters from state data
 * @param {[boolean, string, React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<React.SetStateAction<string>>]} stateData - State data
 * @returns {[React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<React.SetStateAction<string>>]} State setters
 */
function extractStateSetters(
  stateData: [boolean, string, React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<React.SetStateAction<string>>]
): [React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<React.SetStateAction<string>>] {
  return [stateData[2], stateData[3]];
}

/**
 * Creates the handler functions from state data
 * @param {[boolean, string, React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<React.SetStateAction<string>>]} stateData - State data
 * @param {() => void} handleReset - Reset function
 * @returns {HandlerFunctions} Handler functions
 */
function createHandlersFromState(
  stateData: [boolean, string, React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<React.SetStateAction<string>>],
  handleReset: () => void
): HandlerFunctions {
  const [setResetting, setMessage] = extractStateSetters(stateData);
  const params = createHelperParamsFromState(setMessage, setResetting, handleReset);
  return createBasicHandlers(params);
}

/**
 * Creates the return object for the basic helper hook
 * @param {boolean} resetting - Resetting state
 * @param {string} message - Message state
 * @param {HandlerFunctions} helpers - Handler functions
 * @returns {BasicHelperReturn} The basic helper return
 */
function createHelperReturn(
  resetting: boolean,
  message: string,
  helpers: HandlerFunctions
): BasicHelperReturn {
  return { resetting, message, ...helpers };
}

/**
 * Creates the basic helper hook function
 * @param {() => void} handleReset - Reset function
 * @returns {() => BasicHelperReturn} The basic helper hook
 */
function createBasicHelper(
  handleReset: () => void
): () => BasicHelperReturn {
  return function useBasicHelpers(): BasicHelperReturn {
    const stateData = useHelperState();
    const helpers = createHandlersFromState(stateData, handleReset);
    return createHelperReturn(stateData[0], stateData[1], helpers);
  };
}

/**
 * Factory function for creating basic placeholder helper hooks
 * @param {Function} setPlaceholders - Function to set placeholders
 * @returns {Function} A hook function that provides basic placeholder helpers
 */
export const useBasicHelpersFactory = (
  setPlaceholders: (placeholders: Placeholder[]) => void
): () => BasicHelperReturn => {
  const handleReset = createResetFunction(setPlaceholders);
  return createBasicHelper(handleReset);
};
