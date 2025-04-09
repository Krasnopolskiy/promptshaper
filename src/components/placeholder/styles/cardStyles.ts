/**
 * Module for placeholder card styles
 * @module components/placeholder/styles/cardStyles
 */
import React from 'react';
import { Placeholder } from '@/types';
import { createCardStyles as createBaseCardStyles } from '../utils/cardStyles';

/**
 * Interface for card style parameters
 */
export interface CardStyleParams {
  /** Card color */
  color: string;
  /** Whether the card is in edit mode */
  isEditing: boolean;
  /** Whether the card is expanded */
  isExpanded: boolean;
}

/**
 * Creates class name based on card state
 * @param {CardStyleParams} params - Style parameters
 * @returns {string} Class name for the card
 */
export function createClassName(params: CardStyleParams): string {
  const { color, isEditing, isExpanded } = params;
  const { className } = createBaseCardStyles(color, isEditing, isExpanded);
  return className;
}

/**
 * Creates style object based on card state
 * @param {CardStyleParams} params - Style parameters
 * @returns {React.CSSProperties} Style object for the card
 */
export function createStyleObject(params: CardStyleParams): React.CSSProperties {
  const { color, isEditing, isExpanded } = params;
  const { style } = createBaseCardStyles(color, isEditing, isExpanded);
  return style;
}

/**
 * Creates style parameters from placeholder and states
 * @param {Placeholder} placeholder - The placeholder data
 * @param {boolean} isEditing - Whether card is in edit mode
 * @param {boolean} isExpanded - Whether card is expanded
 * @returns {CardStyleParams} Style parameters
 */
export function createStyleParams(
  placeholder: Placeholder,
  isEditing: boolean,
  isExpanded: boolean
): CardStyleParams {
  const { color } = placeholder;
  return { color, isEditing, isExpanded };
}

/**
 * Creates style for the card
 * @param {Placeholder} placeholder - The placeholder data
 * @param {boolean} isEditing - Whether card is in edit mode
 * @param {boolean} isExpanded - Whether card is expanded
 * @returns {object} Style object for the card
 */
export function createCardStyle(
  placeholder: Placeholder,
  isEditing: boolean,
  isExpanded: boolean
): { className: string; style: React.CSSProperties } {
  const params = createStyleParams(placeholder, isEditing, isExpanded);
  const className = createClassName(params);
  const style = createStyleObject(params);
  return { className, style };
}
