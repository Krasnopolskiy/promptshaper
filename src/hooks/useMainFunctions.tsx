/**
 * Hook for main function handlers
 *
 * Provides functions for handling placeholder insertion, copying prompt, and resetting app state
 *
 * @module hooks/useMainFunctions
 */
import {
  useInsertPlaceholderHandler as useInsertHandler,
  useCopyHandler,
  useResetHandler
} from './useMainFunctionsUtils';
import type { UseMainFunctionsOptions, UseMainFunctionsResult } from './useMainFunctionsTypes';

/**
 * Hook for main function handlers
 *
 * @param {object} options - Options for the hook
 * @returns {UseMainFunctionsResult} Handlers for insertions, copying, and resetting
 */
export function useMainFunctions(options: UseMainFunctionsOptions): UseMainFunctionsResult {
  const handleInsertPlaceholderFromPanel = useInsertHandler(options);
  const handleCopyFullPrompt = useCopyHandler(options);
  const handleReset = useResetHandler(options);

  return {
    handleInsertPlaceholderFromPanel,
    handleCopyFullPrompt,
    handleReset
  };
}

// For backward compatibility
export default useMainFunctions;
