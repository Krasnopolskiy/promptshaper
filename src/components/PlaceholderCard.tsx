/**
 * Placeholder Card Component
 *
 * Card component to display and edit placeholders
 *
 * @module components/PlaceholderCard
 */
import React from 'react';
import { Placeholder } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { usePlaceholderCard } from './placeholder/hooks/usePlaceholderCard';
import { PlaceholderCardHeader } from './placeholder/PlaceholderCardHeader';
import { PlaceholderCardContent } from './placeholder/PlaceholderCardContent';
import {
  PlaceholderCardProps,
  BasicStateProps,
  NameProps,
  KeyboardAndSaveProps,
  ActionProps,
  ContentProps,
  HeaderSpecificProps,
  CardHeaderProps,
  CardContentProps
} from './placeholder/types';

/**
 * Creates the class name for the card based on its state.
 * @description Generates a class name string based on the card's editing and expanded states.
 * The class name includes styles for transitions, shadows, and background colors.
 * @param {boolean} isEditing - Whether the card is in edit mode
 * @param {boolean} isExpanded - Whether the card is expanded
 * @returns {string} The class name string containing all necessary styles for the card
 */
function getCardClassName(isEditing: boolean, isExpanded: boolean): string {
  return `relative overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md ${
    isEditing ? 'ring-2 ring-primary/20' : ''
  } ${isExpanded ? 'bg-card/80' : 'bg-card/50'}`;
}

/**
 * Extracts basic state props from card props.
 * @description Extracts the editing and expanded states from the card props.
 * These states are used to determine the card's appearance and behavior.
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @returns {BasicStateProps} An object containing the isEditing and isExpanded flags
 */
function extractBasicStateProps(cardProps: ReturnType<typeof usePlaceholderCard>): BasicStateProps {
  const { isEditing, isExpanded } = cardProps;
  return { isEditing, isExpanded };
}

/**
 * Extracts name-related props from card props
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @returns {NameProps} The extracted name-related props
 */
function extractNameProps(cardProps: ReturnType<typeof usePlaceholderCard>): NameProps {
  const { newName, inputRef, setNewName } = cardProps;
  return { newName, inputRef, setNewName };
}

/**
 * Extracts keyboard and save-related props from card props
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @returns {KeyboardAndSaveProps} The extracted keyboard and save-related props
 */
function extractKeyboardAndSaveProps(cardProps: ReturnType<typeof usePlaceholderCard>): KeyboardAndSaveProps {
  const { handleKeyDown, handleSave, handleCancel } = cardProps;
  return { handleKeyDown, handleSave, handleCancel };
}

/**
 * Extracts action-related props from card props
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @returns {ActionProps} The extracted action-related props
 */
function extractActionProps(cardProps: ReturnType<typeof usePlaceholderCard>): ActionProps {
  const { handleCopyToClipboard, handleDelete, toggleMode, modeDescription } = cardProps;
  return {
    handleCopyToClipboard,
    handleDelete,
    toggleMode,
    /**
     * Gets the current mode description text
     * @description Returns the current mode description from the card props
     * @returns {string} The current mode description text
     */
    getModeDescription: () => modeDescription
  };
}

/**
 * Creates a function to handle expanded state changes
 * @param {() => void} toggleExpanded - Function to toggle expanded state
 * @returns {(expanded: boolean) => void} Function to handle expanded state changes
 */
function createSetIsExpanded(toggleExpanded: () => void): (expanded: boolean) => void {
  return (expanded: boolean): void => {
    if (expanded) toggleExpanded();
  };
}

/**
 * Extracts header-specific props from card props
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @returns {HeaderSpecificProps} The header-specific props
 */
function extractHeaderSpecificProps(cardProps: ReturnType<typeof usePlaceholderCard>): HeaderSpecificProps {
  const { setIsEditing, toggleExpanded } = cardProps;
  return {
    setIsExpanded: createSetIsExpanded(toggleExpanded),
    setIsEditing
  };
}

/**
 * Combines basic and name props for the header
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @returns {BasicStateProps & NameProps} The combined basic and name props
 */
function combineBasicAndNameProps(
  cardProps: ReturnType<typeof usePlaceholderCard>
): BasicStateProps & NameProps {
  return {
    ...extractBasicStateProps(cardProps),
    ...extractNameProps(cardProps)
  };
}

/**
 * Combines keyboard and action props for the header
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @returns {KeyboardAndSaveProps & ActionProps} The combined keyboard and action props
 */
function combineKeyboardAndActionProps(
  cardProps: ReturnType<typeof usePlaceholderCard>
): KeyboardAndSaveProps & ActionProps {
  return {
    ...extractKeyboardAndSaveProps(cardProps),
    ...extractActionProps(cardProps)
  };
}

/**
 * Combines all header-related props except placeholder
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @returns {Omit<CardHeaderProps, 'placeholder'>} The combined header props
 */
function combineHeaderProps(
  cardProps: ReturnType<typeof usePlaceholderCard>
): Omit<CardHeaderProps, 'placeholder'> {
  return {
    ...combineBasicAndNameProps(cardProps),
    ...combineKeyboardAndActionProps(cardProps),
    ...extractHeaderSpecificProps(cardProps)
  };
}

