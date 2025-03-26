/**
 * Toast Reducer
 *
 * Handles state transitions for toast notifications.
 *
 * @module hooks/toast/toast-reducer
 */
import {Action, State} from './toast-types';
import {addToRemoveQueue} from './toast-utils';

/**
 * Toast limit - maximum number of toasts to show at once
 */
export const TOAST_LIMIT = 1;

// Global dispatch function for toast actions
let dispatch = (action: Action) => {
};

/**
 * Sets the dispatch function for toast actions
 * @param dispatchFn - Dispatch function
 */
export function setToastDispatch(dispatchFn: (action: Action) => void) {
  dispatch = dispatchFn;
}

/**
 * Helper to add a toast to the removal queue with the current dispatch
 * @param toastId - ID of the toast to remove
 */
function addToastToRemoveQueue(toastId: string) {
  addToRemoveQueue(toastId, dispatch);
}

/**
 * Reduces the current state based on the action
 * @param state - Current state
 * @param action - Action to perform
 * @returns New state
 */
export function toastReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map(t => (t.id === action.toast.id ? {...t, ...action.toast} : t)),
      };

    case 'DISMISS_TOAST': {
      const {toastId} = action;

      // Handle dismissing one or all toasts
      if (toastId) {
        addToastToRemoveQueue(toastId);
      } else {
        state.toasts.forEach(toast => {
          addToastToRemoveQueue(toast.id);
        });
      }

      // Update open state of toasts
      return {
        ...state,
        toasts: state.toasts.map(t =>
          t.id === toastId || toastId === undefined
            ? {
              ...t,
              open: false,
            }
            : t
        ),
      };
    }

    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter(t => t.id !== action.toastId),
      };

    default:
      return state;
  }
}
