import { usePlaceholderHelpers } from '@/hooks/usePlaceholderHelpers';
import { useClipboard } from '@/hooks/useClipboard';
import { useCoreHooks } from './useCoreHooks';

/**
 * Helper method return type
 */
interface HelperMethods {
  handleInsertPlaceholderAtPosition: (name: string, position: number) => number;
  handlePlaceholderNameChange: (oldName: string, newName: string) => void;
  showInsertionToast: (name: string) => void;
}

/**
 * Extracts required placeholder helper methods
 *
 * @param {ReturnType<typeof usePlaceholderHelpers>} helpers - The helpers object
 * @returns {HelperMethods} Extracted helper methods
 */
function extractHelperMethods(helpers: ReturnType<typeof usePlaceholderHelpers>): HelperMethods {
  return {
    handleInsertPlaceholderAtPosition: helpers.handleInsertPlaceholderAtPosition,
    handlePlaceholderNameChange: helpers.handlePlaceholderNameChange,
    showInsertionToast: helpers.showInsertionToast
  };
}

/**
 * Return type for placeholder helpers
 */
interface PlaceholderHelpers extends HelperMethods {
  handleCopy: ReturnType<typeof useClipboard>['handleCopy'];
}

/**
 * Gets the clipboard handler
 *
 * @param {ReturnType<typeof useCoreHooks>} core - Core hooks
 * @returns {Object} Clipboard handler
 */
function useClipboardHandler(core: ReturnType<typeof useCoreHooks>): Pick<PlaceholderHelpers, 'handleCopy'> {
  const { handleCopy } = useClipboard(core.copyToClipboard);
  return { handleCopy };
}

/**
 * Initializes placeholder helper hooks
 *
 * @param {ReturnType<typeof useCoreHooks>} core - Core hooks
 * @returns {PlaceholderHelpers} Placeholder helper hooks
 */
export function usePlaceholderHelperHooks(core: ReturnType<typeof useCoreHooks>): PlaceholderHelpers {
  const clipboard = useClipboardHandler(core);
  const helpers = usePlaceholderHelpers(core);
  const extractedMethods = extractHelperMethods(helpers);

  return {
    ...clipboard,
    ...extractedMethods
  };
}
