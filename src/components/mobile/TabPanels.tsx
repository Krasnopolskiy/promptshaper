/**
 * Mobile Tab Panels Component
 *
 * Panel components for mobile tab navigation
 *
 * @module components/mobile/TabPanels
 */
import { Placeholder } from '@/types';
import { PlaceholderPanel } from '@/components/PlaceholderPanel';
import { EditorPanel } from '@/components/EditorPanel';
import { PreviewPanel } from '@/components/PreviewPanel/index';
import { PanelType } from './TabNavigation';
import { getActivePanel } from './utils/tabPanelUtils';
import {
  PlaceholdersTabPanelProps,
  createPlaceholderPanelProps
} from './utils/placeholderPanelUtils';

/**
 * Renders the placeholder panel component
 * @param {PlaceholdersTabPanelProps} props - Panel properties
 * @returns {JSX.Element} Placeholder panel component
 */
function renderPlaceholderPanel(props: PlaceholdersTabPanelProps): JSX.Element {
  return <PlaceholderPanel {...createPlaceholderPanelProps(props)} />;
}

/**
 * Renders the placeholders tab panel
 * @param {PlaceholdersTabPanelProps} props - Panel properties
 * @returns {JSX.Element} Placeholders panel component
 */
export function PlaceholdersTabPanel(props: PlaceholdersTabPanelProps): JSX.Element {
  return (
    <div className="flex-1 overflow-hidden p-3">
      {renderPlaceholderPanel(props)}
    </div>
  );
}

/**
 * Editor tab panel props
 * @interface EditorTabPanelProps
 */
export interface EditorTabPanelProps {
  /** Current prompt text */
  promptText: string;
  /** Function to set the prompt text */
  setPromptText: (text: string) => void;
  /** Array of placeholder objects */
  placeholders: Placeholder[];
  /** Function to insert a placeholder at a specific position */
  onInsertPlaceholderAtPosition: (name: string, position: number) => number;
}

/**
 * Renders the editor panel component
 * @param {EditorTabPanelProps} props - Panel properties
 * @returns {JSX.Element} Editor panel component
 */
function renderEditorPanel(props: EditorTabPanelProps): JSX.Element {
  return (
    <EditorPanel
      promptText={props.promptText}
      setPromptText={props.setPromptText}
      placeholders={props.placeholders}
      onInsertPlaceholder={props.onInsertPlaceholderAtPosition}
    />
  );
}

/**
 * Renders the editor tab panel
 * @param {EditorTabPanelProps} props - Panel properties
 * @returns {JSX.Element} Editor panel component
 */
export function EditorTabPanel(props: EditorTabPanelProps): JSX.Element {
  return (
    <div className="flex-1 overflow-hidden p-3">
      {renderEditorPanel(props)}
    </div>
  );
}

/**
 * Preview tab panel props
 * @interface PreviewTabPanelProps
 */
export interface PreviewTabPanelProps {
  /** Full generated prompt with placeholders filled in */
  fullPrompt: string;
  /** Function to copy the full prompt */
  onCopyPrompt: () => void;
  /** Array of placeholder objects */
  placeholders: Placeholder[];
}

/**
 * Renders the preview panel component
 * @param {PreviewTabPanelProps} props - Panel properties
 * @returns {JSX.Element} Preview panel component
 */
function renderPreviewPanel(props: PreviewTabPanelProps): JSX.Element {
  return (
    <PreviewPanel
      content={props.fullPrompt}
      onCopy={props.onCopyPrompt}
      placeholders={props.placeholders}
    />
  );
}

/**
 * Renders the preview tab panel
 * @param {PreviewTabPanelProps} props - Panel properties
 * @returns {JSX.Element} Preview panel component
 */
export function PreviewTabPanel(props: PreviewTabPanelProps): JSX.Element {
  return (
    <div className="flex-1 overflow-hidden p-3">
      {renderPreviewPanel(props)}
    </div>
  );
}

/**
 * Mobile panel view props interface
 * @interface MobilePanelContentProps
 */
export interface MobilePanelContentProps {
  /** Currently active panel */
  activePanel: PanelType;
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
 * Renders the active panel based on the current selection
 * @param {MobilePanelContentProps} props - Panel properties
 * @returns {JSX.Element} Active panel component
 */
export function ActivePanel(props: MobilePanelContentProps): JSX.Element {
  return getActivePanel(props.activePanel, props);
}
