/**
 * Rendering utilities for placeholder cards
 *
 * @module components/placeholder/utils/renderUtils
 */
import React, { useEffect } from 'react';
import { Placeholder } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { PLACEHOLDER_COLORS } from '@/hooks/usePlaceholders';
import { PlaceholderCardHeader } from '../PlaceholderCardHeader';
import { PlaceholderCardContent } from '../PlaceholderCardContent';
import { ActionHandlers } from './actionHandlers';
import { StateHandlers, createInitialState, focusInputIfEditing, expandIfNeeded } from './stateHandlers';

/**
 * Header props type
 */
export interface HeaderProps {
  /** Placeholder data */
  placeholder: Placeholder;
  /** Is card in editing mode */
  isEditing: boolean;
  /** Is card expanded */
  isExpanded: boolean;
  /** New name value */
  newName: string;
  /** Input field reference */
  inputRef: React.RefObject<HTMLInputElement>;
  /** Action handlers */
  actionHandlers: ActionHandlers;
  /** State handlers */
  stateHandlers: StateHandlers;
}

/**
 * Helper function to create handler props for header
 * @param {ActionHandlers} actionHandlers - Action handlers
 * @param {StateHandlers} stateHandlers - State handlers
 * @returns {Object} Handler props
 */
function createHeaderHandlerProps(
  actionHandlers: ActionHandlers,
  stateHandlers: StateHandlers
): Partial<React.ComponentProps<typeof PlaceholderCardHeader>> {
  return {
    handleKeyDown: actionHandlers.handleKeyDown,
    setNewName: stateHandlers.setNewName,
    setIsExpanded: stateHandlers.setIsExpanded,
    setIsEditing: stateHandlers.setIsEditing,
    handleSave: actionHandlers.handleSave,
    handleCancel: actionHandlers.handleCancel,
    handleCopyToClipboard: actionHandlers.handleCopyToClipboard,
    handleInsert: actionHandlers.handleInsert,
    toggleMode: actionHandlers.toggleMode,
    getModeDescription: actionHandlers.getModeDsc
  };
}

/**
 * Renders card header component
 * @param {HeaderProps} props - Component props
 * @returns {JSX.Element} Card header component
 */
export function renderHeader(props: HeaderProps): JSX.Element {
  const {
    placeholder,
    isEditing,
    isExpanded,
    newName,
    inputRef,
    actionHandlers,
    stateHandlers
  } = props;

  const handlerProps = createHeaderHandlerProps(actionHandlers, stateHandlers);

  return (
    <PlaceholderCardHeader
      placeholder={placeholder}
      isEditing={isEditing}
      isExpanded={isExpanded}
      newName={newName}
      inputRef={inputRef}
      {...handlerProps}
    />
  );
}

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
 * Renders card content component if expanded
 * @param {ContentProps} props - Component props
 * @returns {JSX.Element | null} Card content component or null
 */
export function renderContent(props: ContentProps): JSX.Element | null {
  if (!props.isExpanded) return null;

  return (
    <PlaceholderCardContent
      placeholder={props.placeholder}
      isEditing={props.isEditing}
      newContent={props.newContent}
      selectedColor={props.selectedColor}
      textareaRef={props.textareaRef}
      placeholderColors={PLACEHOLDER_COLORS}
      setNewContent={props.stateHandlers.setNewContent}
      setSelectedColor={props.stateHandlers.setSelectedColor}
      setIsEditing={props.stateHandlers.setIsEditing}
      handleCopyToClipboard={props.actionHandlers.handleCopyToClipboard}
      handleInsert={props.actionHandlers.handleInsert}
      handleDelete={props.actionHandlers.handleDelete}
      handleCancel={props.actionHandlers.handleCancel}
    />
  );
}

/**
 * Card render props type
 */
export interface CardRenderProps {
  /** Card class name */
  className: string;
  /** Card style */
  style: React.CSSProperties;
  /** Header props */
  headerProps: HeaderProps;
  /** Content props */
  contentProps: ContentProps;
}

/**
 * Creates header props object
 * @param {Object} options - Options
 * @param {Placeholder} options.placeholder - The placeholder data object
 * @param {ReturnType<typeof createInitialState>} options.state - Current state of the component
 * @param {React.RefObject<HTMLInputElement>} options.inputRef - Reference to the input element
 * @param {ActionHandlers} options.actionHandlers - Action handler functions
 * @param {StateHandlers} options.stateHandlers - State handler functions
 * @returns {HeaderProps} Header props
 */
