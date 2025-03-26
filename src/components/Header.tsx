/**
 * Header Component
 *
 * Main header component for the application that provides access to save/load templates
 * and includes the app's branding.
 *
 * @module components/Header
 */
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useToast} from '@/hooks/use-toast';
import {Placeholder, Template} from '@/types';
import {Link} from 'react-router-dom';
import {Download, Save} from 'lucide-react';
import {ThemeToggle} from '@/components/ui/theme-toggle';

/**
 * Header component props
 * @interface HeaderProps
 */
interface HeaderProps {
  /** Function to save a template */
  onSaveTemplate: (name: string, prompt: string, placeholders: Placeholder[]) => Template;
  /** List of available templates */
  templates: Template[];
  /** Function to load a template */
  onLoadTemplate: (id: string) => Template | undefined;
  /** Current prompt text */
  currentPrompt: string;
  /** Function to set prompt text */
  setPrompt: (text: string) => void;
  /** Function to set placeholders */
  setPlaceholders: (placeholders: Placeholder[]) => void;
  /** Function to copy the full prompt with placeholders */
  onCopyFullPrompt: () => void;
}

/**
 * Header component with template management options
 */
export function Header({
                         onSaveTemplate,
                         templates,
                         onLoadTemplate,
                         currentPrompt,
                         setPrompt,
                         setPlaceholders,
                         onCopyFullPrompt,
                       }: HeaderProps) {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const {toast} = useToast();

  /**
   * Validates template name
   * @returns Whether the template name is valid
   */
  const validateTemplateName = (): boolean => {
    if (!templateName.trim()) {
      toast({
        title: 'Name required',
        description: 'Please enter a name for your template.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  /**
   * Gets current placeholders from local storage
   * @returns Array of placeholders
   */
  const getCurrentPlaceholders = (): Placeholder[] => {
    try {
      return JSON.parse(localStorage.getItem('promptGenerator_placeholders') || '[]');
    } catch (error) {
      console.error('Error parsing placeholders:', error);
      return [];
    }
  };

  /**
   * Handles saving a template
   */
  const handleSaveTemplate = () => {
    if (!validateTemplateName()) return;

    try {
      const currentPlaceholders = getCurrentPlaceholders();
      onSaveTemplate(templateName, currentPrompt, currentPlaceholders);
      showSuccessToast('Template saved', `"${templateName}" has been saved successfully.`);
      setIsSaveDialogOpen(false);
      setTemplateName('');
    } catch (error) {
      showErrorToast('Error saving template', 'There was a problem saving your template.');
    }
  };

  /**
   * Handles loading a template
   */
  const handleLoadTemplate = () => {
    if (!selectedTemplateId) {
      toast({
        title: 'No template selected',
        description: 'Please select a template to load.',
        variant: 'destructive',
      });
      return;
    }

    const template = onLoadTemplate(selectedTemplateId);
    if (template) {
      setPrompt(template.prompt);
      setPlaceholders(template.placeholders);
      showSuccessToast('Template loaded', `"${template.name}" has been loaded successfully.`);
      setIsLoadDialogOpen(false);
      setSelectedTemplateId(null);
    }
  };

  /**
   * Shows a success toast notification
   * @param title - Toast title
   * @param description - Toast description
   */
  const showSuccessToast = (title: string, description: string) => {
    toast({
      title,
      description,
    });
  };

  /**
   * Shows an error toast notification
   * @param title - Toast title
   * @param description - Toast description
   */
  const showErrorToast = (title: string, description: string) => {
    toast({
      title,
      description,
      variant: 'destructive',
    });
  };

  return (
    <header
      className="z-10 w-full border-b border-border/50 bg-white/80 shadow-sm backdrop-blur-sm dark:bg-background/80">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-sm">
            <span className="text-lg font-semibold text-primary-foreground">P</span>
          </div>
          <div>
            <h1
              className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-xl font-semibold text-transparent">
              Prompt Shaper
            </h1>
            <p className="text-xs text-muted-foreground">Create perfect AI prompts</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle/>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLoadDialogOpen(true)}
            className="flex items-center gap-1 border-border/50 text-xs shadow-sm hover:bg-accent/10 sm:text-sm"
          >
            <Download className="h-3.5 w-3.5"/>
            <span className="hidden sm:inline">Load</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSaveDialogOpen(true)}
            className="flex items-center gap-1 border-border/50 text-xs shadow-sm hover:bg-accent/10 sm:text-sm"
          >
            <Save className="h-3.5 w-3.5"/>
            <span className="hidden sm:inline">Save</span>
          </Button>
        </div>
      </div>

      <SaveTemplateDialog
        isOpen={isSaveDialogOpen}
        onOpenChange={setIsSaveDialogOpen}
        templateName={templateName}
        onTemplateNameChange={setTemplateName}
        onSave={handleSaveTemplate}
      />

      <LoadTemplateDialog
        isOpen={isLoadDialogOpen}
        onOpenChange={setIsLoadDialogOpen}
        templates={templates}
        selectedTemplateId={selectedTemplateId}
        onTemplateSelect={setSelectedTemplateId}
        onLoad={handleLoadTemplate}
      />
    </header>
  );
}

/**
 * Save Template Dialog component props
 * @interface SaveTemplateDialogProps
 */
interface SaveTemplateDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Function to handle open state changes */
  onOpenChange: (open: boolean) => void;
  /** Current template name */
  templateName: string;
  /** Function to handle template name changes */
  onTemplateNameChange: (name: string) => void;
  /** Function to handle save action */
  onSave: () => void;
}

/**
 * Dialog component for saving templates
 */
function SaveTemplateDialog({
                              isOpen,
                              onOpenChange,
                              templateName,
                              onTemplateNameChange,
                              onSave,
                            }: SaveTemplateDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Template</DialogTitle>
          <DialogDescription>
            Give your template a name to save it for future use.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={templateName}
              onChange={e => onTemplateNameChange(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Load Template Dialog component props
 * @interface LoadTemplateDialogProps
 */
interface LoadTemplateDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Function to handle open state changes */
  onOpenChange: (open: boolean) => void;
  /** List of available templates */
  templates: Template[];
  /** ID of the selected template */
  selectedTemplateId: string | null;
  /** Function to handle template selection */
  onTemplateSelect: (id: string | null) => void;
  /** Function to handle load action */
  onLoad: () => void;
}

/**
 * Dialog component for loading templates
 */
function LoadTemplateDialog({
                              isOpen,
                              onOpenChange,
                              templates,
                              selectedTemplateId,
                              onTemplateSelect,
                              onLoad,
                            }: LoadTemplateDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Load Template</DialogTitle>
          <DialogDescription>Select a template to load.</DialogDescription>
        </DialogHeader>
        <div className="subtle-scroll grid max-h-[300px] gap-4 overflow-y-auto py-4">
          {templates.length > 0 ? (
            templates.map(template => (
              <div
                key={template.id}
                className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                  selectedTemplateId === template.id
                    ? 'border-primary/30 bg-primary/10'
                    : 'hover:bg-muted'
                }`}
                onClick={() => onTemplateSelect(template.id)}
              >
                <div className="font-medium">{template.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {new Date(template.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-muted-foreground">No templates saved yet.</div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onLoad} disabled={!selectedTemplateId || templates.length === 0}>
            Load
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
