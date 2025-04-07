/**
 * Toast Reducer
 *
 * Handles state transitions for toast notifications.
 *
 * @module hooks/toast/toast-reducer
 */
import {Action, State, actionTypes, ToasterToast} from './toast-types';
import {addToRemoveQueue} from './toast-utils';

/**
 * Toast limit - maximum number of toasts to show at once
 */
export const TOAST_LIMIT = 1;

// Global dispatch function for toast actions

/**
 * Dispatch function for toast actions
 * @param {Action} _action - The action to dispatch
 * @returns {void}
 */
let dispatch = (_action: Action): void => {
};

/**
 * Sets the dispatch function for toast actions
 * @param {(action: Action) => void} dispatchFn - Dispatch function
 * @returns {void}
 */
export function setToastDispatch(dispatchFn: (action: Action) => void): void {
  dispatch = dispatchFn;
}

/**
 * Helper to add a toast to the removal queue with the current dispatch
 * @param {string} toastId - ID of the toast to remove
 * @returns {void}
 */
function addToastToRemoveQueue(toastId: string): void {
  addToRemoveQueue(toastId, dispatch);
}

/**
 * Maps a toast to update its open state
 * @param {ToasterToast} toast - The toast to update
 * @param {string | undefined} toastId - ID of toast to dismiss
 * @returns {ToasterToast} Updated toast
 */
function mapToastOpenState(toast: ToasterToast, toastId: string | undefined): ToasterToast {
  if (toast.id === toastId || toastId === undefined) {
    return {
      ...toast,
      open: false,
    };
  }
  return toast;
}

/**
 * Updates toast open state during dismissal
 * @param {State} state - Current state
 * @param {string | undefined} toastId - ID of toast to dismiss
 * @returns {State} Updated state
 */
function updateToastOpenState(state: State, toastId: string | undefined): State {
  return {
    ...state,
    toasts: state.toasts.map(t => mapToastOpenState(t, toastId)),
  };
}

/**
 * Processes dismissal notifications for toasts
 * @param {State} state - Current state
 * @param {string | undefined} toastId - ID of toast to dismiss
 * @returns {void}
 */
function processDismissalNotifications(state: State, toastId: string | undefined): void {
  if (toastId) {
    addToastToRemoveQueue(toastId);
  } else {
    state.toasts.forEach(toast => {
      addToastToRemoveQueue(toast.id);
    });
  }
}

/**
 * Handles the DISMISS_TOAST action
 * @param {State} state - Current state
 * @param {{ type: typeof actionTypes['DISMISS_TOAST']; toastId?: string }} action - Dismiss toast action
 * @param {typeof actionTypes['DISMISS_TOAST']} action.type - Action type
 * @param {string} [action.toastId] - Toast ID to dismiss
 * @returns {State} New state
 */
function handleDismissToast(state: State, action: { type: typeof actionTypes['DISMISS_TOAST']; toastId?: string }): State {
  const {toastId} = action;

  // Process notifications
  processDismissalNotifications(state, toastId);

  // Update toast open state
  return updateToastOpenState(state, toastId);
}

/**
 * Handles removing all toasts
 * @param {State} state - Current state
 * @returns {State} New state with all toasts removed
 */
function removeAllToasts(state: State): State {
  return {
    ...state,
    toasts: [],
  };
}

/**
 * Handles removing a specific toast
 * @param {State} state - Current state
 * @param {string} toastId - ID of toast to remove
 * @returns {State} New state with specified toast removed
 */
function removeSpecificToast(state: State, toastId: string): State {
  return {
    ...state,
    toasts: state.toasts.filter(t => t.id !== toastId),
  };
}

/**
 * Handles the REMOVE_TOAST action
 * @param {State} state - Current state
 * @param {{ type: typeof actionTypes['REMOVE_TOAST']; toastId?: string }} action - Remove toast action
 * @param {typeof actionTypes['REMOVE_TOAST']} action.type - Action type
 * @param {string} [action.toastId] - Toast ID to remove
 * @returns {State} New state
 */
function handleRemoveToast(state: State, action: { type: typeof actionTypes['REMOVE_TOAST']; toastId?: string }): State {
  if (action.toastId === undefined) {
    return removeAllToasts(state);
  }
  return removeSpecificToast(state, action.toastId);
}

/**
 * Handles the ADD_TOAST action
 * @param {State} state - Current state
 * @param {{ type: typeof actionTypes['ADD_TOAST']; toast: ToasterToast }} action - Add toast action
 * @param {typeof actionTypes['ADD_TOAST']} action.type - Action type
 * @param {ToasterToast} action.toast - Toast to add
 * @returns {State} New state
 */
function handleAddToast(state: State, action: { type: typeof actionTypes['ADD_TOAST']; toast: ToasterToast }): State {
  return {
    ...state,
    toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
  };
}

/**
 * Handles the UPDATE_TOAST action
 * @param {State} state - Current state
 * @param {{ type: typeof actionTypes['UPDATE_TOAST']; toast: Partial<ToasterToast> }} action - Update toast action
 * @param {typeof actionTypes['UPDATE_TOAST']} action.type - Action type
 * @param {Partial<ToasterToast>} action.toast - Toast data to update
 * @returns {State} New state
 */
function handleUpdateToast(state: State, action: { type: typeof actionTypes['UPDATE_TOAST']; toast: Partial<ToasterToast> }): State {
  return {
    ...state,
    toasts: state.toasts.map(t => (t.id === action.toast.id ? {...t, ...action.toast} : t)),
  };
}

/**
 * Handle ADD_TOAST and UPDATE_TOAST actions
 * @param {State} state - Current state
 * @param {Action} action - Action to handle
 * @returns {State} Updated state or null to continue processing
 */
function handleAddOrUpdateAction(state: State, action: Action): State | null {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return handleAddToast(state, action);
    case actionTypes.UPDATE_TOAST:
      return handleUpdateToast(state, action);
    default:
      return null;
  }
}

/**
 * Handle DISMISS_TOAST and REMOVE_TOAST actions
 * @param {State} state - Current state
 * @param {Action} action - Action to handle
 * @returns {State} Updated state or null to continue processing
 */
function handleDismissOrRemoveAction(state: State, action: Action): State | null {
  switch (action.type) {
    case actionTypes.DISMISS_TOAST:
      return handleDismissToast(state, action);
    case actionTypes.REMOVE_TOAST:
      return handleRemoveToast(state, action);
    default:
      return null;
  }
}

/**
 * Try to handle action with a specific handler
 * @param {State} state - Current state
 * @param {Action} action - Action to handle
 * @param {Function} handler - Handler function to try
 * @returns {State|null} Updated state or null
 */
function tryHandler(
  state: State,
  action: Action,
  handler: (state: State, action: Action) => State | null
): State | null {
  return handler(state, action);
}

/**
 * Handle actions based on type
 * @param {State} state - Current state
 * @param {Action} action - Action to handle
 * @returns {State} Updated state
 */
function handleAction(state: State, action: Action): State {
  const result = tryHandler(state, action, handleAddOrUpdateAction) ||
                 tryHandler(state, action, handleDismissOrRemoveAction);

  return result || state;
}

/**
 * Reduces the current state based on the action
 * @param {State} state - Current state
 * @param {Action} action - Action to perform
 * @returns {State} New state
 */
export function toastReducer(state: State, action: Action): State {
  return handleAction(state, action);
}
