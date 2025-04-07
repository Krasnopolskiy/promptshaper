import { useClipboard } from '@/hooks/useClipboard';
import { usePlaceholderHelpers } from '@/hooks/usePlaceholderHelpers';
import { CoreHooks } from '../core/coreHooks';

/**
 * Type for placeholder helper hooks
 */
export type PlaceholderHelperHooks = ReturnType<typeof useClipboard> & Pick<ReturnType<typeof usePlaceholderHelpers>, 'handleInsertPlaceholderAtPosition' | 'handlePlaceholderNameChange' | 'showInsertionToast'>;

/**
 * Initializes placeholder helper hooks
 * @param {CoreHooks} core Core hooks
 * @returns {PlaceholderHelperHooks} Helper hooks for placeholder management
 */
export function usePlaceholderHelperHooks(core: CoreHooks): PlaceholderHelperHooks {
  const { handleCopy } = useClipboard(core.copyToClipboard);
  const helpers = usePlaceholderHelpers(core);

  return {
    handleCopy,
    handleInsertPlaceholderAtPosition: helpers.handleInsertPlaceholderAtPosition,
    handlePlaceholderNameChange: helpers.handlePlaceholderNameChange,
    showInsertionToast: helpers.showInsertionToast
  };
}
