/**
 * Mobile View Component
 *
 * Renders the mobile view of the application
 *
 * @module components/layout/MobileView
 */
import { MobilePanelView } from '@/components/MobilePanelView';
import { Placeholder } from '@/types';

/**
 * Props for the MobileView component
 */
export type MobileViewProps = {
  /** Currently active panel */
  activePanel: 'placeholders' | 'editor' | 'preview';
  /** Function to set active panel */
  setActivePanel: (panel: 'placeholders' | 'editor' | 'preview') => void;
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

type MobilePanelViewProps = {
  activePanel: 'placeholders' | 'editor' | 'preview';
  setActivePanel: (panel: 'placeholders' | 'editor' | 'preview') => void;
} & PlaceholderProps & PromptProps;

/**
 * Extracts basic placeholder props
 * @param {MobileViewProps} props - The props for the mobile view component
 * @returns {Pick<PlaceholderProps, 'placeholders' | 'onAddPlaceholder' | 'onUpdatePlaceholder' | 'onDeletePlaceholder'>} Basic placeholder props
 */
function extractBasicPlaceholderProps(props: MobileViewProps): Pick<PlaceholderProps, 'placeholders' | 'onAddPlaceholder' | 'onUpdatePlaceholder' | 'onDeletePlaceholder'> {
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
 * @param {MobileViewProps} props - The props for the mobile view component
 * @returns {Pick<PlaceholderProps, 'onInsertPlaceholderFromPanel' | 'onInsertPlaceholderAtPosition' | 'onPlaceholderNameChange'>} Insertion-related props
 */
function extractInsertionProps(props: MobileViewProps): Pick<PlaceholderProps, 'onInsertPlaceholderFromPanel' | 'onInsertPlaceholderAtPosition' | 'onPlaceholderNameChange'> {
  const { handleInsertPlaceholderFromPanel, handleInsertPlaceholderAtPosition, handlePlaceholderNameChange } = props;
  return {
    onInsertPlaceholderFromPanel: handleInsertPlaceholderFromPanel,
    onInsertPlaceholderAtPosition: handleInsertPlaceholderAtPosition,
    onPlaceholderNameChange: handlePlaceholderNameChange,
  };
}

/**
 * Extracts prompt-related props
 * @param {MobileViewProps} props - The props for the mobile view component
 * @returns {PromptProps} Prompt-related props
 */
function extractPromptProps(props: MobileViewProps): PromptProps {
  const { promptText, setPromptText, fullPrompt, handleCopyFullPrompt } = props;
  return {
    promptText,
    setPromptText,
    fullPrompt,
    onCopyPrompt: handleCopyFullPrompt,
  };
}

/**
 * Creates the props for the MobilePanelView component
 * @param {MobileViewProps} props - The props for the mobile view component
 * @returns {MobilePanelViewProps} The props for the MobilePanelView component
 */
function createMobilePanelProps(props: MobileViewProps): MobilePanelViewProps {
  const { activePanel, setActivePanel } = props;
  return {
    activePanel,
    setActivePanel,
    ...extractBasicPlaceholderProps(props),
    ...extractInsertionProps(props),
    ...extractPromptProps(props),
  };
}

/**
 * Renders the mobile view of the application
 * @param {MobileViewProps} props - The props for the mobile view component
 * @returns {JSX.Element} The rendered mobile view component
 */
export function MobileView(props: MobileViewProps): JSX.Element {
  return <MobilePanelView {...createMobilePanelProps(props)} />;
}
