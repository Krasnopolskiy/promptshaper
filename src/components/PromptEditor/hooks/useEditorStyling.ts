import { useEffect } from 'react';
import { Placeholder } from '@/types';
import { createEditorStyles, createPlaceholderStyles } from '../utils/editor-styles';
import { setupPlaceholderStylingObserver } from '../utils/editor-utils';

/**
 * Hook to handle editor styling and placeholder highlighting
 * @param {Placeholder[]} placeholders - Array of placeholders
 */
export function useEditorStyling(placeholders: Placeholder[]): void {
  // Add editor and placeholder styles to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = createEditorStyles();
    document.head.appendChild(styleElement);

    const placeholderStyles = createPlaceholderStyles(placeholders);
    styleElement.textContent += placeholderStyles;

    return function cleanup(): void {
      document.head.removeChild(styleElement);
    };
  }, [placeholders]);

  // Apply styling to placeholder elements in the editor
  useEffect(() => {
    const observer = setupPlaceholderStylingObserver(placeholders);
    return function cleanup(): void {
      observer.disconnect();
    };
  }, [placeholders]);
}
