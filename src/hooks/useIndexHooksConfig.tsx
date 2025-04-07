/**
 * @fileoverview Configuration functions for the Index page
 * @module hooks/useIndexHooksConfig
 */

import { useCoreHooks } from './useIndexHooksCore';
import { useUIStateHooks } from './useIndexHooksUI';
import { useStateManagement } from './useIndexHooksState';
import { usePlaceholderHelperHooks } from './useIndexHooksHelpers';
import type { UseMainFunctionsOptions } from './useMainFunctionsTypes';

/**
 * Configuration types
 */
type BasicConfig = Pick<UseMainFunctionsOptions, 'isMobile' | 'promptText' | 'insertPlaceholderTag' | 'setActivePanel' | 'showInsertionToast'>;
type StateConfig = Pick<UseMainFunctionsOptions, 'setFullPrompt' | 'setCopyablePrompt'>;
type HelperConfig = Pick<UseMainFunctionsOptions, 'resetPromptText' | 'clearPlaceholders' | 'resetPanelSizes'>;
type InitialConfig = Pick<UseMainFunctionsOptions, 'cursorPosition' | 'copyToClipboard' | 'showCopyToast'>;
type ConfigParts = {
  basic: BasicConfig;
  state: StateConfig;
  helper: HelperConfig;
  initial: InitialConfig;
};

/**
 * Creates basic UI configuration
 * @param {ReturnType<typeof useUIStateHooks>} ui UI state hooks
 * @returns Basic UI configuration
 */
function createBasicUIConfig(ui: ReturnType<typeof useUIStateHooks>): Pick<UseMainFunctionsOptions, 'isMobile' | 'setActivePanel'> {
  return {
    isMobile: ui.isMobile,
    setActivePanel: ui.setActivePanel
  };
}

/**
 * Creates basic core configuration
 * @param {ReturnType<typeof useCoreHooks>} core Core hooks
 * @returns Basic core configuration
 */
function createBasicCoreConfig(core: ReturnType<typeof useCoreHooks>): Pick<UseMainFunctionsOptions, 'promptText' | 'insertPlaceholderTag'> {
  return {
    promptText: core.promptText,
    insertPlaceholderTag: core.insertPlaceholderTag
  };
}

/**
 * Creates basic configuration
 * @param {Object} params Parameters for configuration
 * @param {ReturnType<typeof useCoreHooks>} params.core Core hooks
 * @param {ReturnType<typeof useUIStateHooks>} params.ui UI state hooks
 * @returns Basic configuration
 */
export function createBasicConfig(params: {
  core: ReturnType<typeof useCoreHooks>;
  ui: ReturnType<typeof useUIStateHooks>;
}): BasicConfig {
  return {
    ...createBasicUIConfig(params.ui),
    ...createBasicCoreConfig(params.core),
    /**
     * No-op function for showing insertion toast
     * @param {string} _name Name of the placeholder
     */
    showInsertionToast: (_name: string): void => { /* No-op */ }
  };
}

/**
 * Creates state configuration
 * @param {Object} params Parameters for configuration
 * @param {ReturnType<typeof useStateManagement>} params.state State management
 * @returns State configuration
 */
export function createStateConfig(params: {
  state: ReturnType<typeof useStateManagement>;
}): StateConfig {
  return {
    setFullPrompt: params.state.setFullPrompt,
    setCopyablePrompt: params.state.setCopyablePrompt
  };
}

/**
 * Creates helper configuration
 * @param {Object} params Parameters for configuration
 * @param {ReturnType<typeof useCoreHooks>} params.core Core hooks
 * @param {ReturnType<typeof useUIStateHooks>} params.ui UI state hooks
 * @returns Helper configuration
 */
function createHelperConfig(params: {
  core: ReturnType<typeof useCoreHooks>;
  ui: ReturnType<typeof useUIStateHooks>;
}): HelperConfig {
  return {
    resetPromptText: params.core.resetPromptText,
    clearPlaceholders: params.core.clearPlaceholders,
    resetPanelSizes: params.ui.resetPanelSizes
  };
}

/**
 * Creates initial configuration with default values
 * @returns Initial configuration with default values for cursor position and clipboard functions
 */
