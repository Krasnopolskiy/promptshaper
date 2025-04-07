import { useState, useEffect } from 'react';

/**
 * Default panel sizes
 */
const DEFAULT_PANEL_SIZES: Record<string, number> = {
  placeholders: 30,
  editor: 40,
  preview: 30
};

/**
 * Type for panel state
 */
type PanelState = {
  panelSizes: Record<string, number>;
  handlePanelResize: (newSizes: Record<string, number>) => void;
  resetPanelSizes: () => void;
  activePanel: 'placeholders' | 'editor' | 'preview';
  setActivePanel: (panel: 'placeholders' | 'editor' | 'preview') => void;
};

/**
 * Type for welcome dialog state
 */
type WelcomeDialogState = {
  showWelcome: boolean;
  handleSkipWelcome: () => void;
};

/**
 * Type for UI state hooks
 */
type UIStateHooks = { isMobile: boolean } & PanelState & WelcomeDialogState;

/**
 * Type for panel state parameters
 */
type PanelStateParams = {
  panelSizes: Record<string, number>;
  setPanelSizes: (sizes: Record<string, number>) => void;
  activePanel: 'placeholders' | 'editor' | 'preview';
  setActivePanel: (panel: 'placeholders' | 'editor' | 'preview') => void;
};

/**
 * Checks if the current device is mobile
 * Determines if the device is mobile based on window width
 * @returns {boolean} Whether the device is mobile
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    /**
     * Updates mobile state based on window width
     * @returns {void} Nothing
     */
    const checkMobile = (): void => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return (): void => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

/**
 * Creates panel resize handler
 * Creates a handler function for resizing panels in the UI.
 * This function takes a panel size setter function and returns a handler that updates panel sizes.
 * @param {(sizes: Record<string, number>) => void} setPanelSizes Function to update panel sizes
 * @returns {(sizes: Record<string, number>) => void} Handler function for panel resizing
 */
function createPanelResizeHandler(setPanelSizes: (sizes: Record<string, number>) => void): (sizes: Record<string, number>) => void {
  return (sizes: Record<string, number>) => setPanelSizes(sizes);
}

/**
 * Creates panel reset handler
 * Creates a handler function for resetting panel sizes to their default values.
 * This function takes a panel size setter function and returns a handler that resets panel sizes.
 * @param {(sizes: Record<string, number>) => void} setPanelSizes Function to update panel sizes
 * @returns {() => void} Handler function for resetting panel sizes
 */
function createPanelResetHandler(setPanelSizes: (sizes: Record<string, number>) => void): () => void {
  return () => setPanelSizes(DEFAULT_PANEL_SIZES);
}

/**
 * Creates panel handlers
 * Creates handlers for panel resize and reset operations.
 * This function takes a panel size setter function and returns handlers for resizing and resetting panel sizes.
 * The handlers are used to manage panel sizes in the UI.
 * @param {(sizes: Record<string, number>) => void} setPanelSizes Function to update panel sizes
 * @returns {Pick<PanelState, 'handlePanelResize' | 'resetPanelSizes'>} Panel handlers for resize and reset operations
 */
function createPanelHandlers(setPanelSizes: (sizes: Record<string, number>) => void): Pick<PanelState, 'handlePanelResize' | 'resetPanelSizes'> {
  return {
    handlePanelResize: createPanelResizeHandler(setPanelSizes),
    resetPanelSizes: createPanelResetHandler(setPanelSizes)
  };
}

/**
 * Creates panel state object
 * Combines panel sizes, handlers, and active panel state into a single object for panel management.
 * This function takes panel state parameters and creates a complete panel state object with all necessary
 * handlers and state values. The panel state is used to manage panel sizes and active panel in the UI.
 * @param {PanelStateParams} params Panel state parameters
 * @returns {PanelState} Panel state object with sizes, handlers, and active panel
 */
function createPanelState(params: PanelStateParams): PanelState {
  const { panelSizes, setPanelSizes, activePanel, setActivePanel } = params;
  return {
    panelSizes,
    ...createPanelHandlers(setPanelSizes),
    activePanel,
    setActivePanel
  };
}

/**
 * Initializes panel state
 * Manages panel sizes and active panel state
 * @returns {PanelState} Panel state management
 */
export function usePanelState(): PanelState {
  const [panelSizes, setPanelSizes] = useState<Record<string, number>>({});
  const [activePanel, setActivePanel] = useState<'placeholders' | 'editor' | 'preview'>('editor');
  return createPanelState({ panelSizes, setPanelSizes, activePanel, setActivePanel });
}

/**
 * Initializes welcome dialog state
 * Manages welcome dialog visibility
 * @returns {WelcomeDialogState} Welcome dialog state management
 */
export function useWelcomeDialog(): WelcomeDialogState {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  /**
   * Handles skipping the welcome dialog
   * Sets the welcome dialog visibility to false
   * @returns {void} Nothing
   */
  const handleSkipWelcome = (): void => setShowWelcome(false);

  return { showWelcome, handleSkipWelcome };
}

/**
 * Initializes UI state hooks
 * Combines mobile, panel, and welcome dialog state
 * @returns {UIStateHooks} UI state management hooks
 */
export function useUIStateHooks(): UIStateHooks {
  const isMobile = useIsMobile();
  const panelState = usePanelState();
  const welcomeDialog = useWelcomeDialog();

  return { isMobile, ...panelState, ...welcomeDialog };
}
