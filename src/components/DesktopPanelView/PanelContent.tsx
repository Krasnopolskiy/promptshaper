import { DesktopPanelViewProps } from './types';
import { PanelGroup } from './PanelGroup';
import { PlaceholdersPanel } from './PlaceholdersPanel';
import { EditorPanelComponent } from './EditorPanelComponent';
import { PreviewPanelComponent } from './PreviewPanelComponent';

/**
 * Renders the panel content with placeholders, editor, and preview panels
 * @param {DesktopPanelViewProps} props - Component properties
 * @returns {JSX.Element} The rendered panel content
 */
export function PanelContent({ panelSizes, onPanelResize, ...props }: DesktopPanelViewProps): JSX.Element {
  return (
    <PanelGroup panelSizes={panelSizes} onPanelResize={onPanelResize}
      placeholdersPanel={<PlaceholdersPanel {...props} />} editorPanel={<EditorPanelComponent {...props} />}
      previewPanel={<PreviewPanelComponent {...props} />} />
  );
}
