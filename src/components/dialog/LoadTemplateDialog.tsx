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
 * Template items renderer component
 * @param {Template[]} templates - List of templates
 * @returns {JSX.Element[]} Template items
 */
function TemplateItems({ templates }: { templates: Template[] }): JSX.Element[] {
  return templates.map((template) => (
    <SelectItem key={template.id} value={template.id}>
      {template.name}
    </SelectItem>
  ));
}

/**
 * Template select trigger component
 * @returns {JSX.Element} Select trigger with placeholder
 */
function TemplateSelectTrigger(): JSX.Element {
  return (
    <SelectTrigger>
      <SelectValue placeholder="Select a template" />
    </SelectTrigger>
  );
}

/**
 * Template select content component
 * @param {Template[]} templates - List of templates
 * @returns {JSX.Element} Select content with template items
 */
function TemplateSelectContent({ templates }: { templates: Template[] }): JSX.Element {
  return (
    <SelectContent>
      <TemplateItems templates={templates} />
    </SelectContent>
  );
}

/**
 * Template selector component
 * @param {TemplateSelectorProps} props - Component props
 * @returns {JSX.Element} Template selector
 */
function TemplateSelector({ templates, selectedTemplateId, setSelectedTemplateId }: TemplateSelectorProps): JSX.Element {
  return (
    <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
      <TemplateSelectTrigger />
      <TemplateSelectContent templates={templates} />
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
 * Template selector wrapper
 * @param {TemplateSelectorProps} props - Component props
 * @returns {JSX.Element} Template selector
 */
function SelectorSection(props: TemplateSelectorProps): JSX.Element {
  return <TemplateSelector {...props} />;
}

/**
 * Create props for dialog content sections
 * @param {Omit<LoadTemplateDialogProps, 'isOpen'>} props - Dialog props
 * @returns {Object} Props for selector and buttons
 */
function createContentSectionProps(props: Omit<LoadTemplateDialogProps, 'isOpen'>): {
  selectorProps: TemplateSelectorProps;
  buttonProps: DialogButtonsProps;
} {
  const { templates, selectedTemplateId, setSelectedTemplateId, onClose, onLoad } = props;
  return {
    selectorProps: { templates, selectedTemplateId, setSelectedTemplateId },
    buttonProps: { onClose, onLoad }
  };
}

/**
 * Dialog content component
 * @param {LoadTemplateDialogProps} props - Dialog props
 * @returns {JSX.Element} Dialog content
 */
function DialogContents(props: Omit<LoadTemplateDialogProps, 'isOpen'>): JSX.Element {
  const { selectorProps, buttonProps } = createContentSectionProps(props);
  return (
    <DialogContent>
      <DialogHead />
      <SelectorSection {...selectorProps} />
      <DialogButtons {...buttonProps} />
    </DialogContent>
  );
}

/**
 * Load template dialog component
 * @param {LoadTemplateDialogProps} props - Component props
 * @returns {JSX.Element} Load template dialog
 */
export function LoadTemplateDialog(props: LoadTemplateDialogProps): JSX.Element {
  const { isOpen, onClose, ...contentProps } = props;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContents {...contentProps} onClose={onClose} />
    </Dialog>
  );
}
