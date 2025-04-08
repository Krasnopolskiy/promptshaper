/**
 * Resizable Panel Component
 *
 * Renders a single resizable panel
 *
 * @module components/DesktopPanelView/ResizablePanelComponent
 */
import { ResizablePanel } from '@/components/ui/resizable';

/**
 * ResizablePanelComponent props
 * @interface ResizablePanelComponentProps
 */
interface ResizablePanelComponentProps {
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
 * Renders a single resizable panel
 * @param {ResizablePanelComponentProps} props - Component props
 * @returns {JSX.Element} The rendered panel
 */
export function ResizablePanelComponent({ defaultSize, minSize, className, children }: ResizablePanelComponentProps): JSX.Element {
  return (
    <ResizablePanel
      defaultSize={defaultSize}
      minSize={minSize}
      className={className}
    >
      {children}
    </ResizablePanel>
  );
}
