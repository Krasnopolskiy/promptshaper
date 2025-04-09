/**
 * Desktop Panel View Component
 *
 * Responsive view for desktop with resizable panels
 *
 * @module components/DesktopPanelView
 */
import { DesktopPanelViewProps } from './DesktopPanelView/types';
import { PanelContent } from './DesktopPanelView/PanelContent';

/**
 * Desktop view with three resizable panels for placeholders, editor, and preview
 * @param {DesktopPanelViewProps} props - Component properties
 * @returns {JSX.Element} The rendered desktop panel view
 */
export function DesktopPanelView(props: DesktopPanelViewProps): JSX.Element {
  return (
    <div className="flex-1 overflow-hidden p-4">
      <PanelContent {...props} />
    </div>
  );
}
