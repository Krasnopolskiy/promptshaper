/**
 * Toast Utility Functions
 *
 * Helper functions for managing toast notifications.
 *
 * @module hooks/toast/toast-utils
 */
import {Action, actionTypes} from './toast-types';

export const TOAST_REMOVE_DELAY = 1000000;

/**
 * Map of timeout IDs for toast removal
 */
export const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Creates a removal timeout for a toast
 * @param {string} toastId - ID of the toast to remove
 * @param {(action: Action) => void} dispatch - Dispatch function
 * @returns {ReturnType<typeof setTimeout>} The timeout handle
 */
function createToastRemovalTimeout(toastId: string, dispatch: (action: Action) => void): ReturnType<typeof setTimeout> {
  return setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);
}

/**
 * Adds a toast to the removal queue
 * @param {string} toastId - ID of the toast to remove
 * @param {(action: Action) => void} dispatch - Dispatch function to trigger removal
 * @returns {void}
 */
export function addToRemoveQueue(toastId: string, dispatch: (action: Action) => void): void {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = createToastRemovalTimeout(toastId, dispatch);
  toastTimeouts.set(toastId, timeout);
}
