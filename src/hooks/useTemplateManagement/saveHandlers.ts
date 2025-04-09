import { UseTemplateManagementProps } from './types';
import { ToastFunction } from '@/utils/header-utils';
import { getCurrentPlaceholders, showToast } from '@/utils/header-utils';

/**
 * Type for toast variant
 */
type ToastVariant = 'default' | 'destructive';

/**
 * Shows success toast after saving template
 * @param {ToastFunction} toast - Toast notification function
 * @param {string} templateName - Name of saved template
 */
function showSuccessToast(toast: ToastFunction, templateName: string): void {
  showToast(toast, 'Template saved', `"${templateName}" has been saved successfully.`);
}

/**
 * Shows error toast when saving fails
 * @param {ToastFunction} toast - Toast notification function
 */
function showErrorToast(toast: ToastFunction): void {
  showToast(toast, 'Error saving template', 'There was a problem saving your template.', 'destructive');
}

/**
 * Resets UI state after save operation
 * @param {Function} setIsSaveDialogOpen - Function to set dialog state
 * @param {Function} setTemplateName - Function to set template name
 */
function resetUIState(
  setIsSaveDialogOpen: (isOpen: boolean) => void,
  setTemplateName: (name: string) => void
): void {
  setIsSaveDialogOpen(false);
  setTemplateName('');
}

/**
 * Performs the actual save operation
 * @param {Object} params - Parameters for save
 * @param {Function} onSaveTemplate - Save function
 * @param {string} templateName - Template name
 * @param {string} currentPrompt - Current prompt
 */
function performSave(
  onSaveTemplate: UseTemplateManagementProps['onSaveTemplate'],
  templateName: string,
  currentPrompt: string
): void {
  const currentPlaceholders = getCurrentPlaceholders();
  onSaveTemplate(templateName, currentPrompt, currentPlaceholders);
}

/**
 * Validates template name
 * @param {string} name - Template name to validate
 * @param {Function} showToastFn - Function to show toast messages
 * @returns {boolean} Whether template name is valid
 */
function validateTemplateName(
  name: string,
  showToastFn: (title: string, description: string, variant?: ToastVariant) => void
): boolean {
  if (!name.trim()) {
    showToastFn('Invalid template name', 'Please enter a name for the template.', 'destructive');
    return false;
  }
  return true;
}

/**
 * Parameters for save operation
 */
interface SaveParams {
  templateName: string;
  currentPrompt: string;
  onSaveTemplate: UseTemplateManagementProps['onSaveTemplate'];
  toast: ToastFunction;
  setIsSaveDialogOpen: (isOpen: boolean) => void;
  setTemplateName: (name: string) => void;
}

/**
 * Executes the template save operation
 * @param {SaveParams} params - Save operation parameters
 */
export function executeSaveTemplate(params: SaveParams): void {
  try {
    performSave(params.onSaveTemplate, params.templateName, params.currentPrompt);
    showSuccessToast(params.toast, params.templateName);
    resetUIState(params.setIsSaveDialogOpen, params.setTemplateName);
  } catch {
    showErrorToast(params.toast);
  }
}

/**
 * Creates a toast handler
 * @param {ToastFunction} toast - Toast function
 * @returns {Function} Formatted toast handler
 */
function createToastHandler(
  toast: ToastFunction
): (title: string, description: string, variant?: ToastVariant) => void {
  return (title, description, variant) =>
    showToast(toast, title, description, variant);
}

/**
 * Creates the save template handler function
 * @param {SaveParams} params - Parameters for handler
 * @param {Function} toastHandler - Toast handler function
 * @returns {() => void} Save template handler
 */
function createSaveHandler(
  params: SaveParams,
  toastHandler: (title: string, description: string, variant?: ToastVariant) => void
): () => void {
  return (): void => {
    if (!validateTemplateName(params.templateName, toastHandler)) return;
    executeSaveTemplate(params);
  };
}

/**
 * Creates save template handlers
 * @param {SaveParams} params - Parameters for save handlers
 * @returns {Object} Save template handlers
 */
export function createSaveHandlers(params: SaveParams): {
  handleSaveTemplate: () => void
} {
  const toastHandler = createToastHandler(params.toast);
  const handleSaveTemplate = createSaveHandler(params, toastHandler);
  return { handleSaveTemplate };
}
