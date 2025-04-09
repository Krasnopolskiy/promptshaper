import { UseTemplateManagementProps, UseTemplateManagementReturn } from './types';
import { useTemplateState } from './state';
import { createSaveHandlers } from './saveHandlers';
import { createLoadHandlers } from './loadHandlers';
import { createResetHandlers } from './resetHandlers';

/**
 * Type for hook state
 */
type HookState = ReturnType<typeof useTemplateState>;

/**
 * Creates save handler parameters
 * @param {HookState} state - Hook state
 * @param {UseTemplateManagementProps} props - Hook props
 * @returns {Object} Save handler parameters
 */
function createSaveParams(
  state: HookState,
  props: UseTemplateManagementProps
): Parameters<typeof createSaveHandlers>[0] {
  const { templateName, setIsSaveDialogOpen, setTemplateName } = state;
  const { currentPrompt, onSaveTemplate, toast } = props;
  return { templateName, currentPrompt, onSaveTemplate, toast, setIsSaveDialogOpen, setTemplateName };
}

/**
 * Creates save handlers for template management
 * @param {Object} params - Parameters for handlers
 * @param {HookState} params.state - Template management state
 * @param {UseTemplateManagementProps} params.props - Hook props
 * @returns {Object} Save handlers
 */
function createSaveHandlersForHook({
  state,
  props
}: {
  state: HookState;
  props: UseTemplateManagementProps;
}): { handleSaveTemplate: () => void } {
  return createSaveHandlers(createSaveParams(state, props));
}

/**
 * Creates load handler state parameters
 * @param {HookState} state - Hook state
 * @returns {Pick<Parameters<typeof createLoadHandlers>[0], 'selectedTemplateId' | 'setIsLoadDialogOpen' | 'setSelectedTemplateId'>} State parameters
 */
function createLoadStateParams(
  state: HookState
): Pick<Parameters<typeof createLoadHandlers>[0], 'selectedTemplateId' | 'setIsLoadDialogOpen' | 'setSelectedTemplateId'> {
  return {
    selectedTemplateId: state.selectedTemplateId,
    setIsLoadDialogOpen: state.setIsLoadDialogOpen,
    setSelectedTemplateId: state.setSelectedTemplateId
  };
}

/**
 * Creates load handler props parameters
 * @param {UseTemplateManagementProps} props - Hook props
 * @returns {Pick<Parameters<typeof createLoadHandlers>[0], 'onLoadTemplate' | 'setPrompt' | 'setPlaceholders' | 'toast'>} Props parameters
 */
function createLoadPropsParams(
  props: UseTemplateManagementProps
): Pick<Parameters<typeof createLoadHandlers>[0], 'onLoadTemplate' | 'setPrompt' | 'setPlaceholders' | 'toast'> {
  return {
    onLoadTemplate: props.onLoadTemplate,
    setPrompt: props.setPrompt,
    setPlaceholders: props.setPlaceholders,
    toast: props.toast
  };
}

/**
 * Creates load handlers for template management
 * @param {Object} params - Parameters for handlers
 * @param {HookState} params.state - Template management state
 * @param {UseTemplateManagementProps} params.props - Hook props
 * @returns {Object} Load handlers
 */
function createLoadHandlersForHook(params: {
  state: HookState;
  props: UseTemplateManagementProps;
}): { handleLoadTemplate: () => void } {
  return createLoadHandlers({
    ...createLoadStateParams(params.state),
    ...createLoadPropsParams(params.props)
  });
}

/**
 * Creates reset handlers for template management
 * @param {Object} params - Parameters for handlers
 * @param {HookState} params.state - Template management state
 * @param {UseTemplateManagementProps} params.props - Hook props
 * @returns {Object} Reset handlers
 */
function createResetHandlersForHook(params: {
  state: HookState;
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
 * @param {HookState} params.state - Template management state
 * @param {UseTemplateManagementProps} params.props - Hook props
 * @returns {Object} Template management handlers
 */
function createHandlers(params: {
  state: HookState;
  props: UseTemplateManagementProps;
}): Pick<UseTemplateManagementReturn, 'handleSaveTemplate' | 'handleLoadTemplate' | 'handleReset'> {
  const saveHandlers = createSaveHandlersForHook(params);
  const loadHandlers = createLoadHandlersForHook(params);
  const resetHandlers = createResetHandlersForHook(params);
  return { ...saveHandlers, ...loadHandlers, ...resetHandlers };
}

/**
 * Custom hook for template management
 * @param {UseTemplateManagementProps} props - Hook props
 * @returns {UseTemplateManagementReturn} State and functions for template management
 */
export function useTemplateManagement(props: UseTemplateManagementProps): UseTemplateManagementReturn {
  const state = useTemplateState();
  const handlers = createHandlers({ state, props });
  return { ...state, ...handlers };
}
