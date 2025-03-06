
import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { PlaceholderPanel } from '@/components/PlaceholderPanel';
import { PromptEditor } from '@/components/PromptEditor';
import { PreviewPanel } from '@/components/PreviewPanel';
import { usePlaceholders } from '@/hooks/usePlaceholders';
import { usePrompt } from '@/hooks/usePrompt';
import { useTemplates } from '@/hooks/useTemplates';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { placeholders, addPlaceholder, updatePlaceholder, deletePlaceholder, setPlaceholders } = usePlaceholders();
  const { promptText, setPromptText, generateFullPrompt, insertPlaceholderTag, copyToClipboard } = usePrompt();
  const { templates, saveTemplate, loadTemplate, exportTemplates, importTemplates } = useTemplates();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activePanel, setActivePanel] = useState<'placeholders' | 'editor' | 'preview'>(
    isMobile ? 'editor' : 'placeholders'
  );
  
  const [fullPrompt, setFullPrompt] = useState('');
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  
  useEffect(() => {
    setFullPrompt(generateFullPrompt(promptText, placeholders));
  }, [promptText, placeholders, generateFullPrompt]);
  
  useEffect(() => {
    setActivePanel(isMobile ? 'editor' : 'placeholders');
  }, [isMobile]);
  
  const handleCopyFullPrompt = async () => {
    const success = await copyToClipboard(fullPrompt);
    
    if (success) {
      toast({
        title: "Copied to clipboard",
        description: "The full prompt has been copied to your clipboard."
      });
    } else {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImportFile(e.target.files[0]);
    }
  };
  
  const handleImport = () => {
    if (!importFile) {
      toast({
        title: "No file selected",
        description: "Please select a JSON file to import.",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const success = importTemplates(result);
          
          if (success) {
            toast({
              title: "Import successful",
              description: "Templates have been imported successfully."
            });
            setIsImportDialogOpen(false);
            setImportFile(null);
          } else {
            throw new Error("Invalid file format");
          }
        }
      } catch (error) {
        toast({
          title: "Import failed",
          description: "The selected file could not be imported. Please ensure it's a valid JSON file.",
          variant: "destructive"
        });
      }
    };
    
    reader.readAsText(importFile);
  };
  
  const handleInsertPlaceholderFromPanel = (name: string) => {
    const position = isMobile ? promptText.length : cursorPosition || 0;
    insertPlaceholderTag(name, position);
    
    if (isMobile) {
      setActivePanel('editor');
      
      toast({
        title: "Placeholder inserted",
        description: `<${name}> has been added to your prompt.`
      });
    }
  };
  
  // Track cursor position globally to insert at correct position
  const [cursorPosition, setCursorPosition] = useState(0);
  
  const handleInsertPlaceholderAtPosition = (name: string, position: number) => {
    setCursorPosition(position);
    return insertPlaceholderTag(name, position);
  };
  
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header 
        onSaveTemplate={saveTemplate}
        onExportTemplates={exportTemplates}
        templates={templates}
        onLoadTemplate={loadTemplate}
        currentPrompt={promptText}
        setPrompt={setPromptText}
        setPlaceholders={setPlaceholders}
        onCopyFullPrompt={handleCopyFullPrompt}
      />
      
      {isMobile ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex border-b border-border">
            <button 
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                activePanel === 'placeholders' 
                  ? 'border-b-2 border-primary text-foreground' 
                  : 'text-muted-foreground'
              }`}
              onClick={() => setActivePanel('placeholders')}
            >
              Placeholders
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                activePanel === 'editor' 
                  ? 'border-b-2 border-primary text-foreground' 
                  : 'text-muted-foreground'
              }`}
              onClick={() => setActivePanel('editor')}
            >
              Editor
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                activePanel === 'preview' 
                  ? 'border-b-2 border-primary text-foreground' 
                  : 'text-muted-foreground'
              }`}
              onClick={() => setActivePanel('preview')}
            >
              Preview
            </button>
          </div>
          
          <div className="flex-1 overflow-hidden">
            {activePanel === 'placeholders' && (
              <PlaceholderPanel 
                placeholders={placeholders}
                onAddPlaceholder={addPlaceholder}
                onUpdatePlaceholder={updatePlaceholder}
                onDeletePlaceholder={deletePlaceholder}
                onInsertPlaceholder={handleInsertPlaceholderFromPanel}
              />
            )}
            
            {activePanel === 'editor' && (
              <PromptEditor 
                value={promptText}
                onChange={setPromptText}
                placeholders={placeholders}
                onInsertPlaceholder={handleInsertPlaceholderAtPosition}
              />
            )}
            
            {activePanel === 'preview' && (
              <PreviewPanel 
                content={fullPrompt}
                onCopy={handleCopyFullPrompt}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          <PlaceholderPanel 
            placeholders={placeholders}
            onAddPlaceholder={addPlaceholder}
            onUpdatePlaceholder={updatePlaceholder}
            onDeletePlaceholder={deletePlaceholder}
            onInsertPlaceholder={handleInsertPlaceholderFromPanel}
          />
          
          <div className="flex-1 overflow-hidden">
            <PromptEditor 
              value={promptText}
              onChange={setPromptText}
              placeholders={placeholders}
              onInsertPlaceholder={handleInsertPlaceholderAtPosition}
            />
          </div>
          
          <PreviewPanel 
            content={fullPrompt}
            onCopy={handleCopyFullPrompt}
          />
        </div>
      )}
      
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Import Templates</DialogTitle>
            <DialogDescription>
              Select a JSON file containing templates to import.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              type="file"
              accept=".json"
              onChange={handleImportFile}
            />
            {importFile && (
              <p className="text-sm">Selected file: {importFile.name}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleImport} disabled={!importFile}>Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
