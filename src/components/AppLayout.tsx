/**
 * App Layout Component
 *
 * Main application layout with header and panels
 *
 * @module components/AppLayout
 */
import { WelcomeDialog } from '@/components/WelcomeDialog';
import { AppHeader } from '@/components/layout/AppHeader';
import { MobileView } from '@/components/layout/MobileView';
import { DesktopView } from '@/components/layout/DesktopView';
import { Template, Placeholder } from '@/types';

/**
 * Props for the AppLayout component
 */
interface AppLayoutProps {
  /** Array of templates */
  templates: Template[];
  /** Function to save a template */
  saveTemplate: (name: string, prompt: string, placeholders: Placeholder[]) => Template;
  /** Function to load a template */
  loadTemplate: (id: string) => Template | null;
  /** Current prompt text */
  promptText: string;
  /** Function to set prompt text */
  setPromptText: (text: string) => void;
  /** Array of placeholders */
  placeholders: Placeholder[];
  /** Function to set placeholders */
  setPlaceholders: (placeholders: Placeholder[]) => void;
  /** Function to copy the full prompt */
  handleCopyFullPrompt: () => Promise<void>;
  /** Function to reset the application */
  handleReset: () => void;
  /** Whether to show the welcome dialog */
  showWelcome: boolean;
  /** Function to handle skipping the welcome dialog */
  handleSkipWelcome: () => void;
  /** Whether the device is mobile */
  isMobile: boolean;
  /** Currently active panel */
  activePanel: 'placeholders' | 'editor' | 'preview';
  /** Function to set active panel */
  setActivePanel: (panel: 'placeholders' | 'editor' | 'preview') => void;
  /** Function to add a placeholder */
  addPlaceholder: (name: string, content: string, color: string) => void;
  /** Function to update a placeholder */
  updatePlaceholder: (id: string, updates: Partial<Placeholder>) => void;
  /** Function to delete a placeholder */
  deletePlaceholder: (id: string) => void;
  /** Function to insert a placeholder from panel */
  handleInsertPlaceholderFromPanel: (name: string) => void;
  /** Function to insert a placeholder at position */
  handleInsertPlaceholderAtPosition: (name: string, position: number) => number;
  /** Function to handle placeholder name changes */
  handlePlaceholderNameChange: (oldName: string, newName: string) => void;
  /** Full prompt with placeholders filled */
  fullPrompt: string;
  /** Panel sizes configuration */
  panelSizes: { placeholders: number; editor: number; preview: number };
  /** Function to handle panel resize */
  handlePanelResize: (sizes: number[]) => void;
}

/**
 * Renders the main content based on device type
 * @param {AppLayoutProps} props - The props for the layout component
 * @returns {JSX.Element} The rendered content
 */
function MainContent(props: AppLayoutProps): JSX.Element {
  const { isMobile } = props;
  return isMobile ? <MobileView {...props} /> : <DesktopView {...props} />;
}

/**
 * Renders the background element
 * @returns {JSX.Element} The rendered background
 */
function Background(): JSX.Element {
  return <div className="fixed inset-0 -z-10 bg-background"></div>;
}

/**
 * Renders the welcome dialog if needed
 * @param {boolean} showWelcome - Whether to show the welcome dialog
 * @param {() => void} handleSkipWelcome - Function to handle skipping the welcome dialog
 * @returns {JSX.Element | null} The rendered welcome dialog or null
 */
function WelcomeSection({ showWelcome, handleSkipWelcome }: { showWelcome: boolean; handleSkipWelcome: () => void }): JSX.Element | null {
  return showWelcome ? <WelcomeDialog onSkip={handleSkipWelcome} /> : null;
}

/**
 * Renders the root layout structure
 * @param {AppLayoutProps} props - The props for the layout component
 * @returns {JSX.Element} The rendered root layout
 */
function RootLayout(props: AppLayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <Background />
      <AppHeader {...props} />
      <WelcomeSection showWelcome={props.showWelcome} handleSkipWelcome={props.handleSkipWelcome} />
      <MainContent {...props} />
    </div>
  );
}

/**
 * Main application layout component that manages desktop and mobile views
 * @param {AppLayoutProps} props - Component properties
 * @returns {JSX.Element} The rendered AppLayout component
 */
export function AppLayout(props: AppLayoutProps): JSX.Element {
  return <RootLayout {...props} />;
}
