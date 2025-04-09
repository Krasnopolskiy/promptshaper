import { ToastFunction } from '@/utils/header-utils';
import { showToast } from '@/utils/header-utils';

/**
 * Executes the reset operation and shows a toast
 * @param {Object} params - Reset parameters
 * @param {() => void} [params.onReset] - Reset callback
 * @param {ToastFunction} params.toast - Toast function
 * @param {(isOpen: boolean) => void} params.setIsResetDialogOpen - Dialog state setter
 * @returns {void} No return value
 */
function executeReset(params: {
  onReset?: () => void;
  toast: ToastFunction;
  setIsResetDialogOpen: (isOpen: boolean) => void;
}): void {
  if (!params.onReset) return;
  params.onReset();
  params.setIsResetDialogOpen(false);
  showToast(params.toast, 'Reset successful', 'Your application has been reset to default settings.');
}

/**
 * Creates handlers for resetting the application
 * @param {Object} params - Handler parameters
 * @param {() => void} [params.onReset] - Reset callback
 * @param {ToastFunction} params.toast - Toast function
 * @param {(isOpen: boolean) => void} params.setIsResetDialogOpen - Dialog state setter
 * @returns {Object} Reset handlers
 */
export function createResetHandlers(params: {
  onReset?: () => void;
  toast: ToastFunction;
  setIsResetDialogOpen: (isOpen: boolean) => void;
}): { handleReset: () => void } {
  /**
   * Handles the reset action by calling the reset callback and showing a toast
   * @returns {void} No return value
   */
  const handleReset = (): void => executeReset(params);

  return { handleReset };
}
