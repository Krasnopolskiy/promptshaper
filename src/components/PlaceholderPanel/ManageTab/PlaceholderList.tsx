import {PlaceholderCard} from '../../PlaceholderCard';
import {EmptyState} from '../EmptyState';
import {ManageTabContentProps} from './index';

/**
 * Renders the list of placeholders or empty state
 * @param {ManageTabContentProps} props - Component properties
 * @returns {JSX.Element} The placeholder list or empty state
 */
export function PlaceholderList(props: ManageTabContentProps): JSX.Element {
  const {placeholders} = props;
  return placeholders.length === 0 ? <EmptyState /> : <PlaceholderItems {...props} />;
}

/**
 * Renders the list of placeholder items
 * @param {ManageTabContentProps} props - Component properties
 * @returns {JSX.Element} The placeholder items
 */
function PlaceholderItems(props: ManageTabContentProps): JSX.Element {
  const {placeholders} = props;
  return <>{placeholders.map(placeholder => <CardItem key={placeholder.id} placeholder={placeholder} {...props} />)}</>;
}

/**
 * Props for the card item component
 */
interface CardItemProps extends Omit<ManageTabContentProps, 'placeholders'> {
  placeholder: ManageTabContentProps['placeholders'][0];
}

/**
 * Handlers for the placeholder card
 */
interface Handlers {
  onUpdate: CardItemProps['onUpdatePlaceholder'];
  onDelete: CardItemProps['onDeletePlaceholder'];
  onInsert?: CardItemProps['onInsertPlaceholder'];
  onNameChange?: CardItemProps['onPlaceholderNameChange'];
}

/**
 * Card props for the placeholder card
 */
interface CardProps {
  placeholder: CardItemProps['placeholder'];
  handlers: Handlers;
}

/**
 * Props for PlaceholderCard component
 */
interface PlaceholderCardProps {
  placeholder: CardProps['placeholder'];
  onUpdate: Handlers['onUpdate'];
  onDelete: Handlers['onDelete'];
  onInsert?: Handlers['onInsert'];
  onNameChange?: Handlers['onNameChange'];
}

/**
 * Renders a single placeholder card
 * @param {CardItemProps} props - Component properties
 * @returns {JSX.Element} The placeholder card
 */
function CardItem(props: CardItemProps): JSX.Element {
  const cardProps = extractCardProps(props);
  return <PlaceholderCardWrapper cardProps={cardProps} />;
}

/**
 * Extracts handlers from the component props
 * @param {CardItemProps} props - Component properties
 * @returns {Handlers} The extracted handlers
 */
function extractHandlers(props: CardItemProps): Handlers {
  const {onUpdatePlaceholder, onDeletePlaceholder, onInsertPlaceholder, onPlaceholderNameChange} = props;
  return {
    onUpdate: onUpdatePlaceholder,
    onDelete: onDeletePlaceholder,
    onInsert: onInsertPlaceholder,
    onNameChange: onPlaceholderNameChange
  };
}

/**
 * Extracts card props from the component props
 * @param {CardItemProps} props - Component properties
 * @returns {CardProps} The extracted card props
 */
function extractCardProps(props: CardItemProps): CardProps {
  const {placeholder} = props;
  const handlers = extractHandlers(props);
  return {placeholder, handlers};
}

/**
 * Creates the PlaceholderCard element
 * @param {CardProps} cardProps - Card properties
 * @returns {JSX.Element} The placeholder card element
 */
function createCard(cardProps: CardProps): JSX.Element {
  return createPlaceholderCard(cardProps.placeholder, cardProps.handlers);
}

/**
 * Maps handlers to placeholder card props
 * @param {Handlers} handlers - The handler functions
 * @returns {Object} Mapped handler properties
 */
function mapHandlers(handlers: Handlers): Pick<PlaceholderCardProps, 'onUpdate' | 'onDelete' | 'onInsert' | 'onNameChange'> {
  return {
    onUpdate: handlers.onUpdate,
    onDelete: handlers.onDelete,
    onInsert: handlers.onInsert,
    onNameChange: handlers.onNameChange
  };
}

/**
 * Creates props for the PlaceholderCard component
 * @param {Object} placeholder - The placeholder object
 * @param {Handlers} handlers - The handlers
 * @returns {PlaceholderCardProps} The props for the PlaceholderCard
 */
function createCardProps(
  placeholder: CardProps['placeholder'],
  handlers: Handlers
): PlaceholderCardProps {
  const handlerProps = mapHandlers(handlers);
  return {placeholder, ...handlerProps};
}

/**
 * Creates a PlaceholderCard component with props
 * @param {Object} placeholder - The placeholder object
 * @param {Handlers} handlers - The handlers
 * @returns {JSX.Element} The PlaceholderCard component
 */
function createPlaceholderCard(
  placeholder: CardProps['placeholder'],
  handlers: Handlers
): JSX.Element {
  const props = createCardProps(placeholder, handlers);
  return <PlaceholderCard {...props} />;
}

/**
 * Wraps the placeholder card component
 * @param {Object} props - Component properties
 * @param {CardProps} props.cardProps - Card properties
 * @returns {JSX.Element} The placeholder card component
 */
function PlaceholderCardWrapper({cardProps}: {cardProps: CardProps}): JSX.Element {
  return createCard(cardProps);
}

