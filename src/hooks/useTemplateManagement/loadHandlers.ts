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
 * Updates editor state with template data
 * @param {Template} template - Template to load
 * @param {Function} setPrompt - Function to set prompt text
 * @param {Function} setPlaceholders - Function to set placeholders
 */
export function updateEditorState(
  template: Template,
  setPrompt: UseTemplateManagementProps['setPrompt'],
  setPlaceholders: UseTemplateManagementProps['setPlaceholders']
): void {
  setPrompt(template.prompt);
  setPlaceholders(template.placeholders);
}

/**
 * Shows success toast for template loading
 * @param {ToastFunction} toast - Toast notification function
 * @param {string} templateName - Name of loaded template
 */
export function showLoadSuccessToast(
  toast: ToastFunction,
  templateName: string
): void {
  showToast(toast, 'Template loaded', `"${templateName}" has been loaded successfully.`);
}

/**
 * Resets UI state after template loading
 * @param {Function} setIsLoadDialogOpen - Function to set load dialog state
 * @param {Function} setSelectedTemplateId - Function to set selected template ID
 */
export function resetUIState(
  setIsLoadDialogOpen: (isOpen: boolean) => void,
  setSelectedTemplateId: (id: string | null) => void
): void {
  setIsLoadDialogOpen(false);
  setSelectedTemplateId(null);
}

/**
 * Type for template loading parameters
 */
interface TemplateLoadingParams {
  template: Template | null;
  setPrompt: UseTemplateManagementProps['setPrompt'];
  setPlaceholders: UseTemplateManagementProps['setPlaceholders'];
  toast: ToastFunction;
  setIsLoadDialogOpen: (isOpen: boolean) => void;
  setSelectedTemplateId: (id: string | null) => void;
}

/**
 * Creates template loading parameters
 * @param {LoadHandlerParams} params - Load handler parameters
 * @param {Template | null} template - Template to load
 * @returns {TemplateLoadingParams} Template loading parameters
 */
function createLoadingParams(
  params: LoadHandlerParams,
  template: Template | null
): TemplateLoadingParams {
  const { setPrompt, setPlaceholders, toast, setIsLoadDialogOpen, setSelectedTemplateId } = params;
  return { template, setPrompt, setPlaceholders, toast, setIsLoadDialogOpen, setSelectedTemplateId };
}

/**
 * Processes template loading
 * @param {Object} params - Load operation parameters
 */
export function processTemplateLoading(params: TemplateLoadingParams): void {
  if (!params.template) return;

  const { template, setPrompt, setPlaceholders, toast, setIsLoadDialogOpen, setSelectedTemplateId } = params;
  updateEditorState(template, setPrompt, setPlaceholders);
  showLoadSuccessToast(toast, template.name);
  resetUIState(setIsLoadDialogOpen, setSelectedTemplateId);
}

/**
 * Interface for load handler parameters
 */
interface LoadHandlerParams {
  selectedTemplateId: string | null;
  onLoadTemplate: UseTemplateManagementProps['onLoadTemplate'];
  setPrompt: UseTemplateManagementProps['setPrompt'];
  setPlaceholders: UseTemplateManagementProps['setPlaceholders'];
  toast: ToastFunction;
  setIsLoadDialogOpen: (isOpen: boolean) => void;
  setSelectedTemplateId: (id: string | null) => void;
}

/**
 * Checks if template ID is valid
 * @param {string | null} id - Template ID to check
 * @param {ToastFunction} toast - Toast function
 * @returns {boolean} Whether ID is valid
 */
function isValidTemplateId(
  id: string | null,
  toast: ToastFunction
): boolean {
  if (!id) {
    showTemplateSelectionError(toast);
    return false;
  }
  return true;
}

/**
 * Loads template and processes it
 * @param {LoadHandlerParams} params - Load handler parameters
 */
function loadAndProcessTemplate(params: LoadHandlerParams): void {
  const template = params.onLoadTemplate(params.selectedTemplateId as string);
  const loadingParams = createLoadingParams(params, template);
  processTemplateLoading(loadingParams);
}

/**
 * Creates load template handlers
 * @param {LoadHandlerParams} params - Parameters for load handlers
 * @returns {Object} Load template handlers
 */
export function createLoadHandlers(params: LoadHandlerParams): {
  handleLoadTemplate: () => void
} {
  /**
   * Handles loading a template
   * @returns {void}
   */
  const handleLoadTemplate = (): void => {
    if (!isValidTemplateId(params.selectedTemplateId, params.toast)) return;
    loadAndProcessTemplate(params);
  };

  return { handleLoadTemplate };
}
