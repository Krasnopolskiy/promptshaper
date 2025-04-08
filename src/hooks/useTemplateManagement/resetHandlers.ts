import { ToastFunction } from '@/utils/header-utils';
import { showToast } from '@/utils/header-utils';

/**
 * Creates reset handlers
 * @param {Object} params - Parameters for reset handlers
 * @param {Function} params.onReset - Function to reset the application
 * @param {ToastFunction} params.toast - Toast notification function
 * @param {Function} params.setIsResetDialogOpen - Function to set reset dialog state
 * @returns {Object} Reset handlers
 */
export function createResetHandlers(params: {
  onReset?: () => void;
  toast: ToastFunction;
  setIsResetDialogOpen: (isOpen: boolean) => void;
}): { handleReset: () => void } {
  /**
   * Handles resetting the application
   * @returns {void}
   */
  const handleReset = (): void => {
    if (params.onReset) {
      params.onReset();
      params.setIsResetDialogOpen(false);
      showToast(
        params.toast,
        'Reset successful',
        'Your application has been reset to default settings.'
      );
    }
  };

  return { handleReset };
}
