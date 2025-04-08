/**
 * Header utility functions
 *
 * Helper functions for Header component
 *
 * @module utils/header-utils
 */
import { Placeholder } from '@/types';

/**
 * Toast function interface
 */
export interface ToastFunction {
  (props: { title: string; description: string; variant?: 'default' | 'destructive' }): void
}

/**
 * Checks if template name is empty
 * @param {string} templateName - Name to check
 * @returns {boolean} Whether name is empty
 */
export function isTemplateNameEmpty(templateName: string): boolean {
  return !templateName.trim();
}

/**
 * Shows error toast for empty template name
 * @param {Function} showToast - Function to show toast
 */
export function showEmptyNameError(
  showToast: (title: string, description: string, variant?: 'default' | 'destructive') => void
): void {
  showToast(
    'Name required',
    'Please enter a name for your template.',
    'destructive'
  );
}

/**
 * Validates template name
 * @param {string} templateName - Name to validate
 * @param {Function} showToast - Function to show toast message
 * @returns {boolean} Whether the template name is valid
 */
export function validateTemplateName(
  templateName: string,
  showToast: (title: string, description: string, variant?: 'default' | 'destructive') => void
): boolean {
  if (isTemplateNameEmpty(templateName)) {
    showEmptyNameError(showToast);
    return false;
  }
  return true;
}

/**
 * Gets current placeholders from local storage
 * @returns Array of placeholders
 */
export function getCurrentPlaceholders(): Placeholder[] {
  try {
    return JSON.parse(localStorage.getItem('promptGenerator_placeholders') || '[]');
  } catch {
    // Return empty array if parsing fails
    return [];
  }
}

/**
 * Creates toast props object
 * @param {string} title - Toast title
 * @param {string} description - Toast description
 * @param {'default' | 'destructive'} variant - Toast variant
 * @returns {Object} Toast props object
 */
export function createToastProps(
  title: string,
  description: string,
  variant?: 'default' | 'destructive'
): { title: string; description: string; variant?: 'default' | 'destructive' } {
  return { title, description, variant };
}

/**
 * Shows a toast notification
 * @param {ToastFunction} toast - Toast function
 * @param {string} title - Toast title
 * @param {string} description - Toast description
 * @param {'default' | 'destructive'} variant - Toast variant
 */
export function showToast(
  toast: ToastFunction,
  title: string,
  description: string,
  variant?: 'default' | 'destructive'
): void {
  const props = createToastProps(title, description, variant);
  toast(props);
}
