/**
 * Panel Component
 *
 * Renders a single panel with its content
 *
 * @module components/DesktopPanelView/Panel
 */
import { ResizablePanelComponent } from './ResizablePanelComponent';
import { PanelProps } from './types';

/**
 * Renders a panel with its content
 * @param {Object} props - Component props
 * @param {number} props.defaultSize - Default size of the panel
 * @param {number} props.minSize - Minimum size of the panel
 * @param {string} props.className - Additional CSS classes
 * @param {JSX.Element} props.children - Panel content
 * @returns {JSX.Element} The rendered panel
 */
export function Panel({ defaultSize, minSize, className, children }: PanelProps): JSX.Element {
  return (
    <ResizablePanelComponent defaultSize={defaultSize} minSize={minSize} className={className}>
      {children}
    </ResizablePanelComponent>
  );
}
