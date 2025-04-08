/**
 * Panel styles
 *
 * @module components/DesktopPanelView/panelStyles
 */

/** Base styles for all panels */
export const baseStyles = 'border border-border/50 bg-white/70 backdrop-blur-sm transition-all dark:bg-background/70';

/** Styles for the left panel */
export const leftPanelStyles = `rounded-l-lg ${baseStyles}`;

/** Styles for the middle panel */
export const middlePanelStyles = `border-y ${baseStyles}`;

/** Styles for the right panel */
export const rightPanelStyles = `rounded-r-lg ${baseStyles}`;
