/**
 * Rendering utilities for placeholder cards
 *
 * @module components/placeholder/utils/renderUtils
 */
import React from 'react';
import { Placeholder } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceholderCardHeader } from '../PlaceholderCardHeader';
import { ActionHandlers } from './actionHandlers';
import { StateHandlers } from './stateHandlers';
import { renderContent } from './contentUtils';
import { useExpandEffect } from './expandUtils';

/**
 * Interface representing the state of a placeholder card
 */
export interface PlaceholderState {
  /** Whether the card is in editing mode */
  isEditing: boolean;
  /** Whether the card is expanded */
  isExpanded: boolean;
  /** Optional CSS class name */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Current name in edit mode */
  newName: string;
  /** Current content in edit mode */
  newContent: string;
  /** Selected color in edit mode */
  selectedColor: string;
}

/**
 * Configuration interface for rendering a placeholder card
 */
export interface PlaceholderCardRenderConfig {
  /** Optional CSS class name for the card */
  className?: string;
  /** Optional inline styles for the card */
  style?: React.CSSProperties;
  /** Placeholder data */
  placeholder: Placeholder;
  /** Current state of the card */
  state: PlaceholderState;
  /** Reference to the input element */
  inputRef: React.RefObject<HTMLInputElement>;
  /** Reference to the textarea element */
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  /** Action handlers for card interactions */
  actionHandlers: ActionHandlers;
  /** State handlers for card state management */
  stateHandlers: StateHandlers;
}

/**
 * Creates base header props for the placeholder card
 *
 * @param {Object} config - Configuration for base header props
 * @param {PlaceholderState} config.state - Current state
 * @returns {Object} Base header props
 */
function createBaseHeaderProps({ state }: Pick<PlaceholderCardRenderConfig, 'state'>): {
  isEditing: boolean;
  isExpanded: boolean;
} {
  return {
    isEditing: state.isEditing,
    isExpanded: state.isExpanded
  };
}

/**
 * Creates mode description getter function
 *
 * @param {Placeholder} placeholder - Placeholder data
 * @returns {() => string} Mode description getter function
 */
function createModeDescriptionGetter(placeholder: Placeholder): () => string {
  return () => placeholder.mode || 'replace';
}

/**
 * Creates base additional header props
 *
 * @param {Object} config - Configuration for base additional header props
 * @returns {Object} Base additional header props
 */
function createBaseAdditionalHeaderProps(config: Pick<PlaceholderCardRenderConfig, 'state' | 'inputRef'>): {
  newName: string;
  inputRef: React.RefObject<HTMLInputElement>;
} {
  const { state, inputRef } = config;
  return { newName: state.newName, inputRef };
}

/**
 * Creates placeholder-related header props
 *
 * @param {Object} config - Configuration for placeholder-related header props
 * @returns {Object} Placeholder-related header props
 */
function createPlaceholderHeaderProps(config: Pick<PlaceholderCardRenderConfig, 'placeholder'>): {
  placeholder: Placeholder;
  getModeDescription: () => string;
} {
  const { placeholder } = config;
  return {
    placeholder,
    getModeDescription: createModeDescriptionGetter(placeholder)
  };
}

/**
 * Creates additional header props for the placeholder card
 *
 * @param {Object} config - Configuration for additional header props
 * @returns {Object} Additional header props
 */
function createAdditionalHeaderProps(config: Pick<PlaceholderCardRenderConfig, 'placeholder' | 'state' | 'inputRef'>): {
  placeholder: Placeholder;
  newName: string;
  inputRef: React.RefObject<HTMLInputElement>;
  getModeDescription: () => string;
} {
  return { ...createBaseAdditionalHeaderProps(config), ...createPlaceholderHeaderProps(config) };
}

/**
 * Creates header props for the placeholder card
 *
 * @param {Object} config - Configuration for header props
 * @returns {Object} Header props for the PlaceholderCardHeader component
 */
function createHeaderProps(config: Pick<PlaceholderCardRenderConfig, 'placeholder' | 'state' | 'inputRef' | 'actionHandlers' | 'stateHandlers'>): React.ComponentProps<typeof PlaceholderCardHeader> {
  return {
    ...createBaseHeaderProps(config),
    ...createAdditionalHeaderProps(config),
    ...config.actionHandlers,
    ...config.stateHandlers
  };
}

