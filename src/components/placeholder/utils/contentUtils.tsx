/**
 * Content-related utilities for placeholder cards
 *
 * @module components/placeholder/utils/contentUtils
 */
import React from 'react';
import { Placeholder } from '@/types';
import { PLACEHOLDER_COLORS } from '@/hooks/usePlaceholders';
import { PlaceholderCardContent } from '../PlaceholderCardContent';
import { ActionHandlers } from './actionHandlers';
import { StateHandlers } from './stateHandlers';

/**
 * Content props type
 */
export interface ContentProps {
  /** Is card expanded */
  isExpanded: boolean;
  /** Placeholder data */
  placeholder: Placeholder;
  /** Is card in editing mode */
  isEditing: boolean;
  /** New content value */
  newContent: string;
  /** Selected color value */
  selectedColor: string;
  /** Textarea field reference */
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  /** Action handlers */
  actionHandlers: ActionHandlers;
  /** State handlers */
  stateHandlers: StateHandlers;
}

/**
 * Creates base content props
 * @param {ContentProps} props - Component props
 * @returns {Object} Base content props
 */
export function createBaseContentProps(props: ContentProps): Pick<ContentProps, 'placeholder' | 'isEditing' | 'newContent' | 'selectedColor' | 'textareaRef'> {
  const { placeholder, isEditing, newContent, selectedColor, textareaRef } = props;
  return { placeholder, isEditing, newContent, selectedColor, textareaRef };
}

/**
 * Creates content state props
 * @param {ContentProps} props - Component props
 * @returns {Object} Content state props
 */
export function createContentStateProps(props: ContentProps): {
  setNewContent: StateHandlers['setNewContent'];
  setSelectedColor: StateHandlers['setSelectedColor'];
  setIsEditing: StateHandlers['setIsEditing'];
} {
  const { setNewContent, setSelectedColor, setIsEditing } = props.stateHandlers;
  return { setNewContent, setSelectedColor, setIsEditing };
}

/**
 * Creates content action props
 * @param {ContentProps} props - Component props
 * @returns {Object} Content action props
 */
export function createContentActionProps(props: ContentProps): {
  handleCopyToClipboard: ActionHandlers['handleCopyToClipboard'];
  handleInsert: ActionHandlers['handleInsert'];
  handleDelete: ActionHandlers['handleDelete'];
  handleCancel: ActionHandlers['handleCancel'];
} {
  const { handleCopyToClipboard, handleInsert, handleDelete, handleCancel } = props.actionHandlers;
  return { handleCopyToClipboard, handleInsert, handleDelete, handleCancel };
}

/**
 * Casts props to component props type
 * @param {Record<string, unknown>} props - Props to cast
 * @returns {React.ComponentProps<typeof PlaceholderCardContent>} Casted props
 */
function castToComponentProps(props: Record<string, unknown>): React.ComponentProps<typeof PlaceholderCardContent> {
  return props as unknown as React.ComponentProps<typeof PlaceholderCardContent>;
}

/**
 * Merges content props with colors and returns component props
 * @param {ReturnType<typeof createBaseContentProps>} baseProps - Base content props
 * @param {ReturnType<typeof createContentStateProps>} stateProps - State content props
 * @param {ReturnType<typeof createContentActionProps>} actionProps - Action content props
 * @returns {React.ComponentProps<typeof PlaceholderCardContent>} Component props
 */
function mergeContentProps(
  baseProps: ReturnType<typeof createBaseContentProps>,
  stateProps: ReturnType<typeof createContentStateProps>,
  actionProps: ReturnType<typeof createContentActionProps>
): React.ComponentProps<typeof PlaceholderCardContent> {
  return castToComponentProps({ ...baseProps, ...stateProps, ...actionProps, placeholderColors: PLACEHOLDER_COLORS });
}

/**
 * Creates content component props
 * @param {ContentProps} props - Component props
 * @returns {Object} Content component props
 */
export function createContentComponentProps(props: ContentProps): React.ComponentProps<typeof PlaceholderCardContent> {
  const baseProps = createBaseContentProps(props);
  const stateProps = createContentStateProps(props);
  const actionProps = createContentActionProps(props);
  return mergeContentProps(baseProps, stateProps, actionProps);
}

/**
 * Renders card content component if expanded
 * @param {ContentProps} props - Component props
 * @returns {JSX.Element | null} Card content component or null
 */
export function renderContent(props: ContentProps): JSX.Element | null {
  if (!props.isExpanded) return null;
  const contentProps = createContentComponentProps(props);
  return <PlaceholderCardContent {...contentProps} />;
}
