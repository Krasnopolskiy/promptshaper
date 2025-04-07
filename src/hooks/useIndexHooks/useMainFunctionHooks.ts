import { useMainFunctions } from '@/hooks/useMainFunctions';
import { useCoreHooks } from './useCoreHooks';
import { useUIStateHooks } from './useUIStateHooks';
import { useStateManagement } from './useStateManagement';
import { usePlaceholderHelperHooks } from './usePlaceholderHelperHooks';

/**
 * Parameters for main functions
 */
interface MainFunctionParams {
  core: ReturnType<typeof useCoreHooks>;
  ui: ReturnType<typeof useUIStateHooks>;
  state: ReturnType<typeof useStateManagement>;
  helpers: ReturnType<typeof usePlaceholderHelperHooks>;
}

/**
 * Configuration for main functions
 */
interface MainFunctionConfig {
  isMobile: boolean;
  promptText: string;
  cursorPosition: number;
  insertPlaceholderTag: (name: string, position: number) => number;
  setActivePanel: (panel: 'placeholders' | 'editor' | 'preview') => void;
  showInsertionToast: (name: string) => void;
  handleCopy: (content: string) => Promise<void>;
  copyablePrompt: string;
  resetPromptText: () => void;
  clearPlaceholders: () => void;
  resetPanelSizes: () => void;
  setFullPrompt: (text: string) => void;
  setCopyablePrompt: (text: string) => void;
}

/**
 * Creates basic config object from params
 *
 * @param {MainFunctionParams} params - Hook parameters
 * @returns {MainFunctionConfig} Basic configuration
 */
function createBasicConfig(params: MainFunctionParams): Pick<MainFunctionConfig, 'isMobile' | 'promptText' | 'cursorPosition'> {
  const { core, ui, state } = params;

  return {
    isMobile: ui.isMobile,
    promptText: core.promptText,
    cursorPosition: state.cursorPosition
  };
}

/**
 * Creates function config object from params - part 1
 *
 * @param {MainFunctionParams} params - Hook parameters
 * @returns {Object} Function configuration part 1
 */
function createFunctionConfigPart1(params: MainFunctionParams): Pick<MainFunctionConfig,
  'insertPlaceholderTag' | 'setActivePanel'
> {
  const { core, ui } = params;

  return {
    insertPlaceholderTag: core.insertPlaceholderTag,
    setActivePanel: ui.setActivePanel
  };
}

/**
 * Creates function config object from params - part 2
 *
 * @param {MainFunctionParams} params - Hook parameters
 * @returns {Object} Function configuration part 2
 */
function createFunctionConfigPart2(params: MainFunctionParams): Pick<MainFunctionConfig,
  'showInsertionToast' | 'handleCopy'
> {
  const { helpers } = params;

  return {
    showInsertionToast: helpers.showInsertionToast,
    handleCopy: helpers.handleCopy
  };
}

/**
 * Creates function config by combining parts
 *
 * @param {MainFunctionParams} params - Hook parameters
 * @returns {Object} Complete function configuration
 */
function createFunctionConfig(params: MainFunctionParams): Pick<MainFunctionConfig,
  'insertPlaceholderTag' | 'setActivePanel' | 'showInsertionToast' | 'handleCopy'
> {
  return {
    ...createFunctionConfigPart1(params),
    ...createFunctionConfigPart2(params)
  };
}

/**
 * Creates state config object from params - part 1
 *
 * @param {MainFunctionParams} params - Hook parameters
 * @returns {Object} State configuration part 1
 */
function createStateConfigPart1(params: MainFunctionParams): Pick<MainFunctionConfig,
  'copyablePrompt' | 'resetPromptText' | 'clearPlaceholders'
> {
  const { core, state } = params;

  return {
    copyablePrompt: state.copyablePrompt,
    resetPromptText: core.resetPromptText,
    clearPlaceholders: core.clearPlaceholders
  };
}

/**
 * Creates state config object from params - part 2
 *
 * @param {MainFunctionParams} params - Hook parameters
 * @returns {Object} State configuration part 2
 */
function createStateConfigPart2(params: MainFunctionParams): Pick<MainFunctionConfig,
  'resetPanelSizes' | 'setFullPrompt' | 'setCopyablePrompt'
> {
  const { ui, state } = params;

  return {
    resetPanelSizes: ui.resetPanelSizes,
    setFullPrompt: state.setFullPrompt,
    setCopyablePrompt: state.setCopyablePrompt
  };
}

/**
 * Creates state config by combining parts
 *
 * @param {MainFunctionParams} params - Hook parameters
 * @returns {Object} Complete state configuration
 */
function createStateConfig(params: MainFunctionParams): Pick<MainFunctionConfig,
  'copyablePrompt' | 'resetPromptText' | 'clearPlaceholders' | 'resetPanelSizes' |
  'setFullPrompt' | 'setCopyablePrompt'
> {
  return {
    ...createStateConfigPart1(params),
    ...createStateConfigPart2(params)
  };
}

/**
 * Prepares configuration for main functions
 *
 * @param {MainFunctionParams} params - Hook parameters
 * @returns {MainFunctionConfig} Configuration object for main functions
 */
function prepareMainFunctionConfig(params: MainFunctionParams): MainFunctionConfig {
  return {
    ...createBasicConfig(params),
    ...createFunctionConfig(params),
    ...createStateConfig(params)
  };
}

/**
 * Initializes main function hooks
 *
 * @param {MainFunctionParams} params - Hook parameters
 * @returns {ReturnType<typeof useMainFunctions>} Main function hooks
 */
export function useMainFunctionHooks(params: MainFunctionParams): ReturnType<typeof useMainFunctions> {
  const config = prepareMainFunctionConfig(params);
  return useMainFunctions(config);
}
