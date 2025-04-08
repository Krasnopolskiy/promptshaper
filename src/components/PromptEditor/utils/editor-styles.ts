import { Placeholder } from '@/types';

/**
 * Creates the base editor styles
 * @returns {string} CSS styles as a string
 */
export function createEditorStyles(): string {
  return `
    .w-tc-editor {
      --color-prettylights-syntax-comment: #6a737d;
      --color-prettylights-syntax-constant: #005cc5;
      --color-prettylights-syntax-entity: #6f42c1;
      --color-prettylights-syntax-storage-modifier-import: #24292e;
      --color-prettylights-syntax-keyword: #d73a49;
      --color-prettylights-syntax-string: #032f62;
      --color-prettylights-syntax-variable: #e36209;
      --bg-color: var(--background);
      border-radius: 0.5rem;
      min-height: 200px;
    }

    .w-tc-editor-text {
      color: var(--foreground);
      background-color: var(--background);
    }

    .w-tc-editor-preview {
      color: var(--foreground);
      background-color: var(--background);
    }
  `;
}

/**
 * Creates styles for placeholder highlighting
 * @param {Placeholder[]} placeholders - Array of placeholders
 * @returns {string} CSS styles as a string
 */
export function createPlaceholderStyles(placeholders: Placeholder[]): string {
  const styles = placeholders.map(placeholder => {
    return `
      .placeholder-${placeholder.id} {
        background-color: ${placeholder.color}20;
        border-radius: 0.25rem;
        padding: 0.125rem 0.25rem;
        color: ${placeholder.color};
        font-weight: 500;
      }
    `;
  });

  return styles.join('\n');
}
