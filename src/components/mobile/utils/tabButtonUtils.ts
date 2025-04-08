/**
 * Tab Button Utilities
 *
 * Utility functions for tab button components
 *
 * @module components/mobile/utils/tabButtonUtils
 */

/**
 * Get active button class
 * @returns {string} CSS class string for active button
 */
export function getActiveButtonClass(): string {
  return 'border-b-2 border-primary bg-primary/10 text-primary';
}

/**
 * Get inactive button class
 * @returns {string} CSS class string for inactive button
 */
export function getInactiveButtonClass(): string {
  return 'text-muted-foreground hover:bg-accent/5';
}

/**
 * Generates button class based on active state
 * @param {boolean} isActive - Whether the button is active
 * @returns {string} CSS class string
 */
export function getButtonClass(isActive: boolean): string {
  const baseClass = 'flex-1 py-3 text-xs font-medium transition-colors';
  const stateClass = isActive ? getActiveButtonClass() : getInactiveButtonClass();
  return `${baseClass} ${stateClass}`;
}
