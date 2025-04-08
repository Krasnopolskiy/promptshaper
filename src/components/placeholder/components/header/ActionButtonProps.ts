/**
 * Action Button Props Utilities
 *
 * Contains utilities for creating action button props
 *
 * @module components/placeholder/components/header/ActionButtonProps
 */
import { ActionButtonsProps, ActionButtonsSectionProps } from './ButtonSections';

/**
 * Base props mapping without optional insert handler
 * @param {ActionButtonsSectionProps} props - Source props
 * @returns {Partial<ActionButtonsProps>} Base props
 */
function getBaseProps(props: ActionButtonsSectionProps): Partial<ActionButtonsProps> {
  return {
    isExpanded: props.isExpanded,
    mode: props.mode,
    setIsEditing: props.onEdit,
    handleCopyToClipboard: props.onCopy,
    toggleMode: props.onToggleMode,
    getModeDescription: props.getDescription
  };
}

/**
 * Creates action buttons props mapping
 * @param {ActionButtonsSectionProps} props - Button section props
 * @returns {ActionButtonsProps} Mapped props for ActionButtons
 */
export function createActionButtonProps(props: ActionButtonsSectionProps): ActionButtonsProps {
  const result = getBaseProps(props) as ActionButtonsProps;
  if (props.onInsert) result.handleInsert = props.onInsert;
  return result;
}
