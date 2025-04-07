/**
 * Helper hooks for Index page
 *
 * @module hooks/useIndexHooksHelpers
 */
import { useClipboard } from '@/hooks/useClipboard';
import { usePlaceholderHelpers } from '@/hooks/usePlaceholderHelpers';
import { useCoreHooks } from './useIndexHooksCore';

/**
 * Initializes placeholder helper hooks
 * @param {ReturnType<typeof useCoreHooks>} core Core hooks
 * @returns Placeholder helper hooks
 */
export function usePlaceholderHelperHooks(
  core: ReturnType<typeof useCoreHooks>
): ReturnType<typeof useClipboard> & Pick<ReturnType<typeof usePlaceholderHelpers>, 'handleInsertPlaceholderAtPosition' | 'handlePlaceholderNameChange' | 'showInsertionToast'> {
  return {
    ...useClipboardHooks(core),
    ...usePlaceholderHelperFunctions(core)
  };
}

/**
 * Initializes clipboard hooks
 * @param {ReturnType<typeof useCoreHooks>} core Core hooks
 * @returns Clipboard hooks
 */
function useClipboardHooks(core: ReturnType<typeof useCoreHooks>): ReturnType<typeof useClipboard> {
  const clipboard = useClipboard(core.copyToClipboard);
  return { handleCopy: clipboard.handleCopy };
}

/**
 * Initializes placeholder helper functions
 * @param {ReturnType<typeof useCoreHooks>} core Core hooks
 * @returns Placeholder helper functions
 */
function usePlaceholderHelperFunctions(core: ReturnType<typeof useCoreHooks>): Pick<ReturnType<typeof usePlaceholderHelpers>, 'handleInsertPlaceholderAtPosition' | 'handlePlaceholderNameChange' | 'showInsertionToast'> {
  const helpers = usePlaceholderHelpers(core);
  return {
    handleInsertPlaceholderAtPosition: helpers.handleInsertPlaceholderAtPosition,
    handlePlaceholderNameChange: helpers.handlePlaceholderNameChange,
    showInsertionToast: helpers.showInsertionToast
  };
}
