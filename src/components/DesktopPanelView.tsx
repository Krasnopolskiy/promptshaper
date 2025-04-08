/**
 * Desktop Panel View Component
 *
 * Responsive view for desktop with resizable panels
 *
 * @module components/DesktopPanelView
 */
import { Placeholder } from '@/types';
import { PanelGroup } from './DesktopPanelView/PanelGroup';
import { PlaceholdersPanel } from './DesktopPanelView/PlaceholdersPanel';
import { EditorPanelComponent } from './DesktopPanelView/EditorPanelComponent';
import { PreviewPanelComponent } from './DesktopPanelView/PreviewPanelComponent';

/**
 * PanelSizes type definition
 * @interface PanelSizes
 */
interface PanelSizes {
  placeholders: number;
  editor: number;
  preview: number;
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
 * Desktop view with three resizable panels for placeholders, editor, and preview
 * @param {DesktopPanelViewProps} props - Component properties
 * @returns {JSX.Element} The rendered desktop panel view
 */
export function DesktopPanelView(props: DesktopPanelViewProps): JSX.Element {
  const { panelSizes, onPanelResize } = props;

  return (
    <div className="flex-1 overflow-hidden p-4">
      <PanelGroup
        panelSizes={panelSizes}
        onPanelResize={onPanelResize}
        placeholdersPanel={<PlaceholdersPanel {...props} />}
        editorPanel={<EditorPanelComponent {...props} />}
        previewPanel={<PreviewPanelComponent {...props} />}
      />
    </div>
  );
}
