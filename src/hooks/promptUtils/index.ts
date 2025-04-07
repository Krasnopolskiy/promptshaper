import { Placeholder } from '@/types';

/**
 * Helper function to escape special characters in regex
 * @param {string} string String to escape
 * @returns {string} Escaped string
 */
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Helper function to replace placeholder tags with content
 * @param {string} text Text to replace in
 * @param {Placeholder} placeholder Placeholder to use
 * @param {boolean} isTagMode Whether to use tag mode
 * @returns {string} Text with replaced placeholders
 */
export function replacePlaceholderInText(text: string, placeholder: Placeholder, isTagMode: boolean): string {
  const regex = new RegExp(`<${escapeRegExp(placeholder.name)}>`, 'g');

  if (isTagMode && placeholder.content) {
    return text.replace(regex, `<${placeholder.name}>\n${placeholder.content}\n</${placeholder.name}>`);
  } else if (placeholder.content) {
    return text.replace(regex, placeholder.content);
  }
  return text;
}

/**
 * Load prompt text from storage
 * @returns {string} The saved prompt text or empty string
 */
export function loadPromptText(): string {
  const saved = localStorage.getItem('promptGenerator_prompt');
  return saved || '';
}

/**
 * Save prompt text to storage
 * @param {string} text - Text to save
 */
export function savePromptText(text: string): void {
  localStorage.setItem('promptGenerator_prompt', text);
}

/**
 * Clear prompt text from storage
 */
export function clearPromptText(): void {
  localStorage.removeItem('promptGenerator_prompt');
}

/**
 * Simple clipboard copy with API
 * @param {string} text Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function clipboardApiCopy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Create textarea for fallback copy
 * @param {string} text Text to copy
 * @returns {HTMLTextAreaElement} Textarea element
 */
export function createCopyTextarea(text: string): HTMLTextAreaElement {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  return textArea;
}

/**
 * Remove textarea after fallback copy
 * @param {HTMLTextAreaElement} textArea Textarea element
 */
export function removeCopyTextarea(textArea: HTMLTextAreaElement): void {
  document.body.removeChild(textArea);
}

/**
 * Perform fallback copy operation
 * @param {HTMLTextAreaElement} textArea Textarea element
 * @returns {boolean} Success status
 */
function performFallbackCopy(textArea: HTMLTextAreaElement): boolean {
  textArea.focus();
  textArea.select();
  return document.execCommand('copy');
}

/**
 * Simple fallback clipboard copy
 * @param {string} text Text to copy
 * @returns {boolean} Success status
 */
export function clipboardFallbackCopy(text: string): boolean {
  try {
    const textArea = createCopyTextarea(text);
    const result = performFallbackCopy(textArea);
    removeCopyTextarea(textArea);
    return result;
  } catch {
    return false;
  }
}