/**
 * Creates the header props for the card
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @param {Placeholder} placeholder - The placeholder data
 * @returns {CardHeaderProps} The header props
 */
function createCardHeaderProps(
  cardProps: ReturnType<typeof usePlaceholderCard>,
  placeholder: Placeholder
): CardHeaderProps {
  return {
    placeholder,
    ...combineHeaderProps(cardProps)
  };
}

/**
 * Extracts content-related props from card props
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @returns {ContentProps} The extracted content-related props
 */
function extractContentProps(cardProps: ReturnType<typeof usePlaceholderCard>): ContentProps {
  const { newContent, selectedColor, textareaRef, setNewContent, setSelectedColor, handleKeyDown, handleInsert } = cardProps;
  return { newContent, selectedColor, textareaRef, setNewContent, setSelectedColor, handleKeyDown, handleInsert };
}

/**
 * Combines all content-related props except placeholder
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @returns {Omit<CardContentProps, 'placeholder'>} The combined content props
 */
function combineContentProps(
  cardProps: ReturnType<typeof usePlaceholderCard>
): Omit<CardContentProps, 'placeholder'> {
  return {
    ...extractBasicStateProps(cardProps),
    ...extractContentProps(cardProps)
  };
}

/**
 * Creates the content props for the card
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @param {Placeholder} placeholder - The placeholder data
 * @returns {CardContentProps} The content props
 */
function createCardContentProps(
  cardProps: ReturnType<typeof usePlaceholderCard>,
  placeholder: Placeholder
): CardContentProps {
  return {
    placeholder,
    ...combineContentProps(cardProps)
  };
}

/**
 * Creates the card header element
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @param {Placeholder} placeholder - The placeholder data
 * @returns {JSX.Element} The rendered card header
 */
function createCardHeader(
  cardProps: ReturnType<typeof usePlaceholderCard>,
  placeholder: Placeholder
): JSX.Element {
  return <PlaceholderCardHeader {...createCardHeaderProps(cardProps, placeholder)} />;
}

/**
 * Creates the card content element
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @param {Placeholder} placeholder - The placeholder data
 * @returns {JSX.Element} The rendered card content
 */
function createCardContentElement(
  cardProps: ReturnType<typeof usePlaceholderCard>,
  placeholder: Placeholder
): JSX.Element {
  return <PlaceholderCardContent {...createCardContentProps(cardProps, placeholder)} />;
}

/**
 * Creates a container for the card content elements
 * @description Wraps the header and content elements in a fragment
 * @param {JSX.Element} header - The card header element
 * @param {JSX.Element} content - The card content element
 * @returns {JSX.Element} The rendered card content elements container
 */
function createCardContentContainer(header: JSX.Element, content: JSX.Element): JSX.Element {
  return (
    <>
      {header}
      {content}
    </>
  );
}

/**
 * Creates the card content elements
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @param {Placeholder} placeholder - The placeholder data
 * @returns {JSX.Element} The rendered card content elements
 */
function createCardContentElements(
  cardProps: ReturnType<typeof usePlaceholderCard>,
  placeholder: Placeholder
): JSX.Element {
  const header = createCardHeader(cardProps, placeholder);
  const content = createCardContentElement(cardProps, placeholder);
  return createCardContentContainer(header, content);
}

/**
 * Creates the card content wrapper
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @param {Placeholder} placeholder - The placeholder data
 * @returns {JSX.Element} The rendered card content wrapper
 */
function createCardContent(
  cardProps: ReturnType<typeof usePlaceholderCard>,
  placeholder: Placeholder
): JSX.Element {
  return (
    <CardContent className="p-3">
      {createCardContentElements(cardProps, placeholder)}
    </CardContent>
  );
}

/**
 * Creates the card element with its styles
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @returns {Object} The card element styles and className
 */
function createCardStyles(
  cardProps: ReturnType<typeof usePlaceholderCard>
): { className: string; style: React.CSSProperties } {
  const { isEditing, isExpanded, cardBorderStyle } = cardProps;
  return {
    className: getCardClassName(isEditing, isExpanded),
    style: cardBorderStyle
  };
}

/**
 * Creates the card element with its content
 * @param {ReturnType<typeof usePlaceholderCard>} cardProps - The card props from the hook
 * @param {Placeholder} placeholder - The placeholder data
 * @returns {JSX.Element} The rendered card element
 */
function createCardElement(
  cardProps: ReturnType<typeof usePlaceholderCard>,
  placeholder: Placeholder
): JSX.Element {
  const styles = createCardStyles(cardProps);
  const content = createCardContent(cardProps, placeholder);
  return <Card {...styles}>{content}</Card>;
}

/**
 * Component for displaying and editing a placeholder
 * @param {PlaceholderCardProps} props - Component props
 * @returns {JSX.Element} The rendered placeholder card
 */
export function PlaceholderCard({ placeholder, ...props }: PlaceholderCardProps): JSX.Element {
  const cardProps = usePlaceholderCard({ placeholder, ...props });
  return createCardElement(cardProps, placeholder);
}