/**
 * Creates base content props for the placeholder card
 *
 * @param {Object} config - Configuration for base content props
 * @param {PlaceholderState} config.state - Current state
 * @returns {Object} Base content props
 */
function createBaseContentProps({ state }: Pick<PlaceholderCardRenderConfig, 'state'>): {
  isEditing: boolean;
  isExpanded: boolean;
  newContent: string;
  selectedColor: string;
} {
  const { isEditing, isExpanded, newContent, selectedColor } = state;
  return { isEditing, isExpanded, newContent, selectedColor };
}

/**
 * Creates additional content props for the placeholder card
 *
 * @param {Object} config - Configuration for additional content props
 * @returns {Object} Additional content props
 */
function createAdditionalContentProps(config: Pick<PlaceholderCardRenderConfig, 'placeholder' | 'textareaRef' | 'actionHandlers' | 'stateHandlers'>): {
  placeholder: Placeholder;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  actionHandlers: ActionHandlers;
  stateHandlers: StateHandlers;
} {
  const { placeholder, textareaRef, actionHandlers, stateHandlers } = config;
  return { placeholder, textareaRef, actionHandlers, stateHandlers };
}

/**
 * Creates content props for the placeholder card
 *
 * @param {Object} config - Configuration for content props
 * @returns {Object} Content props for the renderContent function
 */
function createContentProps(config: Pick<PlaceholderCardRenderConfig, 'placeholder' | 'state' | 'textareaRef' | 'actionHandlers' | 'stateHandlers'>): Parameters<typeof renderContent>[0] {
  return {
    ...createBaseContentProps(config),
    ...createAdditionalContentProps(config)
  };
}

/**
 * Creates card content for the placeholder card
 *
 * @param {PlaceholderCardRenderConfig} props - Card configuration
 * @returns {JSX.Element} Card content element
 */
function createCardContent(props: PlaceholderCardRenderConfig): JSX.Element {
  return (
    <>
      <PlaceholderCardHeader {...createHeaderProps(props)} />
      <CardContent>
        {renderContent(createContentProps(props))}
      </CardContent>
    </>
  );
}

/**
 * Creates a state setter function for the expand effect
 *
 * @param {StateHandlers} stateHandlers - State handlers
 * @returns {React.Dispatch<React.SetStateAction<PlaceholderState>>} State setter function
 */
function createExpandStateSetter(stateHandlers: StateHandlers): React.Dispatch<React.SetStateAction<PlaceholderState>> {
  return (value) => {
    if (typeof value === 'function') {
      const newState = value({} as PlaceholderState);
      stateHandlers.setIsExpanded(newState.isExpanded);
    } else {
      stateHandlers.setIsExpanded(value.isExpanded);
    }
  };
}

/**
 * Creates style props for the card
 *
 * @param {PlaceholderCardRenderConfig} props - Card configuration
 * @returns {Object} Style props
 */
function createStyleProps(props: PlaceholderCardRenderConfig): {
  className: string;
  style: React.CSSProperties;
} {
  const { className = '', style = {} } = props;
  return { className, style };
}

/**
 * Creates card props for the placeholder card
 *
 * @param {PlaceholderCardRenderConfig} props - Card configuration
 * @returns {Object} Card props
 */
function createCardProps(props: PlaceholderCardRenderConfig): {
  className: string;
  style: React.CSSProperties;
  children: JSX.Element;
} {
  return {
    ...createStyleProps(props),
    children: createCardContent(props)
  };
}

/**
 * Renders a placeholder card with header and content
 *
 * @param {PlaceholderCardRenderConfig} props - The configuration object for rendering the card
 * @returns {JSX.Element} The rendered placeholder card
 */
export function PlaceholderCardRenderer(props: PlaceholderCardRenderConfig): JSX.Element {
  useExpandEffect(
    props.state.isEditing,
    props.state.isExpanded,
    props.inputRef,
    createExpandStateSetter(props.stateHandlers)
  );

  return <Card {...createCardProps(props)} />;
}
