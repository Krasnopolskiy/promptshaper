/**
 * Header Dialogs Hook
 *
 * Manages the state and logic for header dialogs
 *
 * @module hooks/useHeaderDialogs
 */
import { useState } from 'react';
import { Placeholder, Template } from '@/types';
import { useTemplateManagement } from '@/hooks/useTemplateManagement';

interface UseHeaderDialogsProps {
  onSaveTemplate: (name: string, prompt: string, placeholders: Placeholder[]) => void;
  onLoadTemplate: (id: string) => Template | null;
  currentPrompt: string;
  setPrompt: (prompt: string) => void;
  setPlaceholders: (placeholders: Placeholder[]) => void;
  onReset?: () => void;
  toast: (props: { title: string; description: string; variant?: 'default' | 'destructive' }) => void;
}

interface DialogState {
  isSaveDialogOpen: boolean;
  isLoadDialogOpen: boolean;
  isResetDialogOpen: boolean;
  templateName: string;
  selectedTemplateId: string;
}

interface DialogActions {
  setIsSaveDialogOpen: (isOpen: boolean) => void;
  setIsLoadDialogOpen: (isOpen: boolean) => void;
  setIsResetDialogOpen: (isOpen: boolean) => void;
  setTemplateName: (name: string) => void;
  setSelectedTemplateId: (id: string) => void;
}

interface TemplateActions {
  handleSaveTemplate: () => void;
  handleLoadTemplate: () => void;
  handleReset: () => void;
}

interface UseHeaderDialogsReturn extends DialogState, DialogActions, TemplateActions {}

/**
 * Hook for managing header dialogs state
 * @returns {DialogState & DialogActions} Dialog state and actions
 */
function useDialogState(): DialogState & DialogActions {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');

  return {
    isSaveDialogOpen,
    isLoadDialogOpen,
    isResetDialogOpen,
    templateName,
    selectedTemplateId,
    setIsSaveDialogOpen,
    setIsLoadDialogOpen,
    setIsResetDialogOpen,
    setTemplateName,
    setSelectedTemplateId,
  };
}

/**
 * Hook for managing template actions
 * @param {UseHeaderDialogsProps} props - Hook props
 * @returns {TemplateActions} Template management functions
 */
function useTemplateActions(props: UseHeaderDialogsProps): TemplateActions {
  const {
    handleSaveTemplate,
    handleLoadTemplate,
    handleReset,
  } = useTemplateManagement(props);

  return {
    handleSaveTemplate,
    handleLoadTemplate,
    handleReset,
  };
}

/**
 * Hook for managing header dialogs
 * @param {UseHeaderDialogsProps} props - Hook props
 * @returns {UseHeaderDialogsReturn} Dialog management functions and state
 */
export function useHeaderDialogs(props: UseHeaderDialogsProps): UseHeaderDialogsReturn {
  const dialogState = useDialogState();
  const templateActions = useTemplateActions(props);

  return {
    ...dialogState,
    ...templateActions,
  };
}
