/**
 * Editor Styles Utilities
 *
 * Collection of utility functions for generating CSS styles for the code editor
 * and placeholder formatting.
 *
 * @module components/utils/editor-styles
 */
import {Placeholder} from '@/types';

/**
 * Creates the editor container styles
 * @returns {string} CSS styles for editor container
 */
function createEditorContainerStyles(): string {
  return `
  .w-tc-editor {
    background: transparent !important;
    font-variant-ligatures: none;
  }`;
}

/**
 * Creates the editor text container styles
 * @returns {string} CSS styles for editor text container
 */
function createEditorTextContainerStyles(): string {
  return `
  .w-tc-editor-text > div {
    font-family: inherit !important;
  }
  .w-tc-editor-text {
    color: inherit !important;
  }`;
}

/**
 * Creates the core editor base styles
 * @returns {string} CSS styles for editor core
 */
function createEditorCoreStyles(): string {
  return [
    createEditorContainerStyles(),
    createEditorTextContainerStyles()
  ].join('\n');
}

/**
 * Creates editor preview styles
 * @returns {string} CSS styles for editor preview
 */
function createEditorPreviewStyles(): string {
  return `
  .w-tc-editor-preview {
    word-break: break-word !important;
  }`;
}

/**
 * Creates editor span styles
 * @returns {string} CSS styles for editor spans
 */
function createEditorSpanStyles(): string {
  return `
  .w-tc-editor-text span {
    color: inherit !important;
  }`;
}

/**
 * Creates editor placeholder styles
 * @returns {string} CSS styles for editor placeholders
 */
function createEditorPlaceholderStyles(): string {
  return `
  .w-tc-editor [data-placeholder] {
    font-weight: 500;
  }`;
}

/**
 * Creates editor text and preview styles
 * @returns {string} CSS styles for editor text and preview
 */
function createEditorTextStyles(): string {
  return [
    createEditorPreviewStyles(),
    createEditorSpanStyles(),
    createEditorPlaceholderStyles()
  ].join('\n');
}

/**
 * Creates enhanced placeholder visibility styles
 * @returns {string} CSS styles for placeholder visibility
 */
function createPlaceholderVisibilityStyles(): string {
  return `
  /* Enhanced placeholder visibility */
  .w-tc-editor span[style*="color"] {
    display: inline-flex !important;
    align-items: center !important;
    border-radius: 4px !important;
    transition: all 0.2s ease !important;
  }`;
}

/**
 * Creates the base editor styles by combining multiple style sets
 * @returns {string} String containing CSS styles for the editor
 */
export function createEditorStyles(): string {
  return [
    createEditorCoreStyles(),
    createEditorTextStyles(),
    createPlaceholderVisibilityStyles()
  ].join('\n');
}

/**
 * Creates color-related styles for a placeholder
 * @param {Placeholder} placeholder - The placeholder object
 * @returns {string} CSS styles for placeholder coloring
 */
function createPlaceholderColorStyles(placeholder: Placeholder): string {
  return `
  color: ${placeholder.color} !important;
  background-color: ${placeholder.color}15 !important;
  border: 1px solid ${placeholder.color}30;`;
}

/**
 * Creates spacing styles for a placeholder
 * @returns {string} CSS styles for placeholder spacing
 */
function createPlaceholderSpacingStyles(): string {
  return `
  border-radius: 4px;
  padding: 2px 6px;
  margin: 0 2px;`;
}

/**
 * Creates visual effect styles for a placeholder
 * @returns {string} CSS styles for placeholder visual effects
 */
function createPlaceholderEffectStyles(): string {
  return `
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;`;
}

/**
 * Creates the CSS class for a specific placeholder
 * @param {Placeholder} placeholder - The placeholder object
 * @returns {string} CSS class definition for the placeholder
 */
function createPlaceholderClass(placeholder: Placeholder): string {
  return `
  .placeholder-${placeholder.id} {
    ${createPlaceholderColorStyles(placeholder)}
    ${createPlaceholderSpacingStyles()}
    ${createPlaceholderEffectStyles()}
  }`;
}

/**
 * Creates the hover state for a placeholder
 * @param {Placeholder} placeholder - The placeholder object
 * @returns {string} CSS hover state for the placeholder
 */
function createPlaceholderHoverState(placeholder: Placeholder): string {
  return `
  .placeholder-${placeholder.id}:hover {
    background-color: ${placeholder.color}25 !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }`;
}

/**
 * Creates the combined styles for a single placeholder
 * @param {Placeholder} placeholder - The placeholder object
 * @returns {string} Combined CSS styles for the placeholder
 */
function createSinglePlaceholderStyles(placeholder: Placeholder): string {
  return [
    createPlaceholderClass(placeholder),
    createPlaceholderHoverState(placeholder)
  ].join('\n');
}

/**
 * Creates CSS styles for placeholders
 * @param {Placeholder[]} placeholders - Array of placeholder objects with styling information
 * @returns {string} String containing CSS styles for placeholders
 */
export function createPlaceholderStyles(placeholders: Placeholder[]): string {
  return placeholders.map(createSinglePlaceholderStyles).join('\n');
}

/**
 * Sets color styling properties for a placeholder element
 * @param {HTMLSpanElement} span - The span element to style
 * @param {string} color - The color to apply
 * @returns {void}
 */
function setPlaceholderColorStyle(span: HTMLSpanElement, color: string): void {
  span.style.color = color;
  span.style.backgroundColor = `${color}15`;
  span.style.border = `1px solid ${color}30`;
}

/**
 * Sets spacing properties for a placeholder element
 * @param {HTMLSpanElement} span - The span element to style
 * @returns {void}
 */
function setPlaceholderSpacingStyle(span: HTMLSpanElement): void {
  span.style.borderRadius = '4px';
  span.style.padding = '2px 6px';
  span.style.margin = '0 2px';
}

/**
 * Sets basic styling properties for a placeholder element
 * @param {HTMLSpanElement} span - The span element to style
 * @param {string} color - The color to apply
 * @returns {void}
 */
function setBasicPlaceholderStyle(span: HTMLSpanElement, color: string): void {
  setPlaceholderColorStyle(span, color);
  setPlaceholderSpacingStyle(span);
}

/**
 * Sets advanced styling properties for a placeholder element
 * @param {HTMLSpanElement} span - The span element to style
 * @returns {void}
 */
function setAdvancedPlaceholderStyle(span: HTMLSpanElement): void {
  span.style.fontWeight = '500';
  span.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
  span.style.transition = 'all 0.2s ease';
}

/**
 * Applies a specific color styling to a placeholder element
 * @param {HTMLSpanElement} span - The span element to style
 * @param {string} color - The color to apply to the placeholder
 * @returns {void}
 */
export function applyPlaceholderColor(span: HTMLSpanElement, color: string): void {
  if (!span) return;

  setBasicPlaceholderStyle(span, color);
  setAdvancedPlaceholderStyle(span);
}
