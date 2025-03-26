/**
 * Toast Type Definitions
 *
 * Defines types for the toast notification system.
 *
 * @module hooks/toast/toast-types
 */
import type {ToastActionElement, ToastProps} from '@/components/ui/toast';

/**
 * Toast notification with additional properties
 */
export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

/**
 * Toast without ID (used when creating new toasts)
 */
export type Toast = Omit<ToasterToast, 'id'>;

/**
 * Available action types for toast state management
 */
export const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

export type ActionType = typeof actionTypes;

/**
 * Actions that can be performed on toasts
 */
export type Action =
  | {
  type: ActionType['ADD_TOAST'];
  toast: ToasterToast;
}
  | {
  type: ActionType['UPDATE_TOAST'];
  toast: Partial<ToasterToast>;
}
  | {
  type: ActionType['DISMISS_TOAST'];
  toastId?: ToasterToast['id'];
}
  | {
  type: ActionType['REMOVE_TOAST'];
  toastId?: ToasterToast['id'];
};

/**
 * Application state interface for toast system
 */
export interface State {
  toasts: ToasterToast[];
}
