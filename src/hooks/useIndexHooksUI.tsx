/**
 * UI state hooks for Index page
 *
 * @module hooks/useIndexHooksUI
 */
import { useIsMobile } from '@/hooks/useMobile';
import { usePanelState } from '@/hooks/usePanelState';
import { useWelcomeDialog } from '@/hooks/useWelcomeDialog';

/**
 * UI panel state type
 */
export type UIPanelState = {
  isMobile: boolean;
  panelSizes: Record<string, number>;
  handlePanelResize: (newSizes: number[]) => void;
  resetPanelSizes: () => void;
  activePanel: 'placeholders' | 'editor' | 'preview';
  setActivePanel: (panel: 'placeholders' | 'editor' | 'preview') => void;
};

/**
 * UI welcome state type
 */
export type UIWelcomeState = {
  showWelcome: boolean;
  handleSkipWelcome: () => void;
};

/**
 * Initializes UI state hooks
 * @returns UI state management hooks
 */
export function useUIStateHooks(): { isMobile: boolean } & ReturnType<typeof usePanelState> & ReturnType<typeof useWelcomeDialog> {
  const isMobile = useIsMobile();
  const panelState = usePanelState();
  const welcomeDialog = useWelcomeDialog();

  return { isMobile, ...panelState, ...welcomeDialog };
}

/**
 * Extracts UI panel state
 * @param {ReturnType<typeof useUIStateHooks>} ui UI state hooks
 * @returns UI panel state
 */
export function extractUIPanelState(ui: ReturnType<typeof useUIStateHooks>): UIPanelState {
  return {
    ...extractPanelBasicState(ui),
    ...extractPanelHandlers(ui)
  };
}

/**
 * Extracts panel basic state
 * @param {ReturnType<typeof useUIStateHooks>} ui UI state hooks
 * @returns Panel basic state
 */
function extractPanelBasicState(ui: ReturnType<typeof useUIStateHooks>): Pick<UIPanelState, 'isMobile' | 'panelSizes' | 'activePanel'> {
  return {
    isMobile: ui.isMobile,
    panelSizes: ui.panelSizes,
    activePanel: ui.activePanel
  };
}

/**
 * Extracts panel handlers
 * @param {ReturnType<typeof useUIStateHooks>} ui UI state hooks
 * @returns Panel handlers
 */
function extractPanelHandlers(ui: ReturnType<typeof useUIStateHooks>): Pick<UIPanelState, 'handlePanelResize' | 'resetPanelSizes' | 'setActivePanel'> {
  return {
    handlePanelResize: ui.handlePanelResize,
    resetPanelSizes: ui.resetPanelSizes,
    setActivePanel: ui.setActivePanel
  };
}

/**
 * Extracts UI welcome state
 * @param {ReturnType<typeof useUIStateHooks>} ui UI state hooks
 * @returns UI welcome state
 */
export function extractUIWelcomeState(ui: ReturnType<typeof useUIStateHooks>): UIWelcomeState {
  return {
    showWelcome: ui.showWelcome,
    handleSkipWelcome: ui.handleSkipWelcome
  };
}
