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
 * Select and execute copy command on textarea
 * @param {HTMLTextAreaElement} textArea Textarea element
 * @returns {boolean} Success status
 */
export function executeCopyCommand(textArea: HTMLTextAreaElement): boolean {
  textArea.focus();
  textArea.select();
  return document.execCommand('copy');
}

/**
 * Remove textarea after fallback copy
 * @param {HTMLTextAreaElement} textArea Textarea element
 */
export function removeCopyTextarea(textArea: HTMLTextAreaElement): void {
  document.body.removeChild(textArea);
}

/**
 * Simple fallback clipboard copy
 * @param {string} text Text to copy
 * @returns {boolean} Success status
 */
export function clipboardFallbackCopy(text: string): boolean {
  try {
    const textArea = createCopyTextarea(text);
    const result = executeCopyCommand(textArea);
    removeCopyTextarea(textArea);
    return result;
  } catch {
    return false;
  }
}
