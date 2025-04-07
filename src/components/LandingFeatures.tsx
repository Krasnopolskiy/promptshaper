/**
 * Landing Features Component
 *
 * Features section for the landing page showing product capabilities
 *
 * @module components/LandingFeatures
 */
import { useState, useEffect } from 'react';
import { Layers, FileCode, Wand2, Palette } from 'lucide-react';

/**
 * LandingFeatures component props
 * @interface LandingFeaturesProps
 */
interface LandingFeaturesProps {
  /** Whether the features section is visible */
  isVisible: boolean;
  /** Ref to attach to the component */
  featuresRef: React.RefObject<HTMLDivElement>;
}

/**
 * Feature item data structure
 * @interface FeatureItem
 */
interface FeatureItem {
  title: string;
  description: string;
  icon: JSX.Element;
}

/**
 * Features section for the landing page
 * @param {LandingFeaturesProps} props - Component props
 * @returns The rendered features section
 */
export function LandingFeatures({ isVisible, featuresRef }: LandingFeaturesProps): JSX.Element {
  const [activeFeature, setActiveFeature] = useState(0);
  const features = getFeatures();

  /**
   * Set up automatic rotation through features
   */
  useEffect((): (() => void) => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section ref={featuresRef} className="bg-white px-4 py-20 dark:bg-background">
      <div
        className={`mx-auto max-w-6xl transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powerful Features</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Everything you need to create and manage your AI prompts efficiently
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              isActive={activeFeature === index}
              onMouseEnter={() => setActiveFeature(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * FeatureCard component props
 * @interface FeatureCardProps
 */
interface FeatureCardProps {
  /** Feature data to display */
  feature: FeatureItem;
  /** Whether this feature is active */
  isActive: boolean;
  /** Mouse enter handler */
  onMouseEnter: () => void;
}

/**
 * Individual feature card component
 * @param {FeatureCardProps} props - Component props
 * @returns The rendered feature card
 */
function FeatureCard({ feature, isActive, onMouseEnter }: FeatureCardProps): JSX.Element {
  return (
    <div
      className={`rounded-xl border border-border/50 bg-white p-6 shadow-lg transition-all duration-500 dark:bg-background ${
        isActive
          ? 'scale-105 border-primary/20 shadow-xl'
          : 'hover:scale-[1.02] hover:shadow-xl'
      }`}
      onMouseEnter={onMouseEnter}
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        {feature.icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </div>
  );
}

/**
 * Creates and returns the feature data array
 * @returns Array of feature objects with title, description and icon
 */
function getFeatures(): Array<FeatureItem> {
  return [
    {
      title: 'Reusable Placeholders',
      description: 'Create and manage placeholders that can be reused across multiple prompts.',
      icon: <Layers className="h-6 w-6 text-blue-500"/>,
    },
    {
      title: 'Custom Templates',
      description: 'Build and save prompt templates with your placeholders for consistent results.',
      icon: <FileCode className="h-6 w-6 text-purple-500"/>,
    },
    {
      title: 'Real-time Preview',
      description: 'See your completed prompt with all placeholders filled in as you type.',
      icon: <Wand2 className="h-6 w-6 text-amber-500"/>,
    },
    {
      title: 'Color Coding',
      description: 'Visually organize your placeholders with custom colors for better recognition.',
      icon: <Palette className="h-6 w-6 text-red-500"/>,
    },
  ];
}
