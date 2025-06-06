/**
 * Editor utility functions for working with placeholders
 *
 * @module components/utils/editor-utils
 */
import { Placeholder } from '@/types';

/**
 * Applies styling to placeholder elements when DOM changes
 * @param {Placeholder[]} placeholders - The placeholder configurations
 * @returns {void}
 */
function applyPlaceholderStyling(placeholders: Placeholder[]): void {
  const editorElements = document.querySelectorAll('.w-tc-editor-text');
  editorElements.forEach(editor => {
    stylePlaceholderElements(editor, placeholders);
  });
}

/**
 * Sets up a mutation observer to style placeholder elements
 * @param {Placeholder[]} placeholders - The placeholder configurations
 * @returns {MutationObserver} The configured mutation observer
 */
export function setupPlaceholderStylingObserver(placeholders: Placeholder[]): MutationObserver {
  const observer = new MutationObserver(() => setTimeout(() => applyPlaceholderStyling(placeholders), 10));
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => applyPlaceholderStyling(placeholders), 100);
  return observer;
}

/**
 * Applies placeholder style to a span element
 * @param {HTMLSpanElement} span - The span element
 * @param {Placeholder} placeholder - The placeholder configuration
 * @returns {void}
 */
function applyPlaceholderStyleToSpan(span: HTMLSpanElement, placeholder: Placeholder): void {
  if (placeholder) {
    applyPlaceholderStyle(span, placeholder.color);
  }
}

/**
 * Styles placeholder elements within the editor
 * @param {Element} editor - The editor element
 * @param {Placeholder[]} placeholders - The placeholder configurations
 * @returns {void}
 */
export function stylePlaceholderElements(editor: Element, placeholders: Placeholder[]): void {
  editor.querySelectorAll('span').forEach(span => {
    const match = (span.textContent || '').match(/<([^<>]+)>/);
    if (match) {
      const placeholder = placeholders.find(p => p.name === match[1]);
      applyPlaceholderStyleToSpan(span, placeholder);
    }
  });
}

/**
 * Applies styling to a placeholder span element
 * @param {HTMLSpanElement} span - The span element to style
 * @param {string} color - Color to apply
 * @returns {void}
 */
export function applyPlaceholderStyle(span: HTMLSpanElement, color: string): void {
  span.style.color = color;
  span.style.backgroundColor = `${color}10`;
  span.style.border = `1px solid ${color}30`;
  span.style.borderRadius = '4px';
  span.style.padding = '2px 4px';
  span.style.margin = '0 1px';
  span.style.fontWeight = '500';
}

/**
 * Configuration for placeholder processing
 */
export interface PlaceholderProcessingConfig {
  /** Text to process */
  text: string;
  /** List of placeholders */
  placeholders: Placeholder[];
  /** Callback for inserting placeholder */
  onInsertPlaceholder?: (name: string, position: number) => number;
}

/**
 * Finds placeholder occurrences in text
 * @param {string} text - Text to search
 * @returns {Array} Array of regex match results
 */
function findPlaceholderMatches(text: string): RegExpExecArray[] {
  const placeholderRegex = /<([^<>]+)>/g;
  const matches: RegExpExecArray[] = [];
  let match;

  while ((match = placeholderRegex.exec(text)) !== null) {
    matches.push(match);
  }

  return matches;
}

/**
 * Processes a single placeholder match
 * @param {RegExpExecArray} match - The regex match
 * @param {Set<string>} existingNames - Set of existing placeholder names
 * @param {Set<string>} foundNames - Set of found placeholder names
 * @param {Function|undefined} onInsertPlaceholder - Insert callback
 * @returns {void}
 */
function processPlaceholderMatch(
  match: RegExpExecArray,
  existingNames: Set<string>,
  foundNames: Set<string>,
  onInsertPlaceholder?: (name: string, position: number) => number
): void {
  const name = match[1];
  foundNames.add(name);
  if (!existingNames.has(name) && onInsertPlaceholder) onInsertPlaceholder(name, match.index);
}

/**
 * Processes new placeholders found in text
 * @param {RegExpExecArray[]} matches - Regex matches
 * @param {Set<string>} existingNames - Set of existing placeholder names
 * @param {Function|undefined} onInsertPlaceholder - Insert callback
 * @returns {Set<string>} Set of found placeholder names
 */