function createHeaderProps(options: {
  placeholder: Placeholder;
  state: ReturnType<typeof createInitialState>;
  inputRef: React.RefObject<HTMLInputElement>;
  actionHandlers: ActionHandlers;
  stateHandlers: StateHandlers;
}): HeaderProps {
  const { placeholder, state, inputRef, actionHandlers, stateHandlers } = options;
  const { isEditing, isExpanded, newName } = state;

  return {
    placeholder,
    isEditing,
    isExpanded,
    newName,
    inputRef,
    actionHandlers,
    stateHandlers
  };
}

/**
 * Creates content props object
 * @param {Object} options - Options
 * @param {Placeholder} options.placeholder - The placeholder data object
 * @param {ReturnType<typeof createInitialState>} options.state - Current state of the component
 * @param {React.RefObject<HTMLTextAreaElement>} options.textareaRef - Reference to the textarea element
 * @param {ActionHandlers} options.actionHandlers - Action handler functions
 * @param {StateHandlers} options.stateHandlers - State handler functions
 * @returns {ContentProps} Content props
 */
function createContentProps(options: {
  placeholder: Placeholder;
  state: ReturnType<typeof createInitialState>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  actionHandlers: ActionHandlers;
  stateHandlers: StateHandlers;
}): ContentProps {
  const { placeholder, state, textareaRef, actionHandlers, stateHandlers } = options;
  const { isEditing, isExpanded, newContent, selectedColor } = state;

  return {
    isExpanded,
    placeholder,
    isEditing,
    newContent,
    selectedColor,
    textareaRef,
    actionHandlers,
    stateHandlers
  };
}

/**
 * Creates props for card rendering
 * @param {Object} options - Options object
 * @param {string} options.className - CSS class name for the card
 * @param {React.CSSProperties} options.style - Style object for the card
 * @param {Placeholder} options.placeholder - Placeholder data object
 * @param {Object} options.state - Component state object
 * @param {React.RefObject<HTMLInputElement>} options.inputRef - Reference to input element
 * @param {React.RefObject<HTMLTextAreaElement>} options.textareaRef - Reference to textarea element
 * @param {ActionHandlers} options.actionHandlers - Action handler functions
 * @param {StateHandlers} options.stateHandlers - State handler functions
 * @returns {CardRenderProps} Card render props
 */
export function createCardRenderProps(options: {
  className: string;
  style: React.CSSProperties;
  placeholder: Placeholder;
  state: ReturnType<typeof createInitialState>;
  inputRef: React.RefObject<HTMLInputElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  actionHandlers: ActionHandlers;
  stateHandlers: StateHandlers;
}): CardRenderProps {
  const { className, style, placeholder, state, inputRef, textareaRef, actionHandlers, stateHandlers } = options;

  const headerProps = createHeaderProps({ placeholder, state, inputRef, actionHandlers, stateHandlers });
  const contentProps = createContentProps({ placeholder, state, textareaRef, actionHandlers, stateHandlers });

  return { className, style, headerProps, contentProps };
}

/**
 * Configuration for placeholder card rendering
 */
export interface PlaceholderCardRenderConfig {
  /** Card class name */
  className: string;
  /** Card style */
  style: React.CSSProperties;
  /** Placeholder data */
  placeholder: Placeholder;
  /** Component state */
  state: ReturnType<typeof createInitialState>;
  /** Input reference */
  inputRef: React.RefObject<HTMLInputElement>;
  /** Textarea reference */
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  /** Action handlers */
  actionHandlers: ActionHandlers;
  /** State handlers */
  stateHandlers: StateHandlers;
}

/**
 * Renders the placeholder card component
 * @param {PlaceholderCardRenderConfig} config - Configuration for rendering
 * @returns {JSX.Element} Card component
 */
export function renderPlaceholderCard(
  config: PlaceholderCardRenderConfig
): JSX.Element {
  const renderProps = createCardRenderProps(config);

  return (
    <Card className={renderProps.className} style={renderProps.style}>
      <CardContent className="p-3">
        {renderHeader(renderProps.headerProps)}
        {renderContent(renderProps.contentProps)}
      </CardContent>
    </Card>
  );
}

/**
 * Custom hook for handling expand effect when editing
 * @param {boolean} isEditing - Is editing active
 * @param {boolean} isExpanded - Is card expanded
 * @param {React.RefObject<HTMLInputElement>} inputRef - Input reference
 * @param {Function} setState - State setter
 * @returns {void}
 */
export function useExpandEffect(
  isEditing: boolean,
  isExpanded: boolean,
  inputRef: React.RefObject<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<ReturnType<typeof createInitialState>>>
): void {
  useEffect(() => {
    focusInputIfEditing(inputRef, isEditing);
    expandIfNeeded(isEditing, (expanded) => {
      if (expanded && !isExpanded) {
        setState(prev => ({ ...prev, isExpanded: true }));
      }
    });
  }, [isEditing, isExpanded, inputRef, setState]);
}
