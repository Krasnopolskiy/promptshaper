/**
 * Mobile Panel View Component
 *
 * Responsive view for mobile devices with tab navigation
 *
 * @module components/MobilePanelView
 */
import { Placeholder } from '@/types';
import { TabNavigation } from './mobile/TabNavigation';
import { ActivePanel, MobilePanelContentProps } from './mobile/TabPanels';

/**
 * MobilePanelView component props
 * @interface MobilePanelViewProps
 */
export interface MobilePanelViewProps {
  /** Currently active panel */
  activePanel: 'placeholders' | 'editor' | 'preview';
  /** Function to set the active panel */
  setActivePanel: (panel: 'placeholders' | 'editor' | 'preview') => void;
  /** Array of placeholder objects */
  placeholders: Placeholder[];
  /** Function to add a new placeholder */
  onAddPlaceholder: (name: string, content: string, color: string) => void;
  /** Function to update an existing placeholder */
  onUpdatePlaceholder: (id: string, updates: Partial<Placeholder>) => void;
  /** Function to delete a placeholder */
  onDeletePlaceholder: (id: string) => void;
  /** Function to insert a placeholder from the panel */
  onInsertPlaceholderFromPanel: (name: string) => void;
  /** Function to insert a placeholder at a specific position */
  onInsertPlaceholderAtPosition: (name: string, position: number) => number;
  /** Function to handle placeholder name changes */
  onPlaceholderNameChange: (oldName: string, newName: string) => void;
  /** Current prompt text */
  promptText: string;
  /** Function to set the prompt text */
  setPromptText: (text: string) => void;
  /** Full generated prompt with placeholders filled in */
  fullPrompt: string;
  /** Function to copy the full prompt */
  onCopyPrompt: () => void;
}

/**
 * Renders the tab navigation component
 * @param {MobilePanelViewProps} props - Component props
 * @returns {JSX.Element} Tab navigation component
 */
function renderTabNavigation(props: MobilePanelViewProps): JSX.Element {
  return (
    <TabNavigation
      activePanel={props.activePanel}
      setActivePanel={props.setActivePanel}
    />
  );
}

/**
 * Renders the active panel content
 * @param {MobilePanelViewProps} props - Component props
 * @returns {JSX.Element} Active panel content
 */
function renderActivePanel(props: MobilePanelViewProps): JSX.Element {
  return <ActivePanel {...props as MobilePanelContentProps} />;
}

/**
 * Renders a mobile-optimized view with tabs for different panels
 * @param {MobilePanelViewProps} props - Component props
 * @returns {JSX.Element} Mobile panel view component
 */
export function MobilePanelView(props: MobilePanelViewProps): JSX.Element {
  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col overflow-hidden">
      {renderTabNavigation(props)}
      {renderActivePanel(props)}
    </div>
  );
}
