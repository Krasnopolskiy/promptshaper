import { useState } from 'react';
import { UseTemplateManagementReturn } from './types';

type DialogState = {
  isSaveDialogOpen: boolean;
  isLoadDialogOpen: boolean;
  isResetDialogOpen: boolean;
  setIsSaveDialogOpen: (open: boolean) => void;
  setIsLoadDialogOpen: (open: boolean) => void;
  setIsResetDialogOpen: (open: boolean) => void;
};

type TemplateDataState = {
  templateName: string;
  selectedTemplateId: string | null;
  setTemplateName: (name: string) => void;
  setSelectedTemplateId: (id: string | null) => void;
};

/**
 * Creates dialog state for template management
 * @returns {DialogState} Dialog state
 */
function useDialogState(): DialogState {
  return {
    isSaveDialogOpen: useState(false)[0],
    isLoadDialogOpen: useState(false)[0],
    isResetDialogOpen: useState(false)[0],
    setIsSaveDialogOpen: useState(false)[1],
    setIsLoadDialogOpen: useState(false)[1],
    setIsResetDialogOpen: useState(false)[1]
  };
}

/**
 * Creates template data state
 * @returns {TemplateDataState} Template data state
 */
function useTemplateDataState(): TemplateDataState {
  return {
    templateName: useState('')[0],
    selectedTemplateId: useState<string | null>(null)[0],
    setTemplateName: useState('')[1],
    setSelectedTemplateId: useState<string | null>(null)[1]
  };
}

/**
 * Creates state for template management
 * @returns {Object} Template management state
 */
export function useTemplateState(): Omit<UseTemplateManagementReturn, 'handleSaveTemplate' | 'handleLoadTemplate' | 'handleReset'> {
  return {
    ...useDialogState(),
    ...useTemplateDataState()
  };
}
