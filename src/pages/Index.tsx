import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { PlaceholderPanel } from '@/components/PlaceholderPanel';
import { EditorPanel } from '@/components/EditorPanel';
import { PreviewPanel } from '@/components/PreviewPanel';
import { usePlaceholders, PLACEHOLDER_COLORS } from '@/hooks/usePlaceholders';
import { usePrompt } from '@/hooks/usePrompt';
import { useTemplates } from '@/hooks/useTemplates';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sparkles, Wand2, FileCode, Layers } from 'lucide-react';

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
  const [showWelcome, setShowWelcome] = useState(false);
  
  useEffect(() => {
    setFullPrompt(generateFullPrompt(promptText, placeholders));
  }, [promptText, placeholders, generateFullPrompt]);
  
  useEffect(() => {
    setActivePanel(isMobile ? 'editor' : 'placeholders');
  }, [isMobile]);

  // Check if this is the first visit
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('promptShaper_hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
      // Don't set localStorage yet - we'll do that when they dismiss the welcome screen
    }
  }, []);
  
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
    
    // If position is -1, it means the placeholder was removed from the editor
    if (position === -1) {
      // Find the placeholder
      const placeholder = placeholders.find(p => p.name === name);
      
      // Only remove if the content is empty
      if (placeholder && placeholder.content === '') {
        deletePlaceholder(placeholder.id);
        return -1;
      }
      
      return -1;
    }
    
    // Check if this placeholder already exists
    const existingPlaceholder = placeholders.find(p => p.name === name);
    
    // If it doesn't exist, create it with empty content
    if (!existingPlaceholder) {
      // Get a random color from the PLACEHOLDER_COLORS array
      const randomColor = PLACEHOLDER_COLORS[Math.floor(Math.random() * PLACEHOLDER_COLORS.length)];
      addPlaceholder(name, '', randomColor);
    }
    
    return insertPlaceholderTag(name, position);
  };
  
  const handlePlaceholderNameChange = (oldName: string, newName: string) => {
    updatePlaceholdersInPrompt(oldName, newName);
  };

  const handleSkipWelcome = () => {
    setShowWelcome(false);
    // Mark that the user has seen the welcome screen
    localStorage.setItem('promptShaper_hasSeenWelcome', 'true');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Simple background */}
      <div className="fixed inset-0 bg-background -z-10"></div>
      
      <Header 
        onSaveTemplate={saveTemplate}
        templates={templates}
        onLoadTemplate={loadTemplate}
        currentPrompt={promptText}
        setPrompt={setPromptText}
        setPlaceholders={setPlaceholders}
        onCopyFullPrompt={handleCopyFullPrompt}
      />
      
      {/* Welcome overlay */}
      {showWelcome && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-500">
          <div className="max-w-2xl p-8 rounded-2xl bg-white dark:bg-background shadow-2xl border border-border/50 animate-enter-active">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-4">Getting Started</h1>
            <p className="text-muted-foreground text-center mb-8">
              Welcome to Prompt Shaper! Create reusable prompt templates with placeholders to generate consistent AI prompts.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-accent/20 dark:bg-accent/10 flex flex-col items-center text-center">
                <Layers className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-medium">Create Placeholders</h3>
                <p className="text-sm text-muted-foreground">Define reusable variables for your prompts</p>
              </div>
              <div className="p-4 rounded-lg bg-accent/20 dark:bg-accent/10 flex flex-col items-center text-center">
                <FileCode className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-medium">Build Templates</h3>
                <p className="text-sm text-muted-foreground">Design prompt templates with placeholders</p>
              </div>
              <div className="p-4 rounded-lg bg-accent/20 dark:bg-accent/10 flex flex-col items-center text-center">
                <Wand2 className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-medium">Generate Content</h3>
                <p className="text-sm text-muted-foreground">Fill in values and get perfect prompts</p>
              </div>
            </div>
            <div className="flex justify-center">
              <Button onClick={handleSkipWelcome} size="lg" className="px-8">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {isMobile ? (
        <div className="flex-1 flex flex-col overflow-hidden p-4 max-w-full">
          <div className="flex border-b border-border rounded-t-lg overflow-hidden bg-white/70 dark:bg-background/70 backdrop-blur-sm shadow-sm">
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
          
          <div className="flex-1 rounded-b-lg overflow-hidden shadow-lg">
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
        <div className="flex-1 p-4 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-120px)]">
            <div className="w-full lg:w-80 h-full flex-shrink-0 shadow-lg rounded-lg overflow-hidden bg-white/70 dark:bg-background/70 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:shadow-xl">
              <PlaceholderPanel 
                placeholders={placeholders}
                onAddPlaceholder={addPlaceholder}
                onUpdatePlaceholder={updatePlaceholder}
                onDeletePlaceholder={deletePlaceholder}
                onInsertPlaceholder={handleInsertPlaceholderFromPanel}
                onPlaceholderNameChange={handlePlaceholderNameChange}
              />
            </div>
            
            <div className="w-full lg:flex-1 h-full shadow-lg rounded-lg overflow-hidden bg-white/70 dark:bg-background/70 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:shadow-xl">
              <EditorPanel 
                promptText={promptText}
                setPromptText={setPromptText}
                placeholders={placeholders}
                onInsertPlaceholder={handleInsertPlaceholderAtPosition}
              />
            </div>
            
            <div className="w-full lg:w-80 h-full flex-shrink-0 shadow-lg rounded-lg overflow-hidden bg-white/70 dark:bg-background/70 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:shadow-xl">
              <PreviewPanel 
                content={fullPrompt}
                onCopy={handleCopyFullPrompt}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
