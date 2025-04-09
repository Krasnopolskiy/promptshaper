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

type DialogVisibilityState = Pick<DialogState, 'isSaveDialogOpen' | 'isLoadDialogOpen' | 'isResetDialogOpen'>;
type DialogVisibilityActions = Pick<DialogActions, 'setIsSaveDialogOpen' | 'setIsLoadDialogOpen' | 'setIsResetDialogOpen'>;
type DialogVisibilityReturn = DialogVisibilityState & DialogVisibilityActions;

/**
 * Hook for managing dialog visibility state
 * @returns {DialogVisibilityReturn} Dialog visibility state and actions
 */
function useDialogVisibility(): DialogVisibilityReturn {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false), [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false), [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  return { isSaveDialogOpen, isLoadDialogOpen, isResetDialogOpen, setIsSaveDialogOpen, setIsLoadDialogOpen, setIsResetDialogOpen };
}

/**
 * Hook for managing template selection state
 * @returns {Pick<DialogState, 'templateName' | 'selectedTemplateId'> & Pick<DialogActions, 'setTemplateName' | 'setSelectedTemplateId'>} Template selection state and actions
 */
function useTemplateSelection(): Pick<DialogState, 'templateName' | 'selectedTemplateId'> & Pick<DialogActions, 'setTemplateName' | 'setSelectedTemplateId'> {
  const [templateName, setTemplateName] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');

  return {
    templateName,
    selectedTemplateId,
    setTemplateName,
    setSelectedTemplateId
  };
}

/**
 * Hook for managing dialog state
 * @returns {DialogState & DialogActions} Dialog state and actions
 */
function useDialogState(): DialogState & DialogActions {
  const visibility = useDialogVisibility();
  const selection = useTemplateSelection();

  return {
    ...visibility,
    ...selection
  };
}

/**
 * Hook for managing template actions
 * @param {UseHeaderDialogsProps} props - Hook props
 * @returns {TemplateActions} Template management functions
 */
function useTemplateActions(props: UseHeaderDialogsProps): TemplateActions {
  return useTemplateManagement(props);
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
    ...templateActions
  };
}
