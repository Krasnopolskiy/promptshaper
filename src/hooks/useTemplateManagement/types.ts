import { Placeholder, Template } from '@/types';
import { ToastFunction } from '@/utils/header-utils';

/**
 * Template management hook props
 * @interface UseTemplateManagementProps
 */
export interface UseTemplateManagementProps {
  /** Function to save a template */
  onSaveTemplate: (name: string, prompt: string, placeholders: Placeholder[]) => void;
  /** Function to load a template */
  onLoadTemplate: (id: string) => Template | null;
  /** Current prompt text */
  currentPrompt: string;
  /** Function to set prompt text */
  setPrompt: (text: string) => void;
  /** Function to set placeholders */
  setPlaceholders: (placeholders: Placeholder[]) => void;
  /** Function to reset the application */
  onReset?: () => void;
  /** Toast function for notifications */
  toast: ToastFunction;
}

/**
 * Hook return type
 * @interface UseTemplateManagementReturn
 */
export interface UseTemplateManagementReturn {
  /** Whether save dialog is open */
  isSaveDialogOpen: boolean;
  /** Whether load dialog is open */
  isLoadDialogOpen: boolean;
  /** Whether reset dialog is open */
  isResetDialogOpen: boolean;
  /** Current template name */
  templateName: string;
  /** Currently selected template ID */
  selectedTemplateId: string | null;
  /** Function to set save dialog open state */
  setIsSaveDialogOpen: (isOpen: boolean) => void;
  /** Function to set load dialog open state */
  setIsLoadDialogOpen: (isOpen: boolean) => void;
  /** Function to set reset dialog open state */
  setIsResetDialogOpen: (isOpen: boolean) => void;
  /** Function to set template name */
  setTemplateName: (name: string) => void;
  /** Function to set selected template ID */
  setSelectedTemplateId: (id: string) => void;
  /** Function to handle save template action */
  handleSaveTemplate: () => void;
  /** Function to handle load template action */
  handleLoadTemplate: () => void;
  /** Function to handle reset action */
  handleReset: () => void;
}
