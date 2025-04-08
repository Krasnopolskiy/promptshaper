/**
 * Desktop View Component
 *
 * Renders the desktop view of the application
 *
 * @module components/layout/DesktopView
 */
import { DesktopPanelView } from '@/components/DesktopPanelView';
import { Placeholder } from '@/types';

/**
 * Props for the DesktopView component
 */
export type DesktopViewProps = {
  /** Array of placeholders */
  placeholders: Placeholder[];
  /** Function to add a placeholder */
  addPlaceholder: (name: string, content: string, color: string) => void;
  /** Function to update a placeholder */
  updatePlaceholder: (id: string, updates: Partial<Placeholder>) => void;
  /** Function to delete a placeholder */
  deletePlaceholder: (id: string) => void;
  /** Function to insert a placeholder from panel */
  handleInsertPlaceholderFromPanel: (name: string) => void;
  /** Function to insert a placeholder at position */
  handleInsertPlaceholderAtPosition: (name: string, position: number) => number;
  /** Function to handle placeholder name changes */
  handlePlaceholderNameChange: (oldName: string, newName: string) => void;
  /** Current prompt text */
  promptText: string;
  /** Function to set prompt text */
  setPromptText: (text: string) => void;
  /** Full prompt with placeholders filled */
  fullPrompt: string;
  /** Panel sizes configuration */
  panelSizes: { placeholders: number; editor: number; preview: number };
  /** Function to handle panel resize */
  handlePanelResize: (sizes: number[]) => void;
  /** Function to copy the full prompt */
  handleCopyFullPrompt: () => Promise<void>;
};

type PlaceholderProps = {
  placeholders: Placeholder[];
  onAddPlaceholder: (name: string, content: string, color: string) => void;
  onUpdatePlaceholder: (id: string, updates: Partial<Placeholder>) => void;
  onDeletePlaceholder: (id: string) => void;
  onInsertPlaceholderFromPanel: (name: string) => void;
  onInsertPlaceholderAtPosition: (name: string, position: number) => number;
  onPlaceholderNameChange: (oldName: string, newName: string) => void;
};

type PromptProps = {
  promptText: string;
  setPromptText: (text: string) => void;
  fullPrompt: string;
  onCopyPrompt: () => Promise<void>;
};

type PanelProps = {
  panelSizes: { placeholders: number; editor: number; preview: number };
  onPanelResize: (sizes: number[]) => void;
};

type DesktopPanelViewProps = PlaceholderProps & PromptProps & PanelProps;

/**
 * Extracts basic placeholder props
 * @param {DesktopViewProps} props - The props for the desktop view component
 * @returns {Pick<PlaceholderProps, 'placeholders' | 'onAddPlaceholder' | 'onUpdatePlaceholder' | 'onDeletePlaceholder'>} Basic placeholder props
 */
function extractBasicPlaceholderProps(props: DesktopViewProps): Pick<PlaceholderProps, 'placeholders' | 'onAddPlaceholder' | 'onUpdatePlaceholder' | 'onDeletePlaceholder'> {
  const { placeholders, addPlaceholder, updatePlaceholder, deletePlaceholder } = props;
  return {
    placeholders,
    onAddPlaceholder: addPlaceholder,
    onUpdatePlaceholder: updatePlaceholder,
    onDeletePlaceholder: deletePlaceholder,
  };
}

/**
 * Extracts insertion-related placeholder props
 * @param {DesktopViewProps} props - The props for the desktop view component
 * @returns {Pick<PlaceholderProps, 'onInsertPlaceholderFromPanel' | 'onInsertPlaceholderAtPosition' | 'onPlaceholderNameChange'>} Insertion-related props
 */
function extractInsertionProps(props: DesktopViewProps): Pick<PlaceholderProps, 'onInsertPlaceholderFromPanel' | 'onInsertPlaceholderAtPosition' | 'onPlaceholderNameChange'> {
  const { handleInsertPlaceholderFromPanel, handleInsertPlaceholderAtPosition, handlePlaceholderNameChange } = props;
  return {
    onInsertPlaceholderFromPanel: handleInsertPlaceholderFromPanel,
    onInsertPlaceholderAtPosition: handleInsertPlaceholderAtPosition,
    onPlaceholderNameChange: handlePlaceholderNameChange,
  };
}

/**
 * Extracts prompt-related props
 * @param {DesktopViewProps} props - The props for the desktop view component
 * @returns {PromptProps} Prompt-related props
 */
function extractPromptProps(props: DesktopViewProps): PromptProps {
  const { promptText, setPromptText, fullPrompt, handleCopyFullPrompt } = props;
  return {
    promptText,
    setPromptText,
    fullPrompt,
    onCopyPrompt: handleCopyFullPrompt,
  };
}

/**
 * Extracts panel-related props
 * @param {DesktopViewProps} props - The props for the desktop view component
 * @returns {PanelProps} Panel-related props
 */
function extractPanelProps(props: DesktopViewProps): PanelProps {
  const { panelSizes, handlePanelResize } = props;
  return {
    panelSizes,
    onPanelResize: handlePanelResize,
  };
}

/**
 * Creates the props for the DesktopPanelView component
 * @param {DesktopViewProps} props - The props for the desktop view component
 * @returns {DesktopPanelViewProps} The props for the DesktopPanelView component
 */
function createDesktopPanelProps(props: DesktopViewProps): DesktopPanelViewProps {
  return {
    ...extractBasicPlaceholderProps(props),
    ...extractInsertionProps(props),
    ...extractPromptProps(props),
    ...extractPanelProps(props),
  };
}

/**
 * Renders the desktop view of the application
 * @param {DesktopViewProps} props - The props for the desktop view component
 * @returns {JSX.Element} The rendered desktop view component
 */
export function DesktopView(props: DesktopViewProps): JSX.Element {
  return <DesktopPanelView {...createDesktopPanelProps(props)} />;
}
