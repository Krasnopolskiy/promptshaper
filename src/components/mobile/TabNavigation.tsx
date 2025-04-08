/**
 * Tab Navigation Component
 *
 * Handles navigation between different tabs in the mobile view
 *
 * @module components/mobile/TabNavigation
 */
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Panel type for tab navigation
 */
export type PanelType = 'placeholders' | 'editor' | 'preview';

/**
 * Tab button properties
 * @interface TabButtonProps
 */
interface TabButtonProps {
  /** Whether the tab is currently active */
  isActive: boolean;
  /** Label to display on the tab */
  label: string;
  /** Icon to display on the tab */
  icon: JSX.Element;
  /** Click handler for the tab */
  onClick: () => void;
}

/**
 * Button props for tab buttons
 * @interface TabButtonElementProps
 */
interface TabButtonElementProps {
  /** Key for React rendering */
  key: string;
  /** Button variant */
  variant: 'ghost';
  /** Button class name */
  className: string;
  /** Click handler */
  onClick: () => void;
}

/**
 * Creates the placeholders tab configuration
 * @param {boolean} isActive - Whether this tab is active
 * @param {Function} onClick - Click handler for the tab
 * @returns {Object} Tab configuration object
 */
function createPlaceholdersTab(isActive: boolean, onClick: () => void): TabButtonProps {
  return {
    isActive,
    label: 'Placeholders',
    icon: <span>P</span>,
    onClick
  };
}

/**
 * Creates the editor tab configuration
 * @param {boolean} isActive - Whether this tab is active
 * @param {Function} onClick - Click handler for the tab
 * @returns {Object} Tab configuration object
 */
function createEditorTab(isActive: boolean, onClick: () => void): TabButtonProps {
  return {
    isActive,
    label: 'Editor',
    icon: <span>E</span>,
    onClick
  };
}

/**
 * Creates the preview tab configuration
 * @param {boolean} isActive - Whether this tab is active
 * @param {Function} onClick - Click handler for the tab
 * @returns {Object} Tab configuration object
 */
function createPreviewTab(isActive: boolean, onClick: () => void): TabButtonProps {
  return {
    isActive,
    label: 'Preview',
    icon: <span>V</span>,
    onClick
  };
}

/**
 * Creates the tab button configuration array
 * @param {PanelType} activePanel - Currently active panel
 * @param {Function} onTabChange - Handler for tab changes
 * @returns {Array<TabButtonProps>} Array of tab button configurations
 */
function createTabButtons(
  activePanel: PanelType,
  onTabChange: (panel: PanelType) => void
): TabButtonProps[] {
  return [
    createPlaceholdersTab(activePanel === 'placeholders', () => onTabChange('placeholders')),
    createEditorTab(activePanel === 'editor', () => onTabChange('editor')),
    createPreviewTab(activePanel === 'preview', () => onTabChange('preview'))
  ];
}

/**
 * Creates the class name for a tab button
 * @param {boolean} isActive - Whether the tab is active
 * @returns {string} Combined class name
 */
function createTabButtonClassName(isActive: boolean): string {
  return cn(
    'flex-1 flex items-center justify-center gap-2',
    isActive && 'bg-muted'
  );
}

/**
 * Creates the button props for a tab
 * @param {TabButtonProps} props - Tab button properties
 * @returns {TabButtonElementProps} Button props
 */
function createTabButtonProps({ isActive, label, onClick }: TabButtonProps): TabButtonElementProps {
  return {
    key: label,
    variant: 'ghost',
    className: createTabButtonClassName(isActive),
    onClick
  };
}

/**
 * Renders a tab button with the given configuration
 * @param {TabButtonProps} props - Tab button properties
 * @returns {JSX.Element} Rendered tab button
 */
function renderTabButton(props: TabButtonProps): JSX.Element {
  const buttonProps = createTabButtonProps(props);
  return (
    <Button {...buttonProps}>
      {props.icon}
      {props.label}
    </Button>
  );
}

/**
 * Tab navigation properties
 * @interface TabNavigationProps
 */
interface TabNavigationProps {
  /** Currently active panel */
  activePanel: PanelType;
  /** Handler for panel changes */
  onPanelChange: (panel: PanelType) => void;
}

/**
 * Renders the tab navigation component
 * @param {TabNavigationProps} props - Component properties
 * @returns {JSX.Element} Tab navigation component
 */
export function TabNavigation({ activePanel, onPanelChange }: TabNavigationProps): JSX.Element {
  const tabButtons = createTabButtons(activePanel, onPanelChange);

  return (
    <div className="flex border-b">
      {tabButtons.map(renderTabButton)}
    </div>
  );
}
