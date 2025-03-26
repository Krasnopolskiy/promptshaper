/**
 * Toast Hook Module
 *
 * Provides toast notification functionality for the application.
 *
 * @module hooks/use-toast
 */
import * as React from 'react';
import {setToastDispatch, toastReducer} from './toast/toast-reducer';
import {Action, State, Toast, ToasterToast} from './toast/toast-types';

let listeners: Array<(state: State) => void> = [];
let memoryState: State = {toasts: []};

/**
 * Generates a unique ID for toasts
 * @returns A unique string ID
 */
function genId() {
  let count = 0;
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

/**
 * Dispatches an action to update the toast state
 * @param action - The action to dispatch
 */
function dispatch(action: Action) {
  memoryState = toastReducer(memoryState, action);
  listeners.forEach(listener => {
    listener(memoryState);
  });
}

// Set up the dispatch function for the toast reducer
setToastDispatch(dispatch);

/**
 * Creates a toast notification
 * @param props - Toast properties
 * @returns Object with toast ID and methods to update or dismiss it
 */
function toast({...props}: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: {...props, id},
    });

  const dismiss = () => dispatch({type: 'DISMISS_TOAST', toastId: id});

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: open => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

/**
 * React hook for using toast notifications
 * @returns Object with toast state and methods
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({type: 'DISMISS_TOAST', toastId}),
  };
}

export {useToast, toast};
export type {ToasterToast};
