import { Placeholder } from '@/types';

/**
 * Creates editor syntax highlighting color variables
 * @returns {string} CSS color variables
 */
function createSyntaxColors(): string {
  return `--color-prettylights-syntax-comment:#6a737d;--color-prettylights-syntax-constant:#005cc5;` +
    `--color-prettylights-syntax-entity:#6f42c1;--color-prettylights-syntax-storage-modifier-import:#24292e;` +
    `--color-prettylights-syntax-keyword:#d73a49;--color-prettylights-syntax-string:#032f62;` +
    `--color-prettylights-syntax-variable:#e36209;`;
}

/**
 * Creates the base editor layout styles
 * @returns {string} CSS styles for layout
 */
function createLayoutStyles(): string {
  return `--bg-color:var(--background);border-radius:0.5rem;min-height:200px;`;
}

/**
 * Creates text editor styles
 * @returns {string} CSS for editor text areas
 */
function createTextStyles(): string {
  return `.w-tc-editor-text,.w-tc-editor-preview{color:var(--foreground);background-color:var(--background);}`;
}

/**
 * Creates the base editor styles
 * @returns {string} CSS styles as a string
 */
export function createEditorStyles(): string {
  return `.w-tc-editor{${createSyntaxColors()}${createLayoutStyles()}}${createTextStyles()}`;
}

/**
 * Creates style for a single placeholder
 * @param {Placeholder} placeholder - The placeholder to create style for
 * @returns {string} CSS style for the placeholder
 */
function createPlaceholderStyle(placeholder: Placeholder): string {
  return `.placeholder-${placeholder.id}{background-color:${placeholder.color}20;` +
    `border-radius:0.25rem;padding:0.125rem 0.25rem;color:${placeholder.color};font-weight:500;}`;
}

/**
 * Creates styles for placeholder highlighting
 * @param {Placeholder[]} placeholders - Array of placeholders
 * @returns {string} CSS styles as a string
 */
export function createPlaceholderStyles(placeholders: Placeholder[]): string {
  return placeholders.map(createPlaceholderStyle).join('');
}
