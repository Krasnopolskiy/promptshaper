/**
 * Welcome Dialog Component
 *
 * Shows the welcome information for first-time users
 *
 * @module components/WelcomeDialog
 */
import { Button } from '@/components/ui/button';
import { FileCode, Layers, Sparkles, Wand2 } from 'lucide-react';

/**
 * WelcomeDialog component props
 * @interface WelcomeDialogProps
 */
interface WelcomeDialogProps {
  /** Function to handle skipping the welcome dialog */
  onSkip: () => void;
}

/**
 * Displays a welcome dialog with features overview
 * @param {WelcomeDialogProps} props Component props
 * @returns The rendered welcome dialog
 */
export function WelcomeDialog({ onSkip }: WelcomeDialogProps): JSX.Element {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-500">
      <div
        className="animate-enter-active max-w-2xl rounded-2xl border border-border/50 bg-white p-8 shadow-2xl dark:bg-background">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary"/>
          </div>
        </div>
        <h1 className="mb-4 text-center text-3xl font-bold">Getting Started</h1>
        <p className="mb-8 text-center text-muted-foreground">
          Welcome to Prompt Shaper! Create reusable prompt templates with placeholders to
          generate consistent AI prompts.
        </p>

        <div className="mb-8 grid grid-cols-3 gap-4">
          <div
            className="flex flex-col items-center rounded-lg bg-accent/20 p-4 text-center dark:bg-accent/10">
            <Layers className="mb-2 h-6 w-6 text-primary"/>
            <h3 className="font-medium">Create Placeholders</h3>
            <p className="text-sm text-muted-foreground">
              Define reusable variables for your prompts
            </p>
          </div>
          <div
            className="flex flex-col items-center rounded-lg bg-accent/20 p-4 text-center dark:bg-accent/10">
            <FileCode className="mb-2 h-6 w-6 text-primary"/>
            <h3 className="font-medium">Build Templates</h3>
            <p className="text-sm text-muted-foreground">
              Design prompt templates with placeholders
            </p>
          </div>
          <div
            className="flex flex-col items-center rounded-lg bg-accent/20 p-4 text-center dark:bg-accent/10">
            <Wand2 className="mb-2 h-6 w-6 text-primary"/>
            <h3 className="font-medium">Generate Content</h3>
            <p className="text-sm text-muted-foreground">
              Fill in values and get perfect prompts
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button onClick={onSkip} size="lg" className="px-8">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
