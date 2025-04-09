/**
 * Panel Renderer Component
 *
 * Renders a panel with specific styles and content
 *
 * @module components/DesktopPanelView/PanelRenderer
 */
import { Panel } from './Panel';
import { leftPanelStyles, middlePanelStyles, rightPanelStyles } from './panelStyles';

/**
 * PanelRenderer component props
 * @interface PanelRendererProps
 */
interface PanelRendererProps {
  /** Panel type */
  type: 'left' | 'middle' | 'right';
  /** Panel size */
  size: number;
  /** Panel content */
  children: JSX.Element;
}

/**
 * Gets the panel styles based on the panel type
 * @param {string} type - Panel type
 * @returns {string} Panel styles
 */
function getPanelStyles(type: 'left' | 'middle' | 'right'): string {
  switch (type) {
    case 'left':
      return leftPanelStyles;
    case 'middle':
      return middlePanelStyles;
    case 'right':
      return rightPanelStyles;
  }
}

/**
 * Gets the panel minimum size based on the panel type
 * @param {string} type - Panel type
 * @returns {number} Panel minimum size
 */
function getPanelMinSize(type: 'left' | 'middle' | 'right'): number {
  switch (type) {
    case 'left':
      return 15;
    case 'middle':
      return 25;
    case 'right':
      return 15;
  }
}

/**
 * Renders a panel with specific styles and content
 * @param {PanelRendererProps} props - Component props
 * @returns {JSX.Element} The rendered panel
 */
export function PanelRenderer({ type, size, children }: PanelRendererProps): JSX.Element {
  return <Panel defaultSize={size} minSize={getPanelMinSize(type)} className={getPanelStyles(type)}>{children}</Panel>;
}
