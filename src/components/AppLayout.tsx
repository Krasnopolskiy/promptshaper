/**
 * App Layout Component
 *
 * Main application layout with header and panels
 *
 * @module components/AppLayout
 */
import { Header } from '@/components/Header';
import { WelcomeDialog } from '@/components/WelcomeDialog';
import { MobilePanelView } from '@/components/MobilePanelView';
import { DesktopPanelView } from '@/components/DesktopPanelView';
import { Template, Placeholder } from '@/types';

/**
 * Props for the AppLayout component
 */
interface AppLayoutProps {
  /** Array of templates */
  templates: Template[];
  /** Function to save a template */
  saveTemplate: (name: string, prompt: string, placeholders: Placeholder[]) => Template;
  /** Function to load a template */
  loadTemplate: (id: string) => Template | null;
  /** Current prompt text */
  promptText: string;
  /** Function to set prompt text */
  setPromptText: (text: string) => void;
  /** Array of placeholders */
  placeholders: Placeholder[];
  /** Function to set placeholders */
  setPlaceholders: (placeholders: Placeholder[]) => void;
  /** Function to copy the full prompt */
  handleCopyFullPrompt: () => Promise<void>;
  /** Function to reset the application */
  handleReset: () => void;
  /** Whether to show the welcome dialog */
  showWelcome: boolean;
  /** Function to handle skipping the welcome dialog */
  handleSkipWelcome: () => void;
  /** Whether the device is mobile */
  isMobile: boolean;
  /** Currently active panel */
  activePanel: 'placeholders' | 'editor' | 'preview';
  /** Function to set active panel */
  setActivePanel: (panel: 'placeholders' | 'editor' | 'preview') => void;
  /** Function to add a placeholder */
  addPlaceholder: (name: string, content: string, color: string) => void;
  /** Function to update a placeholder */
  updatePlaceholder: (id: string, updates: Partial<Placeholder>) => void;
  /** Function to delete a placeholder */
  deletePlaceholder: (id: string) => void;
  /** Function to insert a placeholder from panel */
  handleInsertPlaceholderFromPanel: (name: string) => void;
  /** Function to insert a placeholder at position */
  handleInsertPlaceholderAtPosition: (name: string, position: number) => number;
  /** Function to handle placeholder name changes */
  handlePlaceholderNameChange: (oldName: string, newName: string) => void;
  /** Full prompt with placeholders filled */
  fullPrompt: string;
  /** Panel sizes configuration */
  panelSizes: { placeholders: number; editor: number; preview: number };
  /** Function to handle panel resize */
  handlePanelResize: (sizes: number[]) => void;
}

/**
 * Mobile UI section of the application
 * @param props Component props
 * @returns Mobile panel component
 */
function MobileUI({
  activePanel,
  setActivePanel,
  placeholders,
  addPlaceholder,
  updatePlaceholder,
  deletePlaceholder,
  handleInsertPlaceholderFromPanel,
  handleInsertPlaceholderAtPosition,
  handlePlaceholderNameChange,
  promptText,
  setPromptText,
  fullPrompt,
  handleCopyFullPrompt
}: Pick<
  AppLayoutProps,
  | 'activePanel'
  | 'setActivePanel'
  | 'placeholders'
  | 'addPlaceholder'
  | 'updatePlaceholder'
  | 'deletePlaceholder'
  | 'handleInsertPlaceholderFromPanel'
  | 'handleInsertPlaceholderAtPosition'
  | 'handlePlaceholderNameChange'
  | 'promptText'
  | 'setPromptText'
  | 'fullPrompt'
  | 'handleCopyFullPrompt'
>): JSX.Element {
  return (
    <MobilePanelView
      activePanel={activePanel}
      setActivePanel={setActivePanel}
      placeholders={placeholders}
      onAddPlaceholder={addPlaceholder}
      onUpdatePlaceholder={updatePlaceholder}
      onDeletePlaceholder={deletePlaceholder}
      onInsertPlaceholderFromPanel={handleInsertPlaceholderFromPanel}
      onInsertPlaceholderAtPosition={handleInsertPlaceholderAtPosition}
      onPlaceholderNameChange={handlePlaceholderNameChange}
      promptText={promptText}
      setPromptText={setPromptText}
      fullPrompt={fullPrompt}
      onCopyPrompt={handleCopyFullPrompt}
    />
  );
}

/**
 * Desktop UI section of the application
 * @param props Component props
 * @returns Desktop panel component
 */
function DesktopUI({
  panelSizes,
  handlePanelResize,
  placeholders,
  addPlaceholder,
  updatePlaceholder,
  deletePlaceholder,
  handleInsertPlaceholderFromPanel,
  handleInsertPlaceholderAtPosition,
  handlePlaceholderNameChange,
  promptText,
  setPromptText,
  fullPrompt,
  handleCopyFullPrompt
}: Pick<
  AppLayoutProps,
  | 'panelSizes'
  | 'handlePanelResize'
  | 'placeholders'
  | 'addPlaceholder'
  | 'updatePlaceholder'
  | 'deletePlaceholder'
  | 'handleInsertPlaceholderFromPanel'
  | 'handleInsertPlaceholderAtPosition'
  | 'handlePlaceholderNameChange'
  | 'promptText'
  | 'setPromptText'
  | 'fullPrompt'
  | 'handleCopyFullPrompt'
>): JSX.Element {
  return (
    <DesktopPanelView
      panelSizes={panelSizes}
      onPanelResize={handlePanelResize}
      placeholders={placeholders}
      onAddPlaceholder={addPlaceholder}
      onUpdatePlaceholder={updatePlaceholder}
      onDeletePlaceholder={deletePlaceholder}
      onInsertPlaceholderFromPanel={handleInsertPlaceholderFromPanel}
      onInsertPlaceholderAtPosition={handleInsertPlaceholderAtPosition}
      onPlaceholderNameChange={handlePlaceholderNameChange}
      promptText={promptText}
      setPromptText={setPromptText}
      fullPrompt={fullPrompt}
      onCopyPrompt={handleCopyFullPrompt}
    />
  );
}

/**
 * UI layout component that handles rendering
 * @param props Component props
 * @returns The rendered layout
 */
export function AppLayout(props: AppLayoutProps): JSX.Element {
  const {
    templates,
    saveTemplate,
    loadTemplate,
    promptText,
    setPromptText,
    placeholders,
    setPlaceholders,
    handleCopyFullPrompt,
    handleReset,
    showWelcome,
    handleSkipWelcome,
    isMobile
  } = props;

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

      {showWelcome && <WelcomeDialog onSkip={handleSkipWelcome} />}

      {isMobile ? <MobileUI {...props} /> : <DesktopUI {...props} />}
    </div>
  );
}
