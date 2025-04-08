/**
 * Save Template Dialog Component
 *
 * Dialog for saving a template
 *
 * @module components/dialog/SaveTemplateDialog
 */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * SaveTemplateDialog component props
 * @interface SaveTemplateDialogProps
 */
interface SaveTemplateDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Function to close the dialog */
  onClose: () => void;
  /** Function to save a template */
  onSave: () => void;
  /** Current template name */
  templateName: string;
  /** Function to set template name */
  setTemplateName: (name: string) => void;
}

interface TemplateNameInputProps {
  templateName: string;
  setTemplateName: (name: string) => void;
}

interface DialogButtonsProps {
  onClose: () => void;
  onSave: () => void;
}

/**
 * Template name input component
 * @param {TemplateNameInputProps} props - Component props
 * @returns {JSX.Element} Template name input
 */
function TemplateNameInput({ templateName, setTemplateName }: TemplateNameInputProps): JSX.Element {
  return (
    <Input
      placeholder="Enter template name"
      value={templateName}
      onChange={(e) => setTemplateName(e.target.value)}
    />
  );
}

/**
 * Dialog footer component
 * @param {DialogButtonsProps} props - Component props
 * @returns {JSX.Element} Dialog footer
 */
function DialogButtons({ onClose, onSave }: DialogButtonsProps): JSX.Element {
  return (
    <DialogFooter>
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={onSave}>Save</Button>
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
      <DialogTitle>Save Template</DialogTitle>
    </DialogHeader>
  );
}

/**
 * Save template dialog component
 * @param {SaveTemplateDialogProps} props - Component props
 * @returns {JSX.Element} Save template dialog
 */
export function SaveTemplateDialog(props: SaveTemplateDialogProps): JSX.Element {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHead />
        <TemplateNameInput
          templateName={props.templateName}
          setTemplateName={props.setTemplateName}
        />
        <DialogButtons onClose={props.onClose} onSave={props.onSave} />
      </DialogContent>
    </Dialog>
  );
}