function createInitialConfig(): InitialConfig {
  return {
    cursorPosition: 0,
    /**
     * No-op function for copying to clipboard
     * @returns Promise that resolves when copy is complete
     */
    copyToClipboard: async (): Promise<void> => { /* No-op */ },
    /**
     * No-op function for showing copy toast
     */
    showCopyToast: (): void => { /* No-op */ }
  };
}

/**
 * Merges first part of configurations
 * @param {BasicConfig} basic Basic configuration
 * @param {StateConfig} state State configuration
 * @returns Partial configuration
 */
function mergeFirstPart(basic: BasicConfig, state: StateConfig): Partial<UseMainFunctionsOptions> {
  return { ...basic, ...state };
}

/**
 * Merges second part of configurations
 * @param {HelperConfig} helper Helper configuration
 * @param {InitialConfig} initial Initial configuration
 * @returns Partial configuration
 */
function mergeSecondPart(helper: HelperConfig, initial: InitialConfig): Partial<UseMainFunctionsOptions> {
  return { ...helper, ...initial };
}

/**
 * Combines all configurations into a single configuration object
 * @param {ConfigParts} configs Configurations to combine
 * @returns Combined configuration
 */
function combineConfigs(configs: ConfigParts): UseMainFunctionsOptions {
  const firstPart = mergeFirstPart(configs.basic, configs.state);
  const secondPart = mergeSecondPart(configs.helper, configs.initial);
  return { ...firstPart, ...secondPart } as UseMainFunctionsOptions;
}

/**
 * Creates basic and state configuration parts
 * @param {Object} params Parameters for configuration
 * @param {ReturnType<typeof useCoreHooks>} params.core Core hooks
 * @param {ReturnType<typeof useUIStateHooks>} params.ui UI state hooks
 * @param {ReturnType<typeof useStateManagement>} params.state State management
 * @returns Basic and state configuration parts
 */
function createBasicAndStateConfigParts(params: {
  core: ReturnType<typeof useCoreHooks>;
  ui: ReturnType<typeof useUIStateHooks>;
  state: ReturnType<typeof useStateManagement>;
}): Pick<ConfigParts, 'basic' | 'state'> {
  return {
    basic: createBasicConfig(params),
    state: createStateConfig(params)
  };
}

/**
 * Creates helper and initial configuration parts
 * @param {Object} params Parameters for configuration
 * @param {ReturnType<typeof useCoreHooks>} params.core Core hooks
 * @param {ReturnType<typeof useUIStateHooks>} params.ui UI state hooks
 * @returns Helper and initial configuration parts
 */
function createHelperAndInitialConfigParts(params: {
  core: ReturnType<typeof useCoreHooks>;
  ui: ReturnType<typeof useUIStateHooks>;
}): Pick<ConfigParts, 'helper' | 'initial'> {
  return {
    helper: createHelperConfig(params),
    initial: createInitialConfig()
  };
}

/**
 * Creates all configuration parts
 * @param {Object} params Parameters for configuration
 * @param {ReturnType<typeof useCoreHooks>} params.core Core hooks
 * @param {ReturnType<typeof useUIStateHooks>} params.ui UI state hooks
 * @param {ReturnType<typeof useStateManagement>} params.state State management
 * @returns Configuration parts
 */
function createConfigParts(params: {
  core: ReturnType<typeof useCoreHooks>;
  ui: ReturnType<typeof useUIStateHooks>;
  state: ReturnType<typeof useStateManagement>;
}): ConfigParts {
  const basicAndState = createBasicAndStateConfigParts(params);
  const helperAndInitial = createHelperAndInitialConfigParts(params);
  return { ...basicAndState, ...helperAndInitial };
}

/**
 * Creates handle copy function for the configuration
 * @param {ReturnType<typeof usePlaceholderHelperHooks>} helpers Placeholder helper hooks
 * @returns Copy handler function
 */
function createHandleCopy(helpers: ReturnType<typeof usePlaceholderHelperHooks>): (content: string) => Promise<void> {
  /**
   * Copies content to clipboard
   * @param {string} content Content to copy
   * @returns Promise that resolves when copy is complete
   */
  return async (content: string): Promise<void> => {
    if (helpers.handleCopy) {
      await helpers.handleCopy(content);
    }
  };
}

