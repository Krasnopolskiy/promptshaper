/**
 * Panel Group Content Component
 *
 * Renders the content of the panel group
 *
 * @module components/DesktopPanelView/PanelGroupContent
 */
import { PanelSizes } from './types';
import { PanelHandles } from './PanelHandles';
import { PanelRenderer } from './PanelRenderer';

/**
 * PanelGroupContent component props
 * @interface PanelGroupContentProps
 */
interface PanelGroupContentProps {
  /** Current panel sizes */
  panelSizes: PanelSizes;
  /** Placeholders panel component */
  placeholdersPanel: JSX.Element;
  /** Editor panel component */
  editorPanel: JSX.Element;
  /** Preview panel component */
  previewPanel: JSX.Element;
}

/**
 * Renders the content of the panel group
 * @param {PanelGroupContentProps} props - Component props
 * @returns {JSX.Element} The rendered panel group content
 */
export function PanelGroupContent({ panelSizes, placeholdersPanel, editorPanel, previewPanel }: PanelGroupContentProps): JSX.Element {
  return <><PanelRenderer type="left" size={panelSizes.placeholders}>{placeholdersPanel}</PanelRenderer><PanelHandles /><PanelRenderer type="middle" size={panelSizes.editor}>{editorPanel}</PanelRenderer><PanelRenderer type="right" size={panelSizes.preview}>{previewPanel}</PanelRenderer></>;
}
