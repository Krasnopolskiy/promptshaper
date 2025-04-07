/**
 * Main functions for Index page
 *
 * @module hooks/useIndexHooksMain
 */
import { useMainFunctions } from '@/hooks/useMainFunctions';
import { UsePromptReturn } from '@/hooks/usePrompt';
import { UsePlaceholdersReturn } from '@/hooks/usePlaceholders';
import { PanelStateReturn } from '@/hooks/usePanelState';
import { WelcomeDialogReturn } from '@/hooks/useWelcomeDialog';
import { useStateManagement } from './useIndexHooksState';
import { usePlaceholderHelperHooks } from './useIndexHooksHelpers';

/**
 * Main function hooks parameters type
 */
type MainFunctionHooksParams = {
  core: UsePlaceholdersReturn & UsePromptReturn;
  ui: { isMobile: boolean } & PanelStateReturn & WelcomeDialogReturn;
  state: ReturnType<typeof useStateManagement>;
  helpers: ReturnType<typeof usePlaceholderHelperHooks>;
};

/**
 * Initializes main function hooks
 * @param {MainFunctionHooksParams} params Parameters for main functions
 * @returns Main function hooks
 */
export function useMainFunctionHooks(params: MainFunctionHooksParams): ReturnType<typeof useMainFunctions> {
  const config = createConfig(params);
  return useMainFunctions(config);
}

/**
 * Creates configuration for main functions
 * @param {MainFunctionHooksParams} params Parameters for configuration
 * @returns Configuration for main functions
 */
function createConfig(params: MainFunctionHooksParams): Parameters<typeof useMainFunctions>[0] {
  return {
    ...createBasicConfig(params),
    ...createStateConfig(params)
  };
}

/**
 * Creates basic configuration
 * @param {MainFunctionHooksParams} params Parameters for configuration
 * @returns Basic configuration
 */
function createBasicConfig(params: MainFunctionHooksParams): Parameters<typeof useMainFunctions>[0] {
  const uiConfig = extractUIBasicConfig(params.ui);
  const coreConfig = extractCoreBasicConfig(params.core);
  const stateConfig = extractStateBasicConfig(params.state);
  return { ...uiConfig, ...coreConfig, ...stateConfig };
}

/**
 * Extracts UI basic configuration
 * @param {ReturnType<typeof useUIStateHooks>} ui UI state hooks
 * @returns UI basic configuration
 */
function extractUIBasicConfig(ui: { isMobile: boolean } & PanelStateReturn & WelcomeDialogReturn): Pick<Parameters<typeof useMainFunctions>[0], 'isMobile' | 'setActivePanel' | 'showInsertionToast' | 'resetPanelSizes'> {
  return {
    isMobile: ui.isMobile,
    setActivePanel: ui.setActivePanel,
    /**
     * No-op function for showing insertion toast
     * @param {string} _name Name of the inserted item
     * @returns {void}
     */
    showInsertionToast: (_name: string): void => { /* No-op */ },
    resetPanelSizes: ui.resetPanelSizes
  };
}

/**
 * Creates clipboard handler
 * @param {UsePlaceholdersReturn & UsePromptReturn} core Core hooks
 * @returns Clipboard handler
 */
function createClipboardHandler(core: UsePlaceholdersReturn & UsePromptReturn): (content: string) => Promise<void> {
  return async (content: string): Promise<void> => {
    await core.copyToClipboard(content);
  };
}

/**
 * Extracts core basic configuration
 * @param {ReturnType<typeof useCoreHooks>} core Core hooks
 * @returns Core basic configuration
 */
function extractCoreBasicConfig(core: UsePlaceholdersReturn & UsePromptReturn): Pick<Parameters<typeof useMainFunctions>[0], 'promptText' | 'insertPlaceholderTag' | 'handleCopy' | 'resetPromptText' | 'clearPlaceholders'> {
  return {
    promptText: core.promptText,
    insertPlaceholderTag: core.insertPlaceholderTag,
    handleCopy: createClipboardHandler(core),
    resetPromptText: core.resetPromptText,
    clearPlaceholders: core.clearPlaceholders
  };
}

