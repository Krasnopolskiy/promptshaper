
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Template, Placeholder } from '@/types';

interface HeaderProps {
  onSaveTemplate: (name: string, prompt: string, placeholders: Placeholder[]) => Template;
  onExportTemplates: () => void;
  templates: Template[];
  onLoadTemplate: (id: string) => Template | undefined;
  currentPrompt: string;
  setPrompt: (text: string) => void;
  setPlaceholders: (placeholders: Placeholder[]) => void;
  onCopyFullPrompt: () => void;
}

export function Header({
  onSaveTemplate,
  onExportTemplates,
  templates,
  onLoadTemplate,
  currentPrompt,
  setPrompt,
  setPlaceholders,
  onCopyFullPrompt
}: HeaderProps) {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your template.",
        variant: "destructive"
      });
      return;
    }

    try {
      const currentPlaceholders = JSON.parse(localStorage.getItem('promptGenerator_placeholders') || '[]');
      onSaveTemplate(templateName, currentPrompt, currentPlaceholders);
      
      toast({
        title: "Template saved",
        description: `"${templateName}" has been saved successfully.`
      });
      
      setIsSaveDialogOpen(false);
      setTemplateName('');
    } catch (error) {
      toast({
        title: "Error saving template",
        description: "There was a problem saving your template.",
        variant: "destructive"
      });
    }
  };

  const handleLoadTemplate = () => {
    if (!selectedTemplateId) {
      toast({
        title: "No template selected",
        description: "Please select a template to load.",
        variant: "destructive"
      });
      return;
    }

    const template = onLoadTemplate(selectedTemplateId);
    if (template) {
      setPrompt(template.prompt);
      setPlaceholders(template.placeholders);
      
      toast({
        title: "Template loaded",
        description: `"${template.name}" has been loaded successfully.`
      });
      
      setIsLoadDialogOpen(false);
      setSelectedTemplateId(null);
    }
  };

  return (
    <header className="w-full bg-background/80 backdrop-blur-sm border-b border-border z-10 flex justify-between items-center px-4 sm:px-6 py-3">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-semibold text-lg">P</span>
        </div>
        <h1 className="text-xl font-medium">Prompt Shaper</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsLoadDialogOpen(true)}
          className="text-xs sm:text-sm"
        >
          Load
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsSaveDialogOpen(true)}
          className="text-xs sm:text-sm"
        >
          Save
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onExportTemplates}
          className="text-xs sm:text-sm"
        >
          Export
        </Button>
      </div>
      
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
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
                onChange={(e) => setTemplateName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveTemplate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isLoadDialogOpen} onOpenChange={setIsLoadDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Load Template</DialogTitle>
            <DialogDescription>
              Select a template to load.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[300px] overflow-y-auto subtle-scroll">
            {templates.length > 0 ? (
              templates.map((template) => (
                <div 
                  key={template.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedTemplateId === template.id 
                      ? 'bg-primary/10 border-primary/30' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedTemplateId(template.id)}
                >
                  <div className="font-medium">{template.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(template.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-4">
                No templates saved yet.
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLoadDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleLoadTemplate} disabled={!selectedTemplateId || templates.length === 0}>
              Load
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
