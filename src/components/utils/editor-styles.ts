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
 * Creates the base editor styles
 * @returns String containing CSS styles for the editor
 */
export function createEditorStyles(): string {
  return `
  .w-tc-editor {
    background: transparent !important;
    font-variant-ligatures: none;
  }
  .w-tc-editor-text > div {
    font-family: inherit !important;
  }
  .w-tc-editor-text {
    color: inherit !important;
  }
  .w-tc-editor-preview {
    word-break: break-word !important;
  }
  .w-tc-editor-text span {
    color: inherit !important;
  }
  .w-tc-editor [data-placeholder] {
    font-weight: 500;
  }
  `;
}

/**
 * Creates CSS styles for placeholders
 * @param placeholders - Array of placeholder objects
 * @returns String containing CSS styles for placeholders
 */
export function createPlaceholderStyles(placeholders: Placeholder[]): string {
  let styles = '';

  placeholders.forEach(placeholder => {
    const placeholderStyle = `
    .placeholder-${placeholder.id} {
      color: ${placeholder.color} !important;
      background-color: ${placeholder.color}10 !important;
      border: 1px solid ${placeholder.color}30;
      border-radius: 4px;
      padding: 2px 4px;
      margin: 0 1px;
      font-weight: 500;
    }
    `;
    styles += placeholderStyle;
  });

  return styles;
}
