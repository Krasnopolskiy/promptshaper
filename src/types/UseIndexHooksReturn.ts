/**
 * @fileoverview Return type for the useIndexHooks hook
 * @module types/UseIndexHooksReturn
 */
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
