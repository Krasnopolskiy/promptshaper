/**
 * Reset Confirmation Dialog Component
 *
 * Dialog for confirming reset action
 *
 * @module components/dialog/ResetConfirmationDialog
 */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

/**
 * ResetConfirmationDialog component props
 * @interface ResetConfirmationDialogProps
 */
interface ResetConfirmationDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Function to close the dialog */
  onClose: () => void;
  /** Function to confirm reset */
  onConfirm: () => void;
}

interface DialogButtonsProps {
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * Dialog footer component
 * @param {DialogButtonsProps} props - Component props
 * @returns {JSX.Element} Dialog footer
 */
function DialogButtons({ onClose, onConfirm }: DialogButtonsProps): JSX.Element {
  return (
    <DialogFooter>
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={onConfirm}>
        Reset
      </Button>
    </DialogFooter>
  );
}

/**
 * Dialog header component
 * @returns {JSX.Element} Dialog header
 */
function DialogHead(): JSX.Element {
  return (
    <DialogHeader>
      <DialogTitle>Reset Confirmation</DialogTitle>
      <DialogDescription>
        Are you sure you want to reset? This will clear all your changes.
      </DialogDescription>
    </DialogHeader>
  );
}

/**
 * Reset confirmation dialog component
 * @param {ResetConfirmationDialogProps} props - Component props
 * @returns {JSX.Element} Reset confirmation dialog
 */
export function ResetConfirmationDialog(props: ResetConfirmationDialogProps): JSX.Element {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHead />
        <DialogButtons onClose={props.onClose} onConfirm={props.onConfirm} />
      </DialogContent>
    </Dialog>
  );
}
