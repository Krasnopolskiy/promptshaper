import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { PlaceholderPanel } from '@/components/PlaceholderPanel';
import { EditorPanel } from '@/components/EditorPanel';
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
  const { promptText, setPromptText, generateFullPrompt, insertPlaceholderTag, updatePlaceholdersInPrompt, copyToClipboard } = usePrompt();
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
  
  const [cursorPosition, setCursorPosition] = useState(0);
  
  const handleInsertPlaceholderAtPosition = (name: string, position: number) => {
    setCursorPosition(position);
    return insertPlaceholderTag(name, position);
  };
  
  const handlePlaceholderNameChange = (oldName: string, newName: string) => {
    updatePlaceholdersInPrompt(oldName, newName);
  };
  
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-background to-accent/5">
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
        <div className="flex-1 flex flex-col overflow-hidden p-4 max-w-full">
          <div className="flex border-b border-border rounded-t-lg overflow-hidden bg-white/50 backdrop-blur-sm">
            <button 
              className={`flex-1 py-3 text-xs font-medium transition-colors ${
                activePanel === 'placeholders' 
                  ? 'bg-primary/10 text-primary border-b-2 border-primary' 
                  : 'text-muted-foreground hover:bg-accent/5'
              }`}
              onClick={() => setActivePanel('placeholders')}
            >
              Placeholders
            </button>
            <button 
              className={`flex-1 py-3 text-xs font-medium transition-colors ${
                activePanel === 'editor' 
                  ? 'bg-primary/10 text-primary border-b-2 border-primary' 
                  : 'text-muted-foreground hover:bg-accent/5'
              }`}
              onClick={() => setActivePanel('editor')}
            >
              Editor
            </button>
            <button 
              className={`flex-1 py-3 text-xs font-medium transition-colors ${
                activePanel === 'preview' 
                  ? 'bg-primary/10 text-primary border-b-2 border-primary' 
                  : 'text-muted-foreground hover:bg-accent/5'
              }`}
              onClick={() => setActivePanel('preview')}
            >
              Preview
            </button>
          </div>
          
          <div className="flex-1 overflow-hidden rounded-b-lg">
            {activePanel === 'placeholders' && (
              <PlaceholderPanel 
                placeholders={placeholders}
                onAddPlaceholder={addPlaceholder}
                onUpdatePlaceholder={updatePlaceholder}
                onDeletePlaceholder={deletePlaceholder}
                onInsertPlaceholder={handleInsertPlaceholderFromPanel}
                onPlaceholderNameChange={handlePlaceholderNameChange}
              />
            )}
            
            {activePanel === 'editor' && (
              <EditorPanel 
                promptText={promptText}
                setPromptText={setPromptText}
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
        <div className="flex-1 flex gap-4 p-4 overflow-hidden">
          <div className="w-80 h-full flex-shrink-0">
            <PlaceholderPanel 
              placeholders={placeholders}
              onAddPlaceholder={addPlaceholder}
              onUpdatePlaceholder={updatePlaceholder}
              onDeletePlaceholder={deletePlaceholder}
              onInsertPlaceholder={handleInsertPlaceholderFromPanel}
              onPlaceholderNameChange={handlePlaceholderNameChange}
            />
          </div>
          
          <div className="flex-1 h-full">
            <EditorPanel 
              promptText={promptText}
              setPromptText={setPromptText}
              placeholders={placeholders}
              onInsertPlaceholder={handleInsertPlaceholderAtPosition}
            />
          </div>
          
          <div className="w-80 h-full flex-shrink-0">
            <PreviewPanel 
              content={fullPrompt}
              onCopy={handleCopyFullPrompt}
            />
          </div>
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
