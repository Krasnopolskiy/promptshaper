/**
 * Main application page
 *
 * @module pages/Index
 */
import { AppLayout } from '@/components/AppLayout';
import { useIndexHooks } from '@/hooks/useIndexHooks';
import { Placeholder, Template } from '@/types';

// Define type parts separately to reduce function size
type CoreProps = {
  templates: Template[];
  saveTemplate: (name: string, prompt: string, placeholders: Placeholder[]) => Template;
  loadTemplate: (id: string) => Template | null;
  promptText: string;
  setPromptText: (text: string) => void;
};

type PlaceholderStateProps = {
  placeholders: Placeholder[];
  setPlaceholders: (placeholders: Placeholder[]) => void;
  addPlaceholder: (name: string, content: string, color: string) => void;
  updatePlaceholder: (id: string, updates: Partial<Placeholder>) => void;
  deletePlaceholder: (id: string) => void;
};

type PlaceholderInteractionProps = {
  handleInsertPlaceholderFromPanel: (name: string) => void;
  handleInsertPlaceholderAtPosition: (name: string, position: number) => number;
  handlePlaceholderNameChange: (oldName: string, newName: string) => void;
};

type UIStateProps = {
  showWelcome: boolean;
  handleSkipWelcome: () => void;
  isMobile: boolean;
  activePanel: 'placeholders' | 'editor' | 'preview';
  setActivePanel: (panel: 'placeholders' | 'editor' | 'preview') => void;
};

type UIInteractionProps = {
  handleCopyFullPrompt: () => Promise<void>;
  handleReset: () => void;
  fullPrompt: string;
  panelSizes: { placeholders: number; editor: number; preview: number };
  handlePanelResize: (sizes: number[]) => void;
};

type AppProps = CoreProps & PlaceholderStateProps & PlaceholderInteractionProps & UIStateProps & UIInteractionProps;

/**
 * Creates the core application props
 * @returns Core application props
 */
function useCoreProps(): CoreProps {
  const hooks = useIndexHooks();
  return {
    templates: hooks.templates,
    saveTemplate: hooks.saveTemplate,
    loadTemplate: hooks.loadTemplate,
    promptText: hooks.promptText,
    setPromptText: hooks.setPromptText
  };
}

/**
 * Creates the placeholder state props
 * @returns Placeholder state props
 */
function usePlaceholderStateProps(): PlaceholderStateProps {
  const hooks = useIndexHooks();
  return {
    placeholders: hooks.placeholders,
    setPlaceholders: hooks.setPlaceholders,
    addPlaceholder: hooks.addPlaceholder,
    updatePlaceholder: hooks.updatePlaceholder,
    deletePlaceholder: hooks.deletePlaceholder
  };
}

/**
 * Creates the placeholder interaction props
 * @returns Placeholder interaction props
 */
function usePlaceholderInteractionProps(): PlaceholderInteractionProps {
  const hooks = useIndexHooks();
  return {
    handleInsertPlaceholderFromPanel: hooks.handleInsertPlaceholderFromPanel,
    handleInsertPlaceholderAtPosition: hooks.handleInsertPlaceholderAtPosition,
    handlePlaceholderNameChange: hooks.handlePlaceholderNameChange
  };
}

/**
 * Creates the UI state props
 * @returns UI state props
 */
function useUIStateProps(): UIStateProps {
  const hooks = useIndexHooks();
  return {
    showWelcome: hooks.showWelcome,
    handleSkipWelcome: hooks.handleSkipWelcome,
    isMobile: hooks.isMobile,
    activePanel: hooks.activePanel,
    setActivePanel: hooks.setActivePanel
  };
}

/**
 * Creates the UI interaction props
 * @returns UI interaction props
 */
function useUIInteractionProps(): UIInteractionProps {
  const hooks = useIndexHooks();
  return {
    handleCopyFullPrompt: hooks.handleCopyFullPrompt,
    handleReset: hooks.handleReset,
    fullPrompt: hooks.fullPrompt,
    panelSizes: hooks.panelSizes,
    handlePanelResize: hooks.handlePanelResize
  };
}

/**
 * Creates the main application props
 * @returns The props for the app layout
 */
function useAppProps(): AppProps {
  return {
    ...useCoreProps(),
    ...usePlaceholderStateProps(),
    ...usePlaceholderInteractionProps(),
    ...useUIStateProps(),
    ...useUIInteractionProps()
  };
}

/**
 * Main application component
 * @returns The rendered application
 */
const Index = (): JSX.Element => {
  const props = useAppProps();
  return <AppLayout {...props} />;
}

export default Index;
