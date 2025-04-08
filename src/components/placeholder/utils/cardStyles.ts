/**
 * Card styles utilities for placeholder cards
 *
 * @module components/placeholder/utils/cardStyles
 */
import React from 'react';

/**
 * Card style object type
 */
export interface CardStyle {
  /** CSS styles for the card */
  style: React.CSSProperties;
  /** Class name for the card */
  className: string;
}

/**
 * Creates card's border style
 * @param {string} color - Border color
 * @returns {React.CSSProperties} Style object
 */
export function createCardBorderStyle(color: string): React.CSSProperties {
  return { borderLeft: `4px solid ${color}` };
}

/**
 * Creates card's class name based on state
 * @param {boolean} isEditing - Is editing mode active
 * @param {boolean} isExpanded - Is card expanded
 * @returns {string} Class name string
 */
export function createCardClassName(
  isEditing: boolean,
  isExpanded: boolean
): string {
  return `relative overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md ${
    isEditing ? 'ring-2 ring-primary/20' : ''} ${isExpanded ? 'bg-card/80' : 'bg-card/50'}`;
}

/**
 * Creates the card style based on placeholder properties and state
 * @param {string} color - Placeholder color
 * @param {boolean} isEditing - Is currently editing
 * @param {boolean} isExpanded - Is currently expanded
 * @returns {CardStyle} Style objects for the card
 */
export function createCardStyles(
  color: string,
  isEditing: boolean,
  isExpanded: boolean
): CardStyle {
  return {
    style: createCardBorderStyle(color),
    className: createCardClassName(isEditing, isExpanded)
  };
}
