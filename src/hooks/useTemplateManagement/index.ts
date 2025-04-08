import { UseTemplateManagementProps, UseTemplateManagementReturn } from './types';
import { useTemplateState } from './state';
import { createSaveHandlers } from './saveHandlers';
import { createLoadHandlers } from './loadHandlers';
import { createResetHandlers } from './resetHandlers';

/**
 * Creates save handlers for template management
 * @param {Object} params - Parameters for save handlers
 * @param {Object} params.state - Template management state
 * @param {UseTemplateManagementProps} params.props - Hook props
 * @returns {Object} Save handlers
 */
function createSaveHandlersForHook(params: {
  state: ReturnType<typeof useTemplateState>;
  props: UseTemplateManagementProps;
}): { handleSaveTemplate: () => void } {
  return createSaveHandlers({
    templateName: params.state.templateName,
    currentPrompt: params.props.currentPrompt,
    onSaveTemplate: params.props.onSaveTemplate,
    toast: params.props.toast,
    setIsSaveDialogOpen: params.state.setIsSaveDialogOpen,
    setTemplateName: params.state.setTemplateName
  });
}

/**
 * Creates load handlers for template management
 * @param {Object} params - Parameters for load handlers
 * @param {Object} params.state - Template management state
 * @param {UseTemplateManagementProps} params.props - Hook props
 * @returns {Object} Load handlers
 */
function createLoadHandlersForHook(params: {
  state: ReturnType<typeof useTemplateState>;
  props: UseTemplateManagementProps;
}): { handleLoadTemplate: () => void } {
  return createLoadHandlers({
    selectedTemplateId: params.state.selectedTemplateId,
    onLoadTemplate: params.props.onLoadTemplate,
    setPrompt: params.props.setPrompt,
    setPlaceholders: params.props.setPlaceholders,
    toast: params.props.toast,
    setIsLoadDialogOpen: params.state.setIsLoadDialogOpen,
    setSelectedTemplateId: params.state.setSelectedTemplateId
  });
}

/**
 * Creates reset handlers for template management
 * @param {Object} params - Parameters for reset handlers
 * @param {Object} params.state - Template management state
 * @param {UseTemplateManagementProps} params.props - Hook props
 * @returns {Object} Reset handlers
 */
function createResetHandlersForHook(params: {
  state: ReturnType<typeof useTemplateState>;
  props: UseTemplateManagementProps;
}): { handleReset: () => void } {
  return createResetHandlers({
    onReset: params.props.onReset,
    toast: params.props.toast,
    setIsResetDialogOpen: params.state.setIsResetDialogOpen
  });
}

/**
 * Creates handlers for template management
 * @param {Object} params - Parameters for handlers
 * @param {Object} params.state - Template management state
 * @param {UseTemplateManagementProps} params.props - Hook props
 * @returns {Object} Template management handlers
 */
function createHandlers(params: {
  state: ReturnType<typeof useTemplateState>;
  props: UseTemplateManagementProps;
}): Pick<UseTemplateManagementReturn, 'handleSaveTemplate' | 'handleLoadTemplate' | 'handleReset'> {
  const saveHandlers = createSaveHandlersForHook(params);
  const loadHandlers = createLoadHandlersForHook(params);
  const resetHandlers = createResetHandlersForHook(params);

  return {
    ...saveHandlers,
    ...loadHandlers,
    ...resetHandlers
  };
}

/**
 * Custom hook for template management
 * @param {UseTemplateManagementProps} props - Hook props
 * @returns {UseTemplateManagementReturn} State and functions for template management
 */
export function useTemplateManagement(props: UseTemplateManagementProps): UseTemplateManagementReturn {
  const state = useTemplateState();
  const handlers = createHandlers({ state, props });

  return {
    ...state,
    ...handlers
  };
}