/**
 * Extracts state basic configuration
 * @param {ReturnType<typeof useStateManagement>} state State management
 * @returns State basic configuration
 */
function extractStateBasicConfig(state: ReturnType<typeof useStateManagement>): Pick<Parameters<typeof useMainFunctions>[0], 'cursorPosition' | 'copyablePrompt' | 'setFullPrompt' | 'setCopyablePrompt'> {
  return {
    cursorPosition: state.cursorPosition,
    copyablePrompt: state.copyablePrompt,
    setFullPrompt: state.setFullPrompt,
    setCopyablePrompt: state.setCopyablePrompt
  };
}

/**
 * Creates state configuration
 * @param {MainFunctionHooksParams} params Parameters for configuration
 * @returns State configuration
 */
function createStateConfig(params: MainFunctionHooksParams): Pick<Parameters<typeof useMainFunctions>[0], 'copyablePrompt' | 'resetPromptText' | 'clearPlaceholders' | 'resetPanelSizes' | 'setFullPrompt' | 'setCopyablePrompt'> {
  const stateValues = extractStateValues(params.state);
  const stateHandlers = extractStateHandlers(params);
  return { ...stateValues, ...stateHandlers };
}

/**
 * Extracts state values from state management
 * @param {ReturnType<typeof useStateManagement>} state State management
 * @returns State values
 */
function extractStateValues(state: ReturnType<typeof useStateManagement>): Pick<Parameters<typeof useMainFunctions>[0], 'copyablePrompt'> {
  return {
    copyablePrompt: state.copyablePrompt
  };
}

/**
 * Extracts state handlers from params
 * @param {MainFunctionHooksParams} params Parameters for configuration
 * @returns State handlers
 */
function extractStateHandlers(params: MainFunctionHooksParams): Pick<Parameters<typeof useMainFunctions>[0], 'resetPromptText' | 'clearPlaceholders' | 'resetPanelSizes' | 'setFullPrompt' | 'setCopyablePrompt'> {
  const coreHandlers = extractCoreStateHandlers(params.core);
  const uiHandlers = extractUIStateHandlers(params.ui);
  const stateHandlers = extractStateManagementHandlers(params.state);
  return { ...coreHandlers, ...uiHandlers, ...stateHandlers };
}

/**
 * Extracts core state handlers
 * @param {ReturnType<typeof useCoreHooks>} core Core hooks
 * @returns Core state handlers
 */
function extractCoreStateHandlers(core: UsePlaceholdersReturn & UsePromptReturn): Pick<Parameters<typeof useMainFunctions>[0], 'resetPromptText' | 'clearPlaceholders'> {
  return {
    resetPromptText: core.resetPromptText,
    clearPlaceholders: core.clearPlaceholders
  };
}

/**
 * Extracts UI state handlers
 * @param {ReturnType<typeof useUIStateHooks>} ui UI state hooks
 * @returns UI state handlers
 */
function extractUIStateHandlers(ui: { isMobile: boolean } & PanelStateReturn & WelcomeDialogReturn): Pick<Parameters<typeof useMainFunctions>[0], 'resetPanelSizes'> {
  return {
    resetPanelSizes: ui.resetPanelSizes
  };
}

/**
 * Extracts state management handlers
 * @param {ReturnType<typeof useStateManagement>} state State management
 * @returns State management handlers
 */
function extractStateManagementHandlers(state: ReturnType<typeof useStateManagement>): Pick<Parameters<typeof useMainFunctions>[0], 'setFullPrompt' | 'setCopyablePrompt'> {
  return {
    setFullPrompt: state.setFullPrompt,
    setCopyablePrompt: state.setCopyablePrompt
  };
}
