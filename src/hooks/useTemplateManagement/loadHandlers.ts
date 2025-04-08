import { Template } from '@/types';
import { UseTemplateManagementProps } from './types';
import { ToastFunction } from '@/utils/header-utils';
import { showToast } from '@/utils/header-utils';

/**
 * Shows template selection error toast
 * @param {ToastFunction} toast - Toast notification function
 */
export function showTemplateSelectionError(toast: ToastFunction): void {
  showToast(
    toast,
    'No template selected',
    'Please select a template to load.',
    'destructive'
  );
}

/**
 * Processes template loading
 * @param {Object} params - Load operation parameters
 * @param {Template | null} params.template - Template to load
 * @param {Function} params.setPrompt - Function to set prompt text
 * @param {Function} params.setPlaceholders - Function to set placeholders
 * @param {ToastFunction} params.toast - Toast notification function
 * @param {Function} params.setIsLoadDialogOpen - Function to set load dialog state
 * @param {Function} params.setSelectedTemplateId - Function to set selected template ID
 */
export function processTemplateLoading(params: {
  template: Template | null;
  setPrompt: UseTemplateManagementProps['setPrompt'];
  setPlaceholders: UseTemplateManagementProps['setPlaceholders'];
  toast: ToastFunction;
  setIsLoadDialogOpen: (isOpen: boolean) => void;
  setSelectedTemplateId: (id: string | null) => void;
}): void {
  if (params.template) {
    params.setPrompt(params.template.prompt);
    params.setPlaceholders(params.template.placeholders);
    showToast(params.toast, 'Template loaded', `"${params.template.name}" has been loaded successfully.`);
    params.setIsLoadDialogOpen(false);
    params.setSelectedTemplateId(null);
  }
}

/**
 * Creates load template handlers
 * @param {Object} params - Parameters for load handlers
 * @param {string | null} params.selectedTemplateId - ID of the selected template
 * @param {Function} params.onLoadTemplate - Function to load the template
 * @param {Function} params.setPrompt - Function to set prompt text
 * @param {Function} params.setPlaceholders - Function to set placeholders
 * @param {ToastFunction} params.toast - Toast notification function
 * @param {Function} params.setIsLoadDialogOpen - Function to set load dialog state
 * @param {Function} params.setSelectedTemplateId - Function to set selected template ID
 * @returns {Object} Load template handlers
 */
export function createLoadHandlers(params: {
  selectedTemplateId: string | null;
  onLoadTemplate: UseTemplateManagementProps['onLoadTemplate'];
  setPrompt: UseTemplateManagementProps['setPrompt'];
  setPlaceholders: UseTemplateManagementProps['setPlaceholders'];
  toast: ToastFunction;
  setIsLoadDialogOpen: (isOpen: boolean) => void;
  setSelectedTemplateId: (id: string | null) => void;
}): { handleLoadTemplate: () => void } {
  /**
   * Handles loading a template
   * @returns {void}
   */
  const handleLoadTemplate = (): void => {
    if (!params.selectedTemplateId) {
      showTemplateSelectionError(params.toast);
      return;
    }

    const template = params.onLoadTemplate(params.selectedTemplateId);
    processTemplateLoading({
      template,
      setPrompt: params.setPrompt,
      setPlaceholders: params.setPlaceholders,
      toast: params.toast,
      setIsLoadDialogOpen: params.setIsLoadDialogOpen,
      setSelectedTemplateId: params.setSelectedTemplateId
    });
  };

  return { handleLoadTemplate };
}
