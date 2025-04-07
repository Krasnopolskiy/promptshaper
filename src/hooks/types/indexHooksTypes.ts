import { Dispatch, SetStateAction } from 'react';
import { Placeholder, Template } from '@/types/index';

/**
 * Return type for the useIndexHooks hook
 */
export interface UseIndexHooksReturn {
  // Core state and functions
  placeholders: Placeholder[];
  addPlaceholder: (name: string, content: string, color: string) => void;
  updatePlaceholder: (id: string, updates: Partial<Placeholder>) => void;
  deletePlaceholder: (id: string) => void;
  setPlaceholders: (placeholders: Placeholder[]) => void;
  clearPlaceholders: () => void;
  promptText: string;
  setPromptText: (text: string) => void;

  // Templates
  templates: Template[];
  saveTemplate: (name: string, prompt: string, placeholders: Placeholder[]) => Template;
  loadTemplate: (id: string) => Template | undefined;

  // UI state
  isMobile: boolean;
  panelSizes: Record<string, number>;
  handlePanelResize: (newSizes: number[]) => void;
  resetPanelSizes: () => void;
  activePanel: 'placeholders' | 'editor' | 'preview';
  setActivePanel: (panel: 'placeholders' | 'editor' | 'preview') => void;
  showWelcome: boolean;
  handleSkipWelcome: () => void;

  // Main handlers
  handleCopy: (content: string) => Promise<void>;
  handleInsertPlaceholderFromPanel: (name: string) => void;
  handleCopyFullPrompt: () => Promise<void>;
  handleReset: () => void;

  // Placeholders
  handleInsertPlaceholderAtPosition: (name: string, position: number) => number;
  handlePlaceholderNameChange: (oldName: string, newName: string) => void;

  // State values
  cursorPosition: number;
  setCursorPosition: (position: number) => void;
  fullPrompt: string;
  copyablePrompt: string;
}

/**
 * Combined state type
 */
export interface CombinedState {
  cursorPosition: number;
  setCursorPosition: (position: number) => void;
  fullPrompt: string;
  setFullPrompt: Dispatch<SetStateAction<string>>;
  copyablePrompt: string;
  setCopyablePrompt: Dispatch<SetStateAction<string>>;
}

/**
 * Parameters for createIndexHooksReturn
 */
export interface CreateIndexHooksParams {
  core: {
    placeholders: Placeholder[];
    addPlaceholder: (name: string, content: string, color: string) => void;
    updatePlaceholder: (id: string, updates: Partial<Placeholder>) => void;
    deletePlaceholder: (id: string) => void;
    setPlaceholders: (placeholders: Placeholder[]) => void;
    clearPlaceholders: () => void;
    promptText: string;
    setPromptText: (text: string) => void;
    generateFullPrompt: (text: string, placeholders: Placeholder[]) => string;
    generateCopyablePrompt: (text: string, placeholders: Placeholder[]) => string;
    copyToClipboard: (text: string) => Promise<boolean>;
  };
  ui: {
    isMobile: boolean;
    panelSizes: Record<string, number>;
    handlePanelResize: (newSizes: number[]) => void;
    resetPanelSizes: () => void;
    activePanel: 'placeholders' | 'editor' | 'preview';
    setActivePanel: (panel: 'placeholders' | 'editor' | 'preview') => void;
    showWelcome: boolean;
    handleSkipWelcome: () => void;
  };
  additional: {
    templates: Template[];
    saveTemplate: (template: { name: string; prompt: string; placeholders: Placeholder[] }) => Template;
    loadTemplate: (id: string) => Template | undefined;
  };
  state: CombinedState;
  helpers: {
    handleCopy: (content: string) => Promise<void>;
    handleInsertPlaceholderAtPosition: (name: string, position: number) => number;
    handlePlaceholderNameChange: (oldName: string, newName: string) => void;
    showInsertionToast: () => void;
  };
  main: {
    handleInsertPlaceholderFromPanel: (name: string) => void;
    handleCopyFullPrompt: () => Promise<void>;
    handleReset: () => void;
  };
}
