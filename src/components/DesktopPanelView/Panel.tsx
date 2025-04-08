/**
 * Panel Component
 *
 * Renders a single panel with its content
 *
 * @module components/DesktopPanelView/Panel
 */
import { ResizablePanelComponent } from './ResizablePanelComponent';

/**
 * Panel component props
 * @interface PanelProps
 */
interface PanelProps {
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
 * Renders a panel with its content
 * @param {PanelProps} props - Component props
 * @returns {JSX.Element} The rendered panel
 */
export function Panel({ defaultSize, minSize, className, children }: PanelProps): JSX.Element {
  return (
    <ResizablePanelComponent
      defaultSize={defaultSize}
      minSize={minSize}
      className={className}
    >
      {children}
    </ResizablePanelComponent>
  );
}
