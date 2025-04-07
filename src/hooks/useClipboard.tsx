/**
 * Clipboard Hook
 *
 * Custom hook for clipboard operations
 *
 * @module hooks/useClipboard
 */
import { useCallback } from 'react';
import { useToast } from '@/hooks/useToast';

/**
 * Creates toast options for success
 * @returns {object} Success toast options
 */
function createSuccessToastOptions(): object {
  return {
    title: 'Copied to clipboard',
    description: 'The full prompt has been copied to your clipboard.',
  };
}

/**
 * Creates toast options for failure
 * @returns {object} Failure toast options
 */
function createFailureToastOptions(): object {
  return {
    title: 'Copy failed',
    description: 'Failed to copy to clipboard. Please try again.',
    variant: 'destructive',
  };
}

/**
 * Creates toast callbacks
 * @param {Function} toast - Toast function
 * @returns {object} Toast callbacks
 */
function createToastCallbacks(toast: Function): {
  success: () => void;
  failure: () => void;
} {
  /**
   * Success callback
   * @returns {void}
   */
  const success = (): void => toast(createSuccessToastOptions());

  /**
   * Failure callback
   * @returns {void}
   */
  const failure = (): void => toast(createFailureToastOptions());

  return { success, failure };
}

/**
 * Process copy result
 * @param {boolean} success - Copy success status
 * @param {Function} onSuccess - Success callback
 * @param {Function} onFailure - Failure callback
 * @returns {void}
 */
function processCopyResult(
  success: boolean,
  onSuccess: Function,
  onFailure: Function
): void {
  if (success) onSuccess();
  else onFailure();
}

/**
 * Handle copy operation
 * @param {Function} copyFn - Copy function
 * @param {string} content - Content to copy
 * @param {Function} onSuccess - Success callback
 * @param {Function} onFailure - Failure callback
 * @returns {Promise<void>}
 */
async function handleCopyOperation(
  copyFn: (text: string) => Promise<boolean>,
  content: string,
  onSuccess: Function,
  onFailure: Function
): Promise<void> {
  const success = await copyFn(content);
  processCopyResult(success, onSuccess, onFailure);
}

/**
 * Create copy handler function
 * @param {(text: string) => Promise<boolean>} copyFn - Copy function
 * @param {() => void} onSuccess - Success handler
 * @param {() => void} onFailure - Failure handler
 * @returns {(content: string) => Promise<void>} Copy handler
 */
function createCopyHandler(
  copyFn: (text: string) => Promise<boolean>,
  onSuccess: () => void,
  onFailure: () => void
): (content: string) => Promise<void> {
  return async (content: string): Promise<void> => {
    await handleCopyOperation(copyFn, content, onSuccess, onFailure);
  };
}

/**
 * Gets callbacks for the clipboard handlers
 * @param {Function} toast - Toast function
 * @returns {object} Success and failure callbacks
 */
function getClipboardCallbacks(toast: Function): {
  success: () => void;
  failure: () => void;
} {
  return createToastCallbacks(toast);
}

/**
 * Create handler object with copy function
 * @param {(content: string) => Promise<void>} copyHandler - Copy handler function
 * @returns {{handleCopy: (content: string) => Promise<void>}} Handler object
 */
function createHandlerObject(
  copyHandler: (content: string) => Promise<void>
): { handleCopy: (content: string) => Promise<void> } {
  return { handleCopy: copyHandler };
}

/**
 * Creates copy handler from copyToClipboard and toast
 * @param {(text: string) => Promise<boolean>} copyFn - Copy function
 * @param {Function} toast - Toast function
 * @returns {(content: string) => Promise<void>} Copy handler
 */
function createHandlerFromFunctions(
  copyFn: (text: string) => Promise<boolean>,
  toast: Function
): (content: string) => Promise<void> {
  const { success, failure } = getClipboardCallbacks(toast);
  return createCopyHandler(copyFn, success, failure);
}

/**
 * Creates clipboard handlers
 * @param {object} params - Parameters object
 * @param {(text: string) => Promise<boolean>} params.copyToClipboard - Copy function
 * @param {Function} params.toast - Toast function
 * @returns {object} Clipboard handlers
 */
function setupClipboardHandlers({
  copyToClipboard,
  toast
}: {
  copyToClipboard: (text: string) => Promise<boolean>;
  toast: Function;
}): { handleCopy: (content: string) => Promise<void> } {
  const handler = createHandlerFromFunctions(copyToClipboard, toast);
  return createHandlerObject(handler);
}

/**
 * Hook for clipboard operations
 * @param {(text: string) => Promise<boolean>} copyToClipboard - Base function to copy content to clipboard
 * @returns {object} Helper functions for clipboard operations
 */
export function useClipboard(copyToClipboard: (text: string) => Promise<boolean>): {
  handleCopy: (content: string) => Promise<void>;
} {
  const { toast } = useToast();
  const handlers = useCallback(
    () => setupClipboardHandlers({ copyToClipboard, toast }),
    [copyToClipboard, toast]
  )();
  return handlers;
}
