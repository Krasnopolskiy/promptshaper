/**
 * Mobile Panel View Component
 *
 * Responsive view for mobile devices with tab navigation
 *
 * @module components/MobilePanelView
 */
import { Placeholder } from '@/types';
import { PlaceholderPanel } from '@/components/PlaceholderPanel';
import { EditorPanel } from '@/components/EditorPanel';
import { PreviewPanel } from '@/components/PreviewPanel';

/**
 * MobilePanelView component props
 * @interface MobilePanelViewProps
 */
interface MobilePanelViewProps {
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
 * Mobile view with tabbed navigation between panels
 * @param {MobilePanelViewProps} props Component props
 * @returns The rendered mobile panel view
 */
export function MobilePanelView({
  activePanel,
  setActivePanel,
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
}: MobilePanelViewProps): JSX.Element {
  return (
    <div className="flex max-w-full flex-1 flex-col overflow-hidden p-4">
      <div className="flex overflow-hidden rounded-t-lg border-b border-border bg-white/70 shadow-sm backdrop-blur-sm dark:bg-background/70">
        <button
          className={`flex-1 py-3 text-xs font-medium transition-colors ${
            activePanel === 'placeholders'
              ? 'border-b-2 border-primary bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-accent/5'
          }`}
          onClick={() => setActivePanel('placeholders')}
        >
          Placeholders
        </button>
        <button
          className={`flex-1 py-3 text-xs font-medium transition-colors ${
            activePanel === 'editor'
              ? 'border-b-2 border-primary bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-accent/5'
          }`}
          onClick={() => setActivePanel('editor')}
        >
          Editor
        </button>
        <button
          className={`flex-1 py-3 text-xs font-medium transition-colors ${
            activePanel === 'preview'
              ? 'border-b-2 border-primary bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-accent/5'
          }`}
          onClick={() => setActivePanel('preview')}
        >
          Preview
        </button>
      </div>

      <div className="flex-1 overflow-hidden rounded-b-lg shadow-lg">
        {activePanel === 'placeholders' && (
          <PlaceholderPanel
            placeholders={placeholders}
            onAddPlaceholder={onAddPlaceholder}
            onUpdatePlaceholder={onUpdatePlaceholder}
            onDeletePlaceholder={onDeletePlaceholder}
            onInsertPlaceholder={onInsertPlaceholderFromPanel}
            onPlaceholderNameChange={onPlaceholderNameChange}
          />
        )}

        {activePanel === 'editor' && (
          <EditorPanel
            promptText={promptText}
            setPromptText={setPromptText}
            placeholders={placeholders}
            onInsertPlaceholder={onInsertPlaceholderAtPosition}
          />
        )}

        {activePanel === 'preview' && (
          <PreviewPanel
            content={fullPrompt}
            onCopy={onCopyPrompt}
            placeholders={placeholders}
          />
        )}
      </div>
    </div>
  );
}
