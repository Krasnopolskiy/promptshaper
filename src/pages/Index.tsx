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
  const { templates, saveTemplate, loadTemplate } = useTemplates();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activePanel, setActivePanel] = useState<'placeholders' | 'editor' | 'preview'>(
    isMobile ? 'editor' : 'placeholders'
  );
  
  const [fullPrompt, setFullPrompt] = useState('');
  
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
    </div>
  );
};

export default Index;
