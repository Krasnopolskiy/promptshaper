import { useState } from 'react';
import { UseTemplateManagementReturn } from './types';

/**
 * Creates state for template management
 * @returns {Object} Template management state
 */
export function useTemplateState(): Omit<UseTemplateManagementReturn, 'handleSaveTemplate' | 'handleLoadTemplate' | 'handleReset'> {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

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
    setSelectedTemplateId
  };
}
