/**
 * Load Template Dialog Component
 *
 * Dialog for loading a saved template
 *
 * @module components/dialog/LoadTemplateDialog
 */
import { Template } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LoadTemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLoad: () => void;
  templates: Template[];
  selectedTemplateId: string;
  setSelectedTemplateId: (id: string) => void;
}

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplateId: string;
  setSelectedTemplateId: (id: string) => void;
}

interface DialogButtonsProps {
  onClose: () => void;
  onLoad: () => void;
}

/**
 * Template selector component
 * @param {TemplateSelectorProps} props - Component props
 * @returns {JSX.Element} Template selector
 */
function TemplateSelector({ templates, selectedTemplateId, setSelectedTemplateId }: TemplateSelectorProps): JSX.Element {
  return (
    <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
      <SelectTrigger>
        <SelectValue placeholder="Select a template" />
      </SelectTrigger>
      <SelectContent>
        {templates.map((template) => (
          <SelectItem key={template.id} value={template.id}>
            {template.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/**
 * Dialog footer component
 * @param {DialogButtonsProps} props - Component props
 * @returns {JSX.Element} Dialog footer
 */
function DialogButtons({ onClose, onLoad }: DialogButtonsProps): JSX.Element {
  return (
    <DialogFooter>
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={onLoad}>Load</Button>
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
      <DialogTitle>Load Template</DialogTitle>
    </DialogHeader>
  );
}

/**
 * Load template dialog component
 * @param {LoadTemplateDialogProps} props - Component props
 * @returns {JSX.Element} Load template dialog
 */
export function LoadTemplateDialog(props: LoadTemplateDialogProps): JSX.Element {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHead />
        <TemplateSelector
          templates={props.templates}
          selectedTemplateId={props.selectedTemplateId}
          setSelectedTemplateId={props.setSelectedTemplateId}
        />
        <DialogButtons onClose={props.onClose} onLoad={props.onLoad} />
      </DialogContent>
    </Dialog>
  );
}
