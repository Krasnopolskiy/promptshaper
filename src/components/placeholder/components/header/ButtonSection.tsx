/**
 * ButtonSection Component
 *
 * Button section of the placeholder card header
 *
 * @module components/placeholder/components/header/ButtonSection
 */
import { EditorButtons } from '../../buttons/EditorButtons';
import { ActionButtons } from '../ActionButtons';
import { ToggleExpandButton } from '../ToggleExpandButton';

/**
 * Props for the ButtonSection component
 * @interface ButtonSectionProps
 */
interface ButtonSectionProps {
  /** Whether the card is currently being edited */
  isEditing: boolean;
  /** Whether the card is expanded */
  isExpanded: boolean;
  /** Current mode */
  mode: string;
  /** Function to save changes */
  handleSave: () => void;
  /** Function to cancel changes */
  handleCancel: () => void;
  /** Function to toggle expand */
  toggleExpand: () => void;
  /** Function to set editing state */
  setIsEditing: (editing: boolean) => void;
  /** Function to copy to clipboard */
  handleCopyToClipboard: () => void;
  /** Function to insert placeholder */
  handleInsert?: () => void;
  /** Function to toggle mode */
  toggleMode: () => void;
  /** Function to get mode description */
  getModeDescription: () => string;
}

/**
 * Creates props for action buttons
 * @param {ButtonSectionProps} props - Component props
 * @returns {Object} Action buttons props
 */
function createActionButtonsProps(props: ButtonSectionProps): Pick<ButtonSectionProps, 'isExpanded' | 'mode' | 'setIsEditing' | 'handleCopyToClipboard' | 'handleInsert' | 'toggleMode' | 'getModeDescription'> {
  const { isExpanded, mode, setIsEditing, handleCopyToClipboard, handleInsert, toggleMode, getModeDescription } = props;
  return { isExpanded, mode, setIsEditing, handleCopyToClipboard, handleInsert, toggleMode, getModeDescription };
}

/**
 * Renders action buttons
 * @param {ButtonSectionProps} props - Component props
 * @returns {JSX.Element} Action buttons
 */
function ActionButtonsSection(props: ButtonSectionProps): JSX.Element {
  return <ActionButtons {...createActionButtonsProps(props)} />;
}

/**
 * Renders action buttons and expand toggle
 * @param {ButtonSectionProps} props - Component props
 * @returns {JSX.Element} Action buttons and expand toggle
 */
function NonEditingButtons(props: ButtonSectionProps): JSX.Element {
  return (
    <>
      <ActionButtonsSection {...props} />
      <ToggleExpandButton isExpanded={props.isExpanded} onToggleExpand={props.toggleExpand} />
    </>
  );
}

/**
 * ButtonSection component
 * @param {ButtonSectionProps} props - Component props
 * @returns {JSX.Element} The rendered button section
 */
export function ButtonSection(props: ButtonSectionProps): JSX.Element {
  const buttons = props.isEditing
    ? <EditorButtons handleSave={props.handleSave} handleCancel={props.handleCancel} />
    : <NonEditingButtons {...props} />;
  return <div className="flex items-center gap-1">{buttons}</div>;
}
