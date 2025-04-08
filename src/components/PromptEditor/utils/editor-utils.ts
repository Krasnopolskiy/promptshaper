import { Placeholder } from '@/types';

/**
 * Configuration for placeholder insertion
 * @interface PlaceholderInsertionConfig
 */
export interface PlaceholderInsertionConfig {
  /** Placeholder name */
  name: string;
  /** Reference to the textarea element */
  textareaRef: HTMLTextAreaElement | null;
  /** Current value of the editor */
  value: string;
  /** Callback for value changes */
  onChange: (value: string) => void;
  /** Optional callback for when a placeholder is inserted */
  onInsertPlaceholder?: (name: string, position: number) => number;
}

/**
 * Configuration for placeholder processing
 * @interface PlaceholderProcessingConfig
 */
export interface PlaceholderProcessingConfig {
  /** Text to process */
  text: string;
  /** Array of placeholders */
  placeholders: Placeholder[];
  /** Optional callback for when a placeholder is inserted */
  onInsertPlaceholder?: (name: string, position: number) => number;
}

/**
 * Insert a placeholder at the current cursor position
 * @param {PlaceholderInsertionConfig} config - Configuration for the insertion
 */
export function insertPlaceholderAtCursor(config: PlaceholderInsertionConfig): void {
  const { name, textareaRef, value, onChange, onInsertPlaceholder } = config;

  if (!textareaRef) return;

  const placeholder = `<${name}>`;
  const { selectionStart, selectionEnd } = textareaRef;

  // Insert the placeholder at the cursor position
  const newValue = value.substring(0, selectionStart) +
    placeholder +
    value.substring(selectionEnd);

  onChange(newValue);

  // Call the callback if provided
  if (onInsertPlaceholder) {
    onInsertPlaceholder(name, selectionStart);
  }

  // Set focus back to the editor after a small delay
  setTimeout(() => {
    if (textareaRef) {
      textareaRef.focus();
      const newCursorPos = selectionStart + placeholder.length;
      textareaRef.setSelectionRange(newCursorPos, newCursorPos);
    }
  }, 0);
}

/**
 * Process placeholders in the text
 * @param {PlaceholderProcessingConfig} _config - Configuration for processing (unused for now)
 */
export function processPlaceholders(_config: PlaceholderProcessingConfig): void {
  // This is a placeholder for future implementation
  // Could be used for real-time validation, formatting, etc.
}

/**
 * Sets up a mutation observer to apply styling to placeholder elements
 * @param {Placeholder[]} _placeholders - Array of placeholders (unused for now)
 * @returns {MutationObserver} The created observer
 */
export function setupPlaceholderStylingObserver(_placeholders: Placeholder[]): MutationObserver {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        // Handle DOM changes that might affect placeholders
      }
    });
  });

  // Start observing the document
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  return observer;
}