/**
 * Type for handler properties
 */
type HandlerProperties = {
  handleCopy: (content: string) => Promise<void>;
  copyablePrompt: string;
};

/**
 * Adds required handler properties to the configuration
 * @param {ReturnType<typeof usePlaceholderHelperHooks>} helpers Helper hooks
 * @param {string} copyablePrompt Copyable prompt text
 * @returns Extended configuration with required handlers
 */
function addRequiredHandlers(
  helpers: ReturnType<typeof usePlaceholderHelperHooks>,
  copyablePrompt: string
): HandlerProperties {
  return {
    handleCopy: createHandleCopy(helpers),
    copyablePrompt
  };
}

/**
 * Creates final configuration
 * @param {ReturnType<typeof combineConfigs>} config Basic configuration
 * @param {HandlerProperties} handlers Additional handlers with handleCopy and copyablePrompt
 * @returns Complete configuration
 */
function createFinalConfig(
  config: ReturnType<typeof combineConfigs>,
  handlers: HandlerProperties
): UseMainFunctionsOptions {
  return { ...config, ...handlers } as UseMainFunctionsOptions;
}

/**
 * Creates basic configuration parts
 * @param {Object} params Configuration parameters
 * @param {ReturnType<typeof useCoreHooks>} params.core Core hooks
 * @param {ReturnType<typeof useUIStateHooks>} params.ui UI state hooks
 * @param {ReturnType<typeof useStateManagement>} params.state State management
 * @returns Basic configuration
 */
function createBasicConfiguration(params: {
  core: ReturnType<typeof useCoreHooks>;
  ui: ReturnType<typeof useUIStateHooks>;
  state: ReturnType<typeof useStateManagement>;
}): ReturnType<typeof combineConfigs> {
  const configParts = createConfigParts(params);
  return combineConfigs(configParts);
}

/**
 * Creates handlers configuration
 * @param {ReturnType<typeof usePlaceholderHelperHooks>} helpers Helper hooks
 * @param {string} copyablePrompt Copyable prompt text
 * @returns Handler properties
 */
function createHandlersConfiguration(
  helpers: ReturnType<typeof usePlaceholderHelperHooks>,
  copyablePrompt: string
): HandlerProperties {
  return addRequiredHandlers(helpers, copyablePrompt);
}

/**
 * Creates and combines all configuration components
 * @param {Object} params All required parameters
 * @param {ReturnType<typeof useCoreHooks>} params.core Core hooks
 * @param {ReturnType<typeof useUIStateHooks>} params.ui UI state hooks
 * @param {ReturnType<typeof useStateManagement>} params.state State management
 * @param {ReturnType<typeof usePlaceholderHelperHooks>} params.helpers Helper hooks
 * @returns Combined configuration
 */
function createAndCombineConfig(params: { core: ReturnType<typeof useCoreHooks>; ui: ReturnType<typeof useUIStateHooks>; state: ReturnType<typeof useStateManagement>; helpers: ReturnType<typeof usePlaceholderHelperHooks>; }): UseMainFunctionsOptions {
  return createFinalConfig(createBasicConfiguration(params), createHandlersConfiguration(params.helpers, params.state.copyablePrompt || ''));
}

/**
 * Creates configuration for main functions
 * @param {Object} params Parameters for configuration
 * @param {ReturnType<typeof useCoreHooks>} params.core Core hooks
 * @param {ReturnType<typeof useUIStateHooks>} params.ui UI state hooks
 * @param {ReturnType<typeof useStateManagement>} params.state State management
 * @param {ReturnType<typeof usePlaceholderHelperHooks>} params.helpers Helper hooks
 * @returns Configuration for main functions
 */
export function createConfig(params: {
  core: ReturnType<typeof useCoreHooks>;
  ui: ReturnType<typeof useUIStateHooks>;
  state: ReturnType<typeof useStateManagement>;
  helpers: ReturnType<typeof usePlaceholderHelperHooks>;
}): UseMainFunctionsOptions {
  return createAndCombineConfig(params);
}
