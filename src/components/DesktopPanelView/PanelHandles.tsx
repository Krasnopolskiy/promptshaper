/**
 * Panel Handles Component
 *
 * Renders the panel handles
 *
 * @module components/DesktopPanelView/PanelHandles
 */
import { ResizableHandle } from '@/components/ui/resizable';

/**
 * Renders the panel handles
 * @returns {JSX.Element} The rendered panel handles
 */
export function PanelHandles(): JSX.Element {
  return (
    <>
      <ResizableHandle withHandle className="transition-colors hover:bg-primary/20"/>
      <ResizableHandle withHandle className="transition-colors hover:bg-primary/20"/>
    </>
  );
}
