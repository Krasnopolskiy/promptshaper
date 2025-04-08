/**
 * App Header Component
 *
 * Renders the application header with all necessary props
 *
 * @module components/layout/AppHeader
 */
import { Header } from '@/components/Header';
import { Template, Placeholder } from '@/types';

/**
 * Props for the AppHeader component
 */
export type AppHeaderProps = {
  /** Function to save a template */
  saveTemplate: (name: string, prompt: string, placeholders: Placeholder[]) => Template;
  /** Array of templates */
  templates: Template[];
  /** Function to load a template */
  loadTemplate: (id: string) => Template | null;
  /** Current prompt text */
  promptText: string;
  /** Function to set prompt text */
  setPromptText: (text: string) => void;
  /** Function to set placeholders */
  setPlaceholders: (placeholders: Placeholder[]) => void;
  /** Function to copy the full prompt */
  handleCopyFullPrompt: () => Promise<void>;
  /** Function to reset the application */
  handleReset: () => void;
};

type HeaderComponentProps = {
  onSaveTemplate: AppHeaderProps['saveTemplate'];
  templates: Template[];
  onLoadTemplate: AppHeaderProps['loadTemplate'];
  currentPrompt: string;
  setPrompt: (text: string) => void;
  setPlaceholders: (placeholders: Placeholder[]) => void;
  onCopyFullPrompt: () => Promise<void>;
  onReset: () => void;
};

/**
 * Extracts template-related props
 * @param {AppHeaderProps} props - The props for the header component
 * @returns {Pick<HeaderComponentProps, 'onSaveTemplate' | 'templates' | 'onLoadTemplate'>} Template-related props
 */
function extractTemplateProps(props: AppHeaderProps): Pick<HeaderComponentProps, 'onSaveTemplate' | 'templates' | 'onLoadTemplate'> {
  const { saveTemplate, templates, loadTemplate } = props;
  return { onSaveTemplate: saveTemplate, templates, onLoadTemplate: loadTemplate };
}

/**
 * Extracts prompt-related props
 * @param {AppHeaderProps} props - The props for the header component
 * @returns {Pick<HeaderComponentProps, 'currentPrompt' | 'setPrompt' | 'setPlaceholders' | 'onCopyFullPrompt' | 'onReset'>} Prompt-related props
 */
function extractPromptProps(props: AppHeaderProps): Pick<HeaderComponentProps, 'currentPrompt' | 'setPrompt' | 'setPlaceholders' | 'onCopyFullPrompt' | 'onReset'> {
  const { promptText, setPromptText, setPlaceholders, handleCopyFullPrompt, handleReset } = props;
  return {
    currentPrompt: promptText,
    setPrompt: setPromptText,
    setPlaceholders,
    onCopyFullPrompt: handleCopyFullPrompt,
    onReset: handleReset,
  };
}

/**
 * Creates the props for the Header component
 * @param {AppHeaderProps} props - The props for the header component
 * @returns {HeaderComponentProps} The props for the Header component
 */
function createHeaderProps(props: AppHeaderProps): HeaderComponentProps {
  return {
    ...extractTemplateProps(props),
    ...extractPromptProps(props),
  };
}

/**
 * Renders the application header with all necessary props
 * @param {AppHeaderProps} props - The props for the header component
 * @returns {JSX.Element} The rendered header component
 */
export function AppHeader(props: AppHeaderProps): JSX.Element {
  return <Header {...createHeaderProps(props)} />;
}
