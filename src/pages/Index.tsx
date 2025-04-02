
import {useEffect, useState, useCallback} from 'react';
import {Header} from '@/components/Header';
import {PlaceholderPanel} from '@/components/PlaceholderPanel';
import {EditorPanel} from '@/components/EditorPanel';
import {PreviewPanel} from '@/components/PreviewPanel';
import {PLACEHOLDER_COLORS, usePlaceholders} from '@/hooks/usePlaceholders';
import {usePrompt} from '@/hooks/usePrompt';
import {useTemplates} from '@/hooks/useTemplates';
import {useToast} from '@/hooks/use-toast';
import {Button} from '@/components/ui/button';
import {useIsMobile} from '@/hooks/use-mobile';
import {FileCode, Layers, Sparkles, Wand2} from 'lucide-react';
import {ResizablePanel, ResizablePanelGroup, ResizableHandle} from '@/components/ui/resizable';

// Default panel sizes
const DEFAULT_PANEL_SIZES = {
  placeholders: 25,
  editor: 50,
  preview: 25,
};

const Index = () => {
  const {placeholders, addPlaceholder, updatePlaceholder, deletePlaceholder, setPlaceholders, clearPlaceholders} =
    usePlaceholders();
  const {
    promptText,
    setPromptText,
    generateFullPrompt,
    insertPlaceholderTag,
    updatePlaceholdersInPrompt,
    copyToClipboard,
    resetPromptText,
  } = usePrompt();
  const {templates, saveTemplate, loadTemplate} = useTemplates();
  const {toast} = useToast();
  const isMobile = useIsMobile();
  const [activePanel, setActivePanel] = useState<'placeholders' | 'editor' | 'preview'>(
    isMobile ? 'editor' : 'placeholders'
  );

  const [fullPrompt, setFullPrompt] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [panelSizes, setPanelSizes] = useState(DEFAULT_PANEL_SIZES);
  const [cursorPosition, setCursorPosition] = useState(0);

  // Update full prompt when dependencies change
  useEffect(() => {
    setFullPrompt(generateFullPrompt(promptText, placeholders));
  }, [promptText, placeholders, generateFullPrompt]);

  // Set active panel based on mobile status
  useEffect(() => {
    setActivePanel(isMobile ? 'editor' : 'placeholders');
  }, [isMobile]);

  // Show welcome dialog if first time
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('promptShaper_hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  // Load saved panel sizes
  useEffect(() => {
    if (isMobile) return;
    
    const savedSizes = localStorage.getItem('promptShaper_panelSizes');
    if (savedSizes) {
      try {
        setPanelSizes(JSON.parse(savedSizes));
      } catch (e) {
        console.error('Failed to parse saved panel sizes', e);
      }
    }
  }, [isMobile]);

  // Debounced panel resize handler to improve performance
  const handlePanelResize = useCallback((newSizes: number[]) => {
    const [placeholders, editor, preview] = newSizes;
    const newPanelSizes = {placeholders, editor, preview};
    setPanelSizes(newPanelSizes);
    
    // Use requestAnimationFrame to throttle localStorage updates
    requestAnimationFrame(() => {
      localStorage.setItem('promptShaper_panelSizes', JSON.stringify(newPanelSizes));
    });
  }, []);

  const handleCopyFullPrompt = async () => {
    const success = await copyToClipboard(fullPrompt);

    if (success) {
      toast({
        title: 'Copied to clipboard',
        description: 'The full prompt has been copied to your clipboard.',
      });
    } else {
      toast({
        title: 'Copy failed',
        description: 'Failed to copy to clipboard. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleInsertPlaceholderFromPanel = (name: string) => {
    const position = isMobile ? promptText.length : cursorPosition || 0;
    insertPlaceholderTag(name, position);

    if (isMobile) {
      setActivePanel('editor');

      toast({
        title: 'Placeholder inserted',
        description: `<${name}> has been added to your prompt.`,
      });
    }
  };

  const handleInsertPlaceholderAtPosition = (name: string, position: number) => {
    setCursorPosition(position);

    if (position === -1) {
      const placeholder = placeholders.find(p => p.name === name);
      if (placeholder && placeholder.content === '') {
        deletePlaceholder(placeholder.id);
        return -1;
      }

      return -1;
    }

    const existingPlaceholder = placeholders.find(p => p.name === name);

    if (!existingPlaceholder) {
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
    localStorage.setItem('promptShaper_hasSeenWelcome', 'true');
  };

  // Reset function to clear the application state
  const handleReset = useCallback(() => {
    // Clear prompt
    resetPromptText();
    
    // Clear placeholders
    clearPlaceholders();
    
    // Reset panel sizes to default
    setPanelSizes(DEFAULT_PANEL_SIZES);
    localStorage.setItem('promptShaper_panelSizes', JSON.stringify(DEFAULT_PANEL_SIZES));
    
    // Update the UI state
    setFullPrompt('');
    setCursorPosition(0);
  }, [resetPromptText, clearPlaceholders]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed inset-0 -z-10 bg-background"></div>

      <Header
        onSaveTemplate={saveTemplate}
        templates={templates}
        onLoadTemplate={loadTemplate}
        currentPrompt={promptText}
        setPrompt={setPromptText}
        setPlaceholders={setPlaceholders}
        onCopyFullPrompt={handleCopyFullPrompt}
        onReset={handleReset}
      />

      {showWelcome && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-500">
          <div
            className="animate-enter-active max-w-2xl rounded-2xl border border-border/50 bg-white p-8 shadow-2xl dark:bg-background">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary"/>
              </div>
            </div>
            <h1 className="mb-4 text-center text-3xl font-bold">Getting Started</h1>
            <p className="mb-8 text-center text-muted-foreground">
              Welcome to Prompt Shaper! Create reusable prompt templates with placeholders to
              generate consistent AI prompts.
            </p>

            <div className="mb-8 grid grid-cols-3 gap-4">
              <div
                className="flex flex-col items-center rounded-lg bg-accent/20 p-4 text-center dark:bg-accent/10">
                <Layers className="mb-2 h-6 w-6 text-primary"/>
                <h3 className="font-medium">Create Placeholders</h3>
                <p className="text-sm text-muted-foreground">
                  Define reusable variables for your prompts
                </p>
              </div>
              <div
                className="flex flex-col items-center rounded-lg bg-accent/20 p-4 text-center dark:bg-accent/10">
                <FileCode className="mb-2 h-6 w-6 text-primary"/>
                <h3 className="font-medium">Build Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Design prompt templates with placeholders
                </p>
              </div>
              <div
                className="flex flex-col items-center rounded-lg bg-accent/20 p-4 text-center dark:bg-accent/10">
                <Wand2 className="mb-2 h-6 w-6 text-primary"/>
                <h3 className="font-medium">Generate Content</h3>
                <p className="text-sm text-muted-foreground">
                  Fill in values and get perfect prompts
                </p>
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
        <div className="flex max-w-full flex-1 flex-col overflow-hidden p-4">
          <div
            className="flex overflow-hidden rounded-t-lg border-b border-border bg-white/70 shadow-sm backdrop-blur-sm dark:bg-background/70">
            <button
              className={`flex-1 py-3 text-xs font-medium transition-colors ${
                activePanel === 'placeholders'
                  ? 'border-b-2 border-primary bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent/5'
              }`}
              onClick={() => setActivePanel('placeholders')}
            >
              Placeholders
            </button>
            <button
              className={`flex-1 py-3 text-xs font-medium transition-colors ${
                activePanel === 'editor'
                  ? 'border-b-2 border-primary bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent/5'
              }`}
              onClick={() => setActivePanel('editor')}
            >
              Editor
            </button>
            <button
              className={`flex-1 py-3 text-xs font-medium transition-colors ${
                activePanel === 'preview'
                  ? 'border-b-2 border-primary bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent/5'
              }`}
              onClick={() => setActivePanel('preview')}
            >
              Preview
            </button>
          </div>

          <div className="flex-1 overflow-hidden rounded-b-lg shadow-lg">
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
              <PreviewPanel content={fullPrompt} onCopy={handleCopyFullPrompt}/>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-hidden p-4">
          <ResizablePanelGroup
            direction="horizontal"
            className="h-[calc(100vh-120px)] rounded-lg shadow-lg"
            onLayout={handlePanelResize}
            // Add these properties to optimize performance
            autoSaveId="promptshaper-panels"
            disableAutoSaveData={true}
          >
            <ResizablePanel 
              defaultSize={panelSizes.placeholders} 
              minSize={15}
              className="rounded-l-lg border border-border/50 bg-white/70 backdrop-blur-sm transition-all dark:bg-background/70"
            >
              <PlaceholderPanel
                placeholders={placeholders}
                onAddPlaceholder={addPlaceholder}
                onUpdatePlaceholder={updatePlaceholder}
                onDeletePlaceholder={deletePlaceholder}
                onInsertPlaceholder={handleInsertPlaceholderFromPanel}
                onPlaceholderNameChange={handlePlaceholderNameChange}
              />
            </ResizablePanel>
            
            <ResizableHandle withHandle className="transition-colors hover:bg-primary/20" />
            
            <ResizablePanel 
              defaultSize={panelSizes.editor} 
              minSize={25}
              className="border-y border-border/50 bg-white/70 backdrop-blur-sm transition-all dark:bg-background/70"
            >
              <EditorPanel
                promptText={promptText}
                setPromptText={setPromptText}
                placeholders={placeholders}
                onInsertPlaceholder={handleInsertPlaceholderAtPosition}
              />
            </ResizablePanel>
            
            <ResizableHandle withHandle className="transition-colors hover:bg-primary/20" />
            
            <ResizablePanel 
              defaultSize={panelSizes.preview} 
              minSize={15}
              className="rounded-r-lg border border-border/50 bg-white/70 backdrop-blur-sm transition-all dark:bg-background/70"
            >
              <PreviewPanel content={fullPrompt} onCopy={handleCopyFullPrompt} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
    </div>
  );
};

export default Index;
