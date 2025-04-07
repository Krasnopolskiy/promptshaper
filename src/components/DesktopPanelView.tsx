/**
 * Desktop Panel View Component
 *
 * Responsive view for desktop with resizable panels
 *
 * @module components/DesktopPanelView
 */
import { Placeholder } from '@/types';
import { PlaceholderPanel } from '@/components/PlaceholderPanel';
import { EditorPanel } from '@/components/EditorPanel';
import { PreviewPanel } from '@/components/PreviewPanel';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';

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
interface DesktopPanelViewProps {
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
 * Desktop view with resizable panels
 * @param {DesktopPanelViewProps} props Component props
 * @returns The rendered desktop panel view
 */
export function DesktopPanelView({
  panelSizes,
  onPanelResize,
  placeholders,
  onAddPlaceholder,
  onUpdatePlaceholder,
  onDeletePlaceholder,
  onInsertPlaceholderFromPanel,
  onInsertPlaceholderAtPosition,
  onPlaceholderNameChange,
  promptText,
  setPromptText,
  fullPrompt,
  onCopyPrompt
}: DesktopPanelViewProps): JSX.Element {
  return (
    <div className="flex-1 overflow-hidden p-4">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-[calc(100vh-120px)] rounded-lg shadow-lg"
        onLayout={onPanelResize}
        autoSaveId="promptshaper-panels"
      >
        <ResizablePanel
          defaultSize={panelSizes.placeholders}
          minSize={15}
          className="rounded-l-lg border border-border/50 bg-white/70 backdrop-blur-sm transition-all dark:bg-background/70"
        >
          <PlaceholderPanel
            placeholders={placeholders}
            onAddPlaceholder={onAddPlaceholder}
            onUpdatePlaceholder={onUpdatePlaceholder}
            onDeletePlaceholder={onDeletePlaceholder}
            onInsertPlaceholder={onInsertPlaceholderFromPanel}
            onPlaceholderNameChange={onPlaceholderNameChange}
          />
        </ResizablePanel>

        <ResizableHandle withHandle className="transition-colors hover:bg-primary/20"/>

        <ResizablePanel
          defaultSize={panelSizes.editor}
          minSize={25}
          className="border-y border-border/50 bg-white/70 backdrop-blur-sm transition-all dark:bg-background/70"
        >
          <EditorPanel
            promptText={promptText}
            setPromptText={setPromptText}
            placeholders={placeholders}
            onInsertPlaceholder={onInsertPlaceholderAtPosition}
          />
        </ResizablePanel>

        <ResizableHandle withHandle className="transition-colors hover:bg-primary/20"/>

        <ResizablePanel
          defaultSize={panelSizes.preview}
          minSize={15}
          className="rounded-r-lg border border-border/50 bg-white/70 backdrop-blur-sm transition-all dark:bg-background/70"
        >
          <PreviewPanel
            content={fullPrompt}
            onCopy={onCopyPrompt}
            placeholders={placeholders}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