function processNewPlaceholders(
  matches: RegExpExecArray[],
  existingNames: Set<string>,
  onInsertPlaceholder?: (name: string, position: number) => number
): Set<string> {
  const foundNames = new Set<string>();
  matches.forEach(match => processPlaceholderMatch(match, existingNames, foundNames, onInsertPlaceholder));
  return foundNames;
}

/**
 * Gets removed placeholder names
 * @param {Set<string>} existingNames - Set of existing placeholder names
 * @param {Set<string>} foundNames - Set of found placeholder names
 * @param {Placeholder[]} placeholders - List of placeholders
 * @returns {string[]} Array of removed placeholder names
 */
function getRemovedPlaceholderNames(
  existingNames: Set<string>,
  foundNames: Set<string>,
  placeholders: Placeholder[]
): string[] {
  return [...existingNames].filter(
    name => !foundNames.has(name) && placeholders.find(p => p.name === name)?.content === ''
  );
}

/**
 * Processes removed placeholders
 * @param {Set<string>} existingNames - Set of existing placeholder names
 * @param {Set<string>} foundNames - Set of found placeholder names
 * @param {Placeholder[]} placeholders - List of placeholders
 * @param {Function|undefined} onInsertPlaceholder - Insert callback
 */
function processRemovedPlaceholders(
  existingNames: Set<string>,
  foundNames: Set<string>,
  placeholders: Placeholder[],
  onInsertPlaceholder?: (name: string, position: number) => number
): void {
  if (!onInsertPlaceholder) return;
  const removedNames = getRemovedPlaceholderNames(existingNames, foundNames, placeholders);
  removedNames.forEach(name => onInsertPlaceholder(name, -1));
}

/**
 * Processes placeholders in text to ensure they are valid
 * @param {PlaceholderProcessingConfig} config - Configuration for processing
 * @returns {void}
 */
export function processPlaceholders(config: PlaceholderProcessingConfig): void {
  const { text, placeholders, onInsertPlaceholder } = config;
  const existingNames = new Set(placeholders.map(p => p.name));

  // Find placeholders in text
  const matches = findPlaceholderMatches(text);

  // Process new placeholders
  const foundNames = processNewPlaceholders(matches, existingNames, onInsertPlaceholder);

  // Process removed placeholders
  processRemovedPlaceholders(existingNames, foundNames, placeholders, onInsertPlaceholder);
}

/**
 * Configuration for placeholder insertion
 */
export interface PlaceholderInsertionConfig {
  /** Placeholder name */
  name: string;
  /** Textarea reference */
  textareaRef: HTMLTextAreaElement | null;
  /** Current text value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Callback for inserting placeholder */
  onInsertPlaceholder?: (name: string, position: number) => number;
}

/**
 * Updates textarea selection
 * @param {HTMLTextAreaElement} textareaRef - The textarea reference
 * @param {number} position - The new cursor position
 * @returns {void}
 */
function updateTextareaSelection(textareaRef: HTMLTextAreaElement, position: number): void {
  textareaRef.focus();
  textareaRef.setSelectionRange(position, position);
}

/**
 * Updates textarea value and selection
 * @param {HTMLTextAreaElement} textareaRef - The textarea reference
 * @param {string} newValue - The new text value
 * @param {number} newPosition - The new cursor position
 * @param {Function} onChange - Change handler
 * @returns {void}
 */
function updateTextareaValue(
  textareaRef: HTMLTextAreaElement,
  newValue: string,
  newPosition: number,
  onChange: (value: string) => void
): void {
  onChange(newValue);
  requestAnimationFrame(() => updateTextareaSelection(textareaRef, newPosition));
}

/**
 * Inserts a placeholder at the current cursor position
 * @param {PlaceholderInsertionConfig} config - Configuration for insertion
 * @returns {void}
 */
export function insertPlaceholderAtCursor(config: PlaceholderInsertionConfig): void {
  const { name, textareaRef, value, onChange, onInsertPlaceholder } = config;
  if (!textareaRef) return;
  const start = textareaRef.selectionStart;
  const end = textareaRef.selectionEnd;
  const tag = `<${name}>`;
  const newValue = value.substring(0, start) + tag + value.substring(end);
  updateTextareaValue(textareaRef, newValue, start + tag.length, onChange);
  if (onInsertPlaceholder) onInsertPlaceholder(name, start);
}
