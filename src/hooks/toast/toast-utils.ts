/**
 * Toast Utility Functions
 *
 * Helper functions for managing toast notifications.
 *
 * @module hooks/toast/toast-utils
 */
import {Action} from './toast-types';

export const TOAST_REMOVE_DELAY = 1000000;

/**
 * Map of timeout IDs for toast removal
 */
export const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Adds a toast to the removal queue
 * @param toastId - ID of the toast to remove
 * @param dispatch - Dispatch function to trigger removal
 */
export function addToRemoveQueue(toastId: string, dispatch: (action: Action) => void) {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}
