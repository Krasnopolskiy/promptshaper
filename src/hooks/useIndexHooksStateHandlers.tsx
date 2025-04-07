/**
 * @fileoverview State handlers for the Index page
 * @module hooks/useIndexHooksStateHandlers
 */

import { useStateManagement } from './useIndexHooksState';
import { UsePromptReturn } from '@/hooks/usePrompt';
import { UsePlaceholdersReturn } from '@/hooks/usePlaceholders';
import { PanelStateReturn } from '@/hooks/usePanelState';
import { WelcomeDialogReturn } from '@/hooks/useWelcomeDialog';

/**
 * Main function hooks parameters type
 */
type MainFunctionHooksParams = {
  core: UsePlaceholdersReturn & UsePromptReturn;
  ui: { isMobile: boolean } & PanelStateReturn & WelcomeDialogReturn;
  state: ReturnType<typeof useStateManagement>;
};

/**
 * Extracts core state handlers
 * @param {UsePlaceholdersReturn & UsePromptReturn} core Core hooks
 * @returns Core state handlers
 */
export function extractCoreStateHandlers(core: UsePlaceholdersReturn & UsePromptReturn): MainFunctionHooksParams['core'] {
  return {
    ...core,
    resetPromptText: core.resetPromptText,
    clearPlaceholders: core.clearPlaceholders
  };
}

/**
 * Extracts UI state handlers
 * @param {{ isMobile: boolean } & PanelStateReturn & WelcomeDialogReturn} ui UI state hooks
 * @returns UI state handlers
 */
export function extractUIStateHandlers(ui: { isMobile: boolean } & PanelStateReturn & WelcomeDialogReturn): MainFunctionHooksParams['ui'] {
  return {
    ...ui,
    resetPanelSizes: ui.resetPanelSizes
  };
}

/**
 * Extracts state management handlers
 * @param {ReturnType<typeof useStateManagement>} state State management
 * @returns State management handlers
 */
export function extractStateManagementHandlers(state: ReturnType<typeof useStateManagement>): MainFunctionHooksParams['state'] {
  return {
    ...state,
    setFullPrompt: state.setFullPrompt,
    setCopyablePrompt: state.setCopyablePrompt
  };
}

/**
 * Combines state handlers from different sources
 * @param {Object} handlers State handlers from different sources
 * @param {MainFunctionHooksParams['core']} handlers.core Core state handlers
 * @param {MainFunctionHooksParams['ui']} handlers.ui UI state handlers
 * @param {MainFunctionHooksParams['state']} handlers.state State management handlers
 * @returns Combined state handlers
 */
function combineStateHandlers(handlers: {
  core: MainFunctionHooksParams['core'];
  ui: MainFunctionHooksParams['ui'];
  state: MainFunctionHooksParams['state'];
}): MainFunctionHooksParams {
  const { core, ui, state } = handlers;
  return { core, ui, state };
}

/**
 * Extracts state handlers from params
 * @param {Object} params Parameters for configuration
 * @param {UsePlaceholdersReturn & UsePromptReturn} params.core Core hooks
 * @param {{ isMobile: boolean } & PanelStateReturn & WelcomeDialogReturn} params.ui UI state hooks
 * @param {ReturnType<typeof useStateManagement>} params.state State management
 * @returns State handlers
 */
export function extractStateHandlers(params: MainFunctionHooksParams): MainFunctionHooksParams {
  return combineStateHandlers({
    core: extractCoreStateHandlers(params.core),
    ui: extractUIStateHandlers(params.ui),
    state: extractStateManagementHandlers(params.state)
  });
}
