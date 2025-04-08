import { UseTemplateManagementProps } from './types';
import { ToastFunction } from '@/utils/header-utils';
import { getCurrentPlaceholders, showToast } from '@/utils/header-utils';

/**
 * Executes the template save operation
 * @param {Object} params - Save operation parameters
 * @param {string} params.templateName - Name of the template to save
 * @param {string} params.currentPrompt - Current prompt text
 * @param {Function} params.onSaveTemplate - Function to save the template
 * @param {ToastFunction} params.toast - Toast notification function
 * @param {Function} params.setIsSaveDialogOpen - Function to set save dialog state
 * @param {Function} params.setTemplateName - Function to set template name
 */
export function executeSaveTemplate(params: {
  templateName: string;
  currentPrompt: string;
  onSaveTemplate: UseTemplateManagementProps['onSaveTemplate'];
  toast: ToastFunction;
  setIsSaveDialogOpen: (isOpen: boolean) => void;
  setTemplateName: (name: string) => void;
}): void {
  try {
    const currentPlaceholders = getCurrentPlaceholders();
    params.onSaveTemplate(params.templateName, params.currentPrompt, currentPlaceholders);
    showToast(params.toast, 'Template saved', `"${params.templateName}" has been saved successfully.`);
    params.setIsSaveDialogOpen(false);
    params.setTemplateName('');
  } catch {
    showToast(params.toast, 'Error saving template', 'There was a problem saving your template.', 'destructive');
  }
}

/**
 * Creates save template handlers
 * @param {Object} params - Parameters for save handlers
 * @param {string} params.templateName - Name of the template to save
 * @param {string} params.currentPrompt - Current prompt text
 * @param {Function} params.onSaveTemplate - Function to save the template
 * @param {ToastFunction} params.toast - Toast notification function
 * @param {Function} params.setIsSaveDialogOpen - Function to set save dialog state
 * @param {Function} params.setTemplateName - Function to set template name
 * @returns {Object} Save template handlers
 */
export function createSaveHandlers(params: {
  templateName: string;
  currentPrompt: string;
  onSaveTemplate: UseTemplateManagementProps['onSaveTemplate'];
  toast: ToastFunction;
  setIsSaveDialogOpen: (isOpen: boolean) => void;
  setTemplateName: (name: string) => void;
}): { handleSaveTemplate: () => void } {
  /**
   * Handles saving a template
   * @returns {void}
   */
  const handleSaveTemplate = (): void => {
    if (!validateTemplateName(params.templateName, (title, description, variant) =>
      showToast(params.toast, title, description, variant)))
      return;

    executeSaveTemplate(params);
  };

  return { handleSaveTemplate };
}
