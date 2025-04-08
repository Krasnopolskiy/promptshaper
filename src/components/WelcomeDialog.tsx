/**
 * Welcome Dialog Component
 *
 * Shows the welcome information for first-time users
 *
 * @module components/WelcomeDialog
 */
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { Fragment } from 'react';
import {
  FeatureIcon,
  FeatureContent,
  FeatureCardContainer
} from '@/components/dialog/FeatureComponents';
import { FeatureConfig, createFeatureItems } from '@/components/dialog/FeatureData';

/**
 * WelcomeDialog component props
 * @interface WelcomeDialogProps
 */
interface WelcomeDialogProps {
  /** Function to handle skipping the welcome dialog */
  onSkip: () => void;
}

/**
 * Renders the welcome dialog icon
 * @returns {JSX.Element} Dialog icon
 */
function DialogIcon(): JSX.Element {
  return (
    <div className="mb-6 flex justify-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <Sparkles className="h-8 w-8 text-primary"/>
      </div>
    </div>
  );
}

/**
 * Renders the welcome dialog title
 * @returns {JSX.Element} Dialog title
 */
function DialogTitle(): JSX.Element {
  return <h1 className="mb-4 text-center text-3xl font-bold">Getting Started</h1>;
}

/**
 * Renders the welcome dialog description
 * @returns {JSX.Element} Dialog description
 */
function DialogDescription(): JSX.Element {
  return (
    <p className="mb-8 text-center text-muted-foreground">
      Welcome to Prompt Shaper! Create reusable prompt templates with placeholders to
      generate consistent AI prompts.
    </p>
  );
}

/**
 * Renders the welcome dialog header with icon
 * @returns {JSX.Element} Dialog header component
 */
function DialogHeader(): JSX.Element {
  return (
    <>
      <DialogIcon />
      <DialogTitle />
      <DialogDescription />
    </>
  );
}

/**
 * Fragment wrapper for card content
 * @param {React.ReactNode} children - Child elements
 * @returns {JSX.Element} Content fragment
 */
function ContentFragment({ children }: { children: React.ReactNode }): JSX.Element {
  return <Fragment>{children}</Fragment>;
}

/**
 * Creates feature card content elements
 * @param {Object} props - Content props
 * @param {React.ReactNode} props.icon - Feature icon element
 * @param {string} props.title - Feature title text
 * @param {string} props.description - Feature description text
 * @returns {JSX.Element} Feature card content
 */
function FeatureCardContent(props: {
  icon: React.ReactNode;
  title: string;
  description: string;
}): JSX.Element {
  const contentProps = { title: props.title, description: props.description };
  return <ContentFragment><FeatureIcon icon={props.icon} /><FeatureContent {...contentProps} /></ContentFragment>;
}

/**
 * Renders a feature card
 * @param {Object} props - Feature props
 * @param {React.ReactNode} props.icon - Feature icon element
 * @param {string} props.title - Feature title text
 * @param {string} props.description - Feature description text
 * @returns {JSX.Element} Feature card component
 */
function FeatureCard(props: {
  icon: React.ReactNode;
  title: string;
  description: string;
}): JSX.Element {
  return <FeatureCardContainer children={<FeatureCardContent {...props} />} />;
}

/**
 * Renders a single feature card
 * @param {Object} props - Props object
 * @param {FeatureConfig} props.feature - Feature config
 * @param {number} props.index - Index for key
 * @returns {JSX.Element} Feature card
 */
function FeatureCardItem({ feature, index }: { feature: FeatureConfig; index: number }): JSX.Element {
  return (
    <FeatureCard
      key={index}
      icon={feature.icon}
      title={feature.title}
      description={feature.description}
    />
  );
}

/**
 * Renders the grid container for features
 * @param {React.ReactNode} children - Child content
 * @returns {JSX.Element} Grid container
 */
function FeaturesGrid({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className="mb-8 grid grid-cols-3 gap-4">{children}</div>;
}

/**
 * Renders features grid
 * @returns {JSX.Element} Features section component
 */
function FeaturesSection(): JSX.Element {
  const features = createFeatureItems();

  return (
    <FeaturesGrid>
      {features.map((feature, index) => (
        <FeatureCardItem key={index} feature={feature} index={index} />
      ))}
    </FeaturesGrid>
  );
}

/**
 * Renders action buttons section
 * @param {Function} onSkip - Function to handle skip action
 * @returns {JSX.Element} Action buttons component
 */
function ActionButtons({ onSkip }: { onSkip: () => void }): JSX.Element {
  return (
    <div className="flex justify-center">
      <Button onClick={onSkip} size="lg" className="px-8">
        Get Started
      </Button>
    </div>
  );
}

/**
 * Renders the dialog wrapper with content
 * @param {Function} onSkip - Skip function
 * @returns {JSX.Element} Dialog wrapper
 */
function DialogBody({ onSkip }: { onSkip: () => void }): JSX.Element {
  return (
    <div className="max-w-2xl rounded-2xl border border-border/50 bg-white p-8 shadow-2xl dark:bg-background">
      <DialogHeader />
      <FeaturesSection />
      <ActionButtons onSkip={onSkip} />
    </div>
  );
}

/**
 * Renders the dialog overlay
 * @param {React.ReactNode} children - Child content
 * @returns {JSX.Element} Dialog overlay
 */
function DialogOverlay({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-500">
      {children}
    </div>
  );
}

/**
 * Displays a welcome dialog with features overview
 * @param {WelcomeDialogProps} props - Component props
 * @returns {JSX.Element} The rendered welcome dialog
 */
export function WelcomeDialog({ onSkip }: WelcomeDialogProps): JSX.Element {
  return (
    <DialogOverlay>
      <DialogBody onSkip={onSkip} />
    </DialogOverlay>
  );
}
