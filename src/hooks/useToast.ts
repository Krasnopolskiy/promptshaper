/**
 * Toast Hook Module
 *
 * Provides toast notification functionality for the application.
 *
 * @module hooks/useToast
 */
import * as React from 'react';
import {setToastDispatch, toastReducer} from './toast/toast-reducer';
import {Action, State, Toast, ToasterToast} from './toast/toast-types';

const listeners: ((state: State) => void)[] = [];
let memoryState: State = {toasts: []};

/**
 * Generates a unique ID for toasts
 * @returns {string} A unique string ID
 */
function genId(): string {
  let count = 0;
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

/**
 * Dispatches an action to update the toast state
 * @param {Action} action - The action to dispatch
 * @returns {void}
 */
function dispatch(action: Action): void {
  memoryState = toastReducer(memoryState, action);
  listeners.forEach(listener => {
    listener(memoryState);
  });
}

// Set up the dispatch function for the toast reducer
setToastDispatch(dispatch);

/**
 * Creates a toast update function
 * @param {string} id - Toast ID
 * @returns {(props: ToasterToast) => void} Update function
 */
function createUpdate(id: string): (props: ToasterToast) => void {
  return (props: ToasterToast): void => {
    dispatch({
      type: 'UPDATE_TOAST',
      toast: {...props, id},
    });
  };
}

/**
 * Creates a toast dismiss function
 * @param {string} id - Toast ID
 * @returns {() => void} Dismiss function
 */
function createDismiss(id: string): () => void {
  return (): void => {
    dispatch({type: 'DISMISS_TOAST', toastId: id});
  };
}

/**
 * Creates toast open change handler
 * @param {() => void} dismiss - Dismiss function
 * @returns {(open: boolean) => void} Open change handler
 */
function createOpenChange(dismiss: () => void): (open: boolean) => void {
  return (open: boolean): void => {
    if (!open) dismiss();
  };
}

/**
 * Creates the toast payload properties
 * @param {Toast} props - Toast properties
 * @param {string} id - Toast ID
 * @returns {Partial<ToasterToast>} Basic toast payload
 */
function createToastBase(
  props: Toast,
  id: string
): Partial<ToasterToast> {
  return {
    ...props,
    id,
    open: true,
  };
}

/**
 * Creates the toast payload
 * @param {Toast} props - Toast properties
 * @param {string} id - Toast ID
 * @param {(open: boolean) => void} onOpenChange - Open change handler
 * @returns {ToasterToast} Toast payload
 */
function createToastPayload(
  props: Toast,
  id: string,
  onOpenChange: (open: boolean) => void
): ToasterToast {
  const base = createToastBase(props, id);
  return { ...base, onOpenChange } as ToasterToast;
}

/**
 * Creates and adds a toast to the state
 * @param {Toast} props - Toast properties
 * @param {string} id - Toast ID
 * @param {() => void} dismiss - Dismiss function
 * @returns {void}
 */
function addToast(props: Toast, id: string, dismiss: () => void): void {
  const onOpenChange = createOpenChange(dismiss);
  const toast = createToastPayload(props, id, onOpenChange);
  dispatch({ type: 'ADD_TOAST', toast });
}

/**
 * Creates toast components
 * @param {string} id - Toast ID
 * @returns {{ dismiss: () => void; update: (props: ToasterToast) => void }} Toast functions
 */
function createToastFunctions(id: string): {
  dismiss: () => void;
  update: (props: ToasterToast) => void;
} {
  return {
    dismiss: createDismiss(id),
    update: createUpdate(id)
  };
}

/**
 * Creates a toast notification
 * @param {Toast} props - Toast properties
 * @returns {object} Object with toast ID and methods
 */
function toast(props: Toast): {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
} {
  const id = genId();
  const functions = createToastFunctions(id);

  addToast(props, id, functions.dismiss);

  return { id, ...functions };
}

/**
 * Add state setter to listeners
 * @param {React.Dispatch<React.SetStateAction<State>>} setState - State setter
 * @returns {void}
 */
function addStateListener(
  setState: React.Dispatch<React.SetStateAction<State>>
): void {
  listeners.push(setState);
}

/**
 * Remove state setter from listeners
 * @param {React.Dispatch<React.SetStateAction<State>>} setState - State setter
 * @returns {void}
 */
function removeStateListener(
  setState: React.Dispatch<React.SetStateAction<State>>
): void {
  const index = listeners.indexOf(setState);
  if (index > -1) {
    listeners.splice(index, 1);
  }
}

/**
 * Create cleanup function for state listener
 * @param {React.Dispatch<React.SetStateAction<State>>} setState - State setter
 * @returns {() => void} Cleanup function
 */
function createCleanup(
  setState: React.Dispatch<React.SetStateAction<State>>
): () => void {
  return (): void => {
    removeStateListener(setState);
  };
}

/**
 * Set up toast state listener effect
 * @param {React.Dispatch<React.SetStateAction<State>>} setState - State setter
 * @returns {void}
 */
function useToastListener(
  setState: React.Dispatch<React.SetStateAction<State>>
): void {
  React.useEffect(() => {
    addStateListener(setState);
    return createCleanup(setState);
  }, [setState]);
}

/**
 * Create toast dismiss function
 * @returns {(toastId?: string) => void} Dismiss function
 */
function createToastDismiss(): (toastId?: string) => void {
  return (toastId?: string): void => {
    dispatch({type: 'DISMISS_TOAST', toastId});
  };
}

/**
 * Creates dismiss function for the toast hook
 * @returns {(toastId?: string) => void} Dismiss function
 */
function createDismissForHook(): (toastId?: string) => void {
  return createToastDismiss();
}

/**
 * Creates the basic return properties
 * @param {ToasterToast[]} toasts - Toast components
 * @returns {object} Basic return object with toasts
 */
function createBasicReturnObject(toasts: ToasterToast[]): {
  toasts: ToasterToast[];
} {
  return { toasts };
}

/**
 * Creates the full return object for useToast
 * @param {ToasterToast[]} toasts - Toast components
 * @returns {object} Complete useToast return object
 */
function createToastReturnObject(toasts: ToasterToast[]): {
  toasts: ToasterToast[];
  toast: typeof toast;
  dismiss: (toastId?: string) => void;
} {
  const basic = createBasicReturnObject(toasts);
  const dismiss = createDismissForHook();
  return { ...basic, toast, dismiss };
}

/**
 * React hook for using toast notifications
 * @returns {object} Object with toast state and methods
 */
function useToast(): {
  toasts: ToasterToast[];
  toast: typeof toast;
  dismiss: (toastId?: string) => void;
} {
  const [state, setState] = React.useState<State>(memoryState);
  useToastListener(setState);

  return createToastReturnObject(state.toasts);
}

export {useToast, toast};
export type {ToasterToast};
