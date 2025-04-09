import { useEffect } from 'react';
import { Placeholder } from '@/types';
import { createEditorStyles, createPlaceholderStyles } from '../utils/editor-styles';
import { setupPlaceholderStylingObserver } from '../utils/editor-utils';

/**
 * Sets up styles for the editor and placeholders
 * @param {Placeholder[]} placeholders - Array of placeholders to create styles for
 * @returns {() => void} Cleanup function to remove styles
 */
function setupEditorStyles(placeholders: Placeholder[]): () => void {
  const styleElement = document.createElement('style');
  styleElement.textContent = createEditorStyles() + createPlaceholderStyles(placeholders);
  document.head.appendChild(styleElement);
  return () => document.head.removeChild(styleElement);
}

/**
 * Sets up the observer for styling placeholder elements
 * @param {Placeholder[]} placeholders - Array of placeholders to observe
 * @returns {() => void} Cleanup function to disconnect the observer
 */
function setupObserver(placeholders: Placeholder[]): () => void {
  const observer = setupPlaceholderStylingObserver(placeholders);
  return () => observer.disconnect();
}

/**
 * Hook to handle editor styling and placeholder highlighting
 * @param {Placeholder[]} placeholders - Array of placeholders
 */
export function useEditorStyling(placeholders: Placeholder[]): void {
  useEffect(() => setupEditorStyles(placeholders), [placeholders]);
  useEffect(() => setupObserver(placeholders), [placeholders]);
}
