import React from 'react';

/**
 * Creates the style object for the card border
 * @param {string} color - Border color
 * @returns {React.CSSProperties} Card border style object
 */
export function createCardBorderStyle(color: string): React.CSSProperties {
  return {
    borderLeft: `4px solid ${color}`,
  };
}

/**
 * Gets the description for the current mode
 * @param {string} mode - Current mode ('replace' or 'tag')
 * @returns {string} Mode description
 */
export function getModeDescription(mode: string): string {
  return mode === 'replace'
    ? "Replace Mode: Placeholder will be replaced with its content"
    : "Tag Mode: Content will be displayed between opening and closing tags";
}
