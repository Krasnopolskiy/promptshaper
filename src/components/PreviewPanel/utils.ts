import {Placeholder} from '@/types';

/**
 * Escapes special characters in a string for use in regex
 * @param {string} string - The string to escape
 * @returns {string} The escaped string
 */
export const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} text - The text to escape
 * @returns {string} The HTML-escaped text
 */
export const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

/**
 * Process a tag-mode placeholder
 * @param {string} text - Text to process
 * @param {Placeholder} placeholder - Placeholder to apply
 * @returns {string} Processed text
 */
export const processTagModePlaceholder = (text: string, placeholder: Placeholder): string => {
  if (!placeholder.content) return text;
  const placeholderPattern = `<${escapeRegExp(placeholder.name)}>`;
  const placeholderRegex = new RegExp(placeholderPattern, 'g');
  if (!placeholderRegex.test(text)) return text;
  const openingTag = `<span class="text-primary font-mono">&lt;${escapeHtml(placeholder.name)}&gt;</span>`;
  const content = `<br/><span class="pl-4 border-l-2 border-primary/20 text-foreground whitespace-pre-wrap">${escapeHtml(placeholder.content)}</span><br/>`;
  const closingTag = `<span class="text-primary font-mono">&lt;/${escapeHtml(placeholder.name)}&gt;</span>`;
  return text.replace(placeholderRegex, () => `${openingTag}${content}${closingTag}`);
};

/**
 * Process a replace-mode placeholder
 * @param {string} text - Text to process
 * @param {Placeholder} placeholder - Placeholder to apply
 * @returns {string} Processed text
 */
export const processReplacePlaceholder = (text: string, placeholder: Placeholder): string => {
  if (!placeholder.content) return text;

  const placeholderPattern = `<${escapeRegExp(placeholder.name)}>`;
  const placeholderRegex = new RegExp(placeholderPattern, 'g');

  return text.replace(
    placeholderRegex,
    `<span class="bg-primary/10 text-primary px-1 rounded">${escapeHtml(placeholder.content)}</span>`
  );
};

/**
 * Handle remaining unprocessed tags
 * @param {string} text - Text to process
 * @returns {string} Processed text
 */
export const processRemainingTags = (text: string): string => {
  return text.replace(
    /<([^<>]+)>/g,
    (match, p1) => `<span class="text-primary/70 font-mono">&lt;${escapeHtml(p1)}&gt;</span>`
  );
};

/**
 * Formats the content with syntax highlighting for placeholders
 * @param {string} text - The text to format
 * @param {Placeholder[]} placeholders - Array of placeholders to process
 * @returns {string} HTML-formatted text with placeholder highlighting
 */
export const formatContentWithSyntaxHighlighting = (text: string, placeholders: Placeholder[]): string => {
  let formattedText = text;
  placeholders.forEach(placeholder => {
    formattedText = placeholder.mode === 'tag'
      ? processTagModePlaceholder(formattedText, placeholder)
      : processReplacePlaceholder(formattedText, placeholder);
  });
  return processRemainingTags(formattedText);
};
