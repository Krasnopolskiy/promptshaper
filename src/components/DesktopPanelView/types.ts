import { Placeholder } from '@/types';

/**
 * PanelSizes type definition
 * @interface PanelSizes
 */
export interface PanelSizes {
  /** Size of the placeholders panel */
  placeholders: number;
  /** Size of the editor panel */
  editor: number;
  /** Size of the preview panel */
  preview: number;
}

/**
 * Panel component props
 * @interface PanelProps
 */
export interface PanelProps {
  /** Default size of the panel */
  defaultSize: number;
  /** Minimum size of the panel */
  minSize: number;
  /** Additional CSS classes */
  className: string;
  /** Panel content */
  children: JSX.Element;
}

/**
 * DesktopPanelView component props
 * @interface DesktopPanelViewProps
 */
export interface DesktopPanelViewProps {
  /** Current panel sizes */
  panelSizes: PanelSizes;
  /** Function to handle panel resize */
  onPanelResize: (sizes: number[]) => void;
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
 * PanelGroup component props
 * @interface PanelGroupProps
 */
export interface PanelGroupProps {
  /** Current panel sizes */
  panelSizes: PanelSizes;
  /** Function to handle panel resize */
  onPanelResize: (sizes: number[]) => void;
  /** Placeholders panel component */
  placeholdersPanel: JSX.Element;
  /** Editor panel component */
  editorPanel: JSX.Element;
  /** Preview panel component */
  previewPanel: JSX.Element;
}
