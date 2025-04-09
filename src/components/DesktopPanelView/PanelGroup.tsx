/**
 * Panel Group Component
 *
 * Renders a group of resizable panels
 *
 * @module components/DesktopPanelView/PanelGroup
 */
import { ResizablePanelGroup } from '@/components/ui/resizable';
import { PanelGroupContent } from './PanelGroupContent';
import type { PanelGroupProps } from './types';

/**
 * Renders the panel group layout
 * @param {object} props - Component props
 * @param {PanelGroupProps['onPanelResize']} props.onPanelResize - Resize handler
 * @param {JSX.Element} props.children - Child components
 * @returns {JSX.Element} Panel group layout
 */
function PanelGroupLayout({ onPanelResize, children }: { onPanelResize: PanelGroupProps['onPanelResize']; children: JSX.Element }): JSX.Element {
  return <ResizablePanelGroup direction="horizontal" className="min-h-[200px] max-w-full rounded-lg border" onLayout={onPanelResize}>{children}</ResizablePanelGroup>;
}

/**
 * PanelGroup component
 * @param {PanelGroupProps} props - Component props
 * @returns {JSX.Element} PanelGroup component
 */
export function PanelGroup(props: PanelGroupProps): JSX.Element {
  return (
    <PanelGroupLayout onPanelResize={props.onPanelResize}>
      <PanelGroupContent {...props} />
    </PanelGroupLayout>
  );
}
