/**
 * Header Action Buttons Component
 *
 * Contains the action buttons for the header (load, save, reset)
 *
 * @module components/HeaderActionButtons
 */
import { Button } from '@/components/ui/button';
import { LoadIcon, SaveIcon, ResetIcon } from '@/components/icons/HeaderIcons';

interface HeaderActionButtonsProps {
  onLoadClick: () => void;
  onSaveClick: () => void;
  onResetClick: () => void;
}

/**
 * Action button component
 * @param {object} props - Button props
 * @param {() => void} props.onClick - Click handler
 * @param {string} props.ariaLabel - Accessibility label
 * @param {JSX.Element} props.icon - Button icon
 * @returns {JSX.Element} Action button
 */
function ActionButton({ onClick, ariaLabel, icon }: { onClick: () => void; ariaLabel: string; icon: JSX.Element }): JSX.Element {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
    </Button>
  );
}

/**
 * Header action buttons component
 * @param {HeaderActionButtonsProps} props - Component props
 * @returns {JSX.Element} Header action buttons component
 */
export function HeaderActionButtons({
  onLoadClick,
  onSaveClick,
  onResetClick,
}: HeaderActionButtonsProps): JSX.Element {
  return (
    <div className="flex items-center space-x-2">
      <ActionButton
        onClick={onLoadClick}
        ariaLabel="Load Template"
        icon={<LoadIcon />}
      />
      <ActionButton
        onClick={onSaveClick}
        ariaLabel="Save Template"
        icon={<SaveIcon />}
      />
      <ActionButton
        onClick={onResetClick}
        ariaLabel="Reset"
        icon={<ResetIcon />}
      />
    </div>
  );
}
