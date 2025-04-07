/**
 * Options for the useMainFunctions hook
 */
export interface UseMainFunctionsOptions {
  /** Whether the device is mobile */
  isMobile: boolean;
  /** Current prompt text */
  promptText: string;
  /** Current cursor position */
  cursorPosition: number;
  /** Function to insert placeholder tag */
  insertPlaceholderTag: (name: string, position: number) => number;
  /** Function to set active panel */
  setActivePanel: (panel: 'placeholders' | 'editor' | 'preview') => void;
  /** Function to show insertion toast */
  showInsertionToast: (name: string) => void;
  /** Function to copy text to clipboard */
  copyToClipboard: (text: string) => void;
  /** Function to show copy toast */
  showCopyToast: () => void;
  /** Function to reset prompt text */
  resetPromptText: () => void;
  /** Function to clear placeholders */
  clearPlaceholders: () => void;
  /** Function to reset panel sizes */
  resetPanelSizes: () => void;
  /** Function to set full prompt */
  setFullPrompt: (text: string) => void;
  /** Function to set copyable prompt */
  setCopyablePrompt: (text: string) => void;
  /** Function to copy content to clipboard */
  handleCopy: (content: string) => Promise<void>;
  /** Copyable prompt text */
  copyablePrompt: string;
}

/**
 * Result of the useMainFunctions hook
 */
export interface UseMainFunctionsResult {
  /** Handler for inserting placeholder from panel */
  handleInsertPlaceholderFromPanel: (name: string) => void;
  /** Handler for copying full prompt */
  handleCopyFullPrompt: () => Promise<void>;
  /** Handler for resetting the app */
  handleReset: () => void;
}
