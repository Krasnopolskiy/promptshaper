import { useMainFunctions } from '@/hooks/useMainFunctions';
import { CoreHooks } from '../core/coreHooks';
import { CombinedState } from '../types/indexHooksTypes';
import { PlaceholderHelperHooks } from '../helpers/placeholderHelpers';

/**
 * Type for UI state hooks
 */
type UIStateHooks = {
  isMobile: boolean;
  panelSizes: Record<string, number>;
  handlePanelResize: (newSizes: number[]) => void;
  resetPanelSizes: () => void;
  activePanel: 'placeholders' | 'editor' | 'preview';
  setActivePanel: (panel: 'placeholders' | 'editor' | 'preview') => void;
  showWelcome: boolean;
  handleSkipWelcome: () => void;
};

/**
 * Type for basic config
 */
type BasicConfig = Pick<Parameters<typeof useMainFunctions>[0], 'isMobile' | 'promptText' | 'cursorPosition'>;

/**
 * Type for function config
 */
type FunctionConfig = Pick<Parameters<typeof useMainFunctions>[0], 'insertPlaceholderTag' | 'setActivePanel' | 'showInsertionToast' | 'handleCopy'>;

/**
 * Type for state config
 */
type StateConfig = Pick<Parameters<typeof useMainFunctions>[0], 'copyablePrompt' | 'resetPromptText' | 'clearPlaceholders' | 'resetPanelSizes' | 'setFullPrompt' | 'setCopyablePrompt'>;

/**
 * Type for main function config
 */
type MainFunctionConfig = BasicConfig & FunctionConfig & StateConfig;

/**
 * Creates basic config object from params
 * @param {Object} params Input parameters
 * @param {CoreHooks} params.core Core hooks
 * @param {UIStateHooks} params.ui UI state hooks
 * @param {CombinedState} params.state State management
 * @returns Basic configuration
 */
function createBasicConfig(params: { core: CoreHooks; ui: UIStateHooks; state: CombinedState }): BasicConfig {
  const { core, ui, state } = params;
  return { isMobile: ui.isMobile, promptText: core.promptText, cursorPosition: state.cursorPosition };
}

/**
 * Creates function config object from params
 * @param {Object} params Input parameters
 * @param {CoreHooks} params.core Core hooks
 * @param {UIStateHooks} params.ui UI state hooks
 * @param {PlaceholderHelperHooks} params.helpers Helper hooks
 * @returns Function configuration
 */
function createFunctionConfig(params: { core: CoreHooks; ui: UIStateHooks; helpers: PlaceholderHelperHooks }): FunctionConfig {
  const { core, ui, helpers } = params;
  return {
    insertPlaceholderTag: core.insertPlaceholderTag,
    setActivePanel: ui.setActivePanel,
    showInsertionToast: helpers.showInsertionToast,
    handleCopy: helpers.handleCopy
  };
}

/**
 * Creates prompt state config
 * @param {CombinedState} state State management for cursor and prompts
 * @returns Prompt state configuration
 */
function createPromptStateConfig(state: CombinedState): Pick<StateConfig, 'copyablePrompt' | 'setFullPrompt' | 'setCopyablePrompt'> {
  return {
    copyablePrompt: state.copyablePrompt,
    setFullPrompt: state.setFullPrompt,
    setCopyablePrompt: state.setCopyablePrompt
  };
}

/**
 * Creates reset state config
 * @param {Object} params Input parameters
 * @param {CoreHooks} params.core Core hooks
 * @param {UIStateHooks} params.ui UI state hooks
 * @returns Reset state configuration
 */
function createResetStateConfig(params: { core: CoreHooks; ui: UIStateHooks }): Pick<StateConfig, 'resetPromptText' | 'clearPlaceholders' | 'resetPanelSizes'> {
  const { core, ui } = params;
  return {
    resetPromptText: core.resetPromptText,
    clearPlaceholders: core.clearPlaceholders,
    resetPanelSizes: ui.resetPanelSizes
  };
}

/**
 * Creates state config object from params
 * @param {Object} params Input parameters
 * @param {CoreHooks} params.core Core hooks
 * @param {UIStateHooks} params.ui UI state hooks
 * @param {CombinedState} params.state State management
 * @returns State configuration
 */
function createStateConfig(params: { core: CoreHooks; ui: UIStateHooks; state: CombinedState }): StateConfig {
  const { core, ui, state } = params;
  return {
    ...createPromptStateConfig(state),
    ...createResetStateConfig({ core, ui })
  };
}

/**
 * Creates main function config
 * @param {Object} params Parameters for main functions
 * @param {CoreHooks} params.core Core hooks for placeholders and prompt
 * @param {UIStateHooks} params.ui UI state hooks for panel and mobile state
 * @param {CombinedState} params.state State management for cursor and prompts
 * @param {PlaceholderHelperHooks} params.helpers Helper hooks for placeholder operations
 * @returns Main function configuration
 */
function createMainFunctionConfig(params: { core: CoreHooks; ui: UIStateHooks; state: CombinedState; helpers: PlaceholderHelperHooks }): MainFunctionConfig {
  const { core, ui, state, helpers } = params;
  return {
    ...createBasicConfig({ core, ui, state }),
    ...createFunctionConfig({ core, ui, helpers }),
    ...createStateConfig({ core, ui, state })
  };
}

/**
 * Initializes main function hooks
 * @param {Object} params Parameters for main functions
 * @param {CoreHooks} params.core Core hooks for placeholders and prompt
 * @param {UIStateHooks} params.ui UI state hooks for panel and mobile state
 * @param {CombinedState} params.state State management for cursor and prompts
 * @param {PlaceholderHelperHooks} params.helpers Helper hooks for placeholder operations
 * @returns Main function hooks
 */
export function useMainFunctionHooks(params: { core: CoreHooks; ui: UIStateHooks; state: CombinedState; helpers: PlaceholderHelperHooks }): ReturnType<typeof useMainFunctions> {
  return useMainFunctions(createMainFunctionConfig(params));
}
