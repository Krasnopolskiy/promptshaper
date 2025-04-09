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
 * Creates dialog content component with template input
 * @param {TemplateNameInputProps} inputProps - Template name input props
 * @param {DialogButtonsProps} buttonProps - Dialog button props
 * @returns {JSX.Element} Dialog content
 */
function createDialogInnerContent(
  inputProps: TemplateNameInputProps,
  buttonProps: DialogButtonsProps
): JSX.Element[] {
  return [
    <DialogHead key="head" />,
    <TemplateNameInput key="input" {...inputProps} />,
    <DialogButtons key="buttons" {...buttonProps} />
  ];
}

/**
 * Dialog content wrapper component
 * @param {SaveTemplateDialogProps} props - Dialog props without isOpen
 * @returns {JSX.Element} Dialog content wrapper
 */
function DialogContentWrapper({ templateName, setTemplateName, onClose, onSave }: Omit<SaveTemplateDialogProps, 'isOpen'>): JSX.Element {
  const inputProps = { templateName, setTemplateName };
  const buttonProps = { onClose, onSave };

  return (
    <DialogContent>
      {createDialogInnerContent(inputProps, buttonProps)}
    </DialogContent>
  );
}

/**
 * Save template dialog component
 * @param {SaveTemplateDialogProps} props - Component props
 * @returns {JSX.Element} Save template dialog
 */
export function SaveTemplateDialog(props: SaveTemplateDialogProps): JSX.Element {
  const { isOpen, onClose, ...contentProps } = props;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContentWrapper {...contentProps} onClose={onClose} />
    </Dialog>
  );
}
