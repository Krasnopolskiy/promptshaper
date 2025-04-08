/**
 * Panel Group Component
 *
 * Renders a group of resizable panels
 *
 * @module components/DesktopPanelView/PanelGroup
 */
import { ResizablePanelGroup } from '@/components/ui/resizable';
import { PanelSizes } from './types';
import { PanelGroupContent } from './PanelGroupContent';

/**
 * PanelGroup component props
 * @interface PanelGroupProps
 */
interface PanelGroupProps {
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

/**
 * Renders the panel group with resizable panels
 * @param {PanelGroupProps} props - Component props
 * @returns {JSX.Element} The rendered panel group
 */
export function PanelGroup({ panelSizes, onPanelResize, placeholdersPanel, editorPanel, previewPanel }: PanelGroupProps): JSX.Element {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[calc(100vh-120px)] rounded-lg shadow-lg"
      onLayout={onPanelResize}
      autoSaveId="promptshaper-panels"
    >
      <PanelGroupContent
        panelSizes={panelSizes}
        placeholdersPanel={placeholdersPanel}
        editorPanel={editorPanel}
        previewPanel={previewPanel}
      />
    </ResizablePanelGroup>
  );
}
