/**
 * Header Component
 *
 * Main header component for the application that provides access to save/load templates
 * and includes the app's branding.
 *
 * @module components/Header
 */
import {Placeholder, Template} from '@/types';
import { renderBrandLogo } from '@/utils/logo-utils';
import { HeaderActionButtons } from '@/components/HeaderActionButtons';
import { HeaderDialogs } from '@/components/HeaderDialogs';
import { useHeaderDialogs } from '@/hooks/useHeaderDialogs';
import { useToast } from '@/hooks/useToast';

/**
 * Header component props
 * @interface HeaderProps
 */
interface HeaderProps {
  /** Function to save a template */
  onSaveTemplate: (name: string, prompt: string, placeholders: Placeholder[]) => void;
  /** List of available templates */
  templates: Template[];
  /** Function to load a template */
  onLoadTemplate: (id: string) => Template | null;
  /** Current prompt text */
  currentPrompt: string;
  /** Function to set prompt text */
  setPrompt: (prompt: string) => void;
  /** Function to set placeholders */
  setPlaceholders: (placeholders: Placeholder[]) => void;
  /** Function to copy the full prompt to clipboard */
  onCopyFullPrompt?: () => void;
  /** Function to reset the application */
  onReset?: () => void;
}

/**
 * Header component with template management options
 * @param {HeaderProps} props - Component props
 * @returns {JSX.Element} Header component
 */
export function Header(props: HeaderProps): JSX.Element {
  const { toast } = useToast();
  const dialogState = useHeaderDialogs({ ...props, toast });

  return (
    <nav className="sticky top-0 z-50 flex h-20 w-full items-center justify-between border-b border-border/40 bg-background/95 px-4 py-2 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-8">
      {renderBrandLogo()}
      <HeaderActionButtons
        onLoadClick={() => dialogState.setIsLoadDialogOpen(true)}
        onSaveClick={() => dialogState.setIsSaveDialogOpen(true)}
        onResetClick={() => dialogState.setIsResetDialogOpen(true)}
      />
      <HeaderDialogs {...dialogState} templates={props.templates} />
    </nav>
  );
}
