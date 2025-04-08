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
 * ButtonSection component
 * @param {ButtonSectionProps} props - Component props
 * @returns {JSX.Element} The rendered button section
 */
export function ButtonSection(props: ButtonSectionProps): JSX.Element {
  return (
    <div className="flex items-center gap-1">
      {props.isEditing ? (
        <EditorButtons handleSave={props.handleSave} handleCancel={props.handleCancel} />
      ) : (
        <>
          <ActionButtons
            isExpanded={props.isExpanded}
            mode={props.mode}
            setIsEditing={props.setIsEditing}
            handleCopyToClipboard={props.handleCopyToClipboard}
            handleInsert={props.handleInsert}
            toggleMode={props.toggleMode}
            getModeDescription={props.getModeDescription}
          />
          <ToggleExpandButton
            isExpanded={props.isExpanded}
            onToggleExpand={props.toggleExpand}
          />
        </>
      )}
    </div>
  );
}
