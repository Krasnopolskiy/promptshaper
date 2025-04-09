/**
 * Landing Features Component
 *
 * Features section for the landing page showing product capabilities
 *
 * @module components/LandingFeatures
 */
import { useState } from 'react';
import { Layers, FileCode, Wand2, Palette } from 'lucide-react';

/**
 * LandingFeatures component props
 * @interface LandingFeaturesProps
 */
interface LandingFeaturesProps {
  /** Whether the features section is visible */
  _isVisible: boolean;
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
 * Static data for landing page features.
 */
const FEATURES_DATA: FeatureItem[] = [
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

/**
 * Renders the section header.
 * @returns {JSX.Element} The section header.
 */
function renderSectionHeader(): JSX.Element {
  return (
    <div className="mb-16 text-center">
      <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powerful Features</h2>
      <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
        Everything you need to create and manage your AI prompts efficiently
      </p>
    </div>
  );
}

/**
 * Renders the grid of feature cards.
 * @param {FeatureItem[]} features - Array of features.
 * @param {number} activeFeature - Index of the active feature.
 * @param {(index: number) => void} setActiveFeature - Function to set the active feature.
 * @returns {JSX.Element} The feature grid.
 */
function renderFeatureGrid(features: FeatureItem[], activeFeature: number, setActiveFeature: (index: number) => void): JSX.Element {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => <FeatureCard key={index} feature={feature} isActive={activeFeature === index} onMouseEnter={() => setActiveFeature(index)} />)}
    </div>
  );
}

/**
 * Features section for the landing page
 * @param {LandingFeaturesProps} props - Component props
 * @returns The rendered features section
 */
export function LandingFeatures({ _isVisible, featuresRef }: LandingFeaturesProps): JSX.Element {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div ref={featuresRef} className="py-16">
      {renderSectionHeader()}
      {renderFeatureGrid(FEATURES_DATA, activeFeature, setActiveFeature)}
    </div>
  );
}

/**
 * Helper Functions for FeatureCard
 */

/**
 * Renders the icon part of the feature card.
 * @param {JSX.Element} icon - The icon element.
 * @returns {JSX.Element} The icon container.
 */
function renderFeatureIcon(icon: JSX.Element): JSX.Element {
  return (
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
      {icon}
    </div>
  );
}

/**
 * Renders the text part of the feature card.
 * @param {string} title - The feature title.
 * @param {string} description - The feature description.
 * @returns {JSX.Element} The text content.
 */
function renderFeatureText(title: string, description: string): JSX.Element {
  return (
    <>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </>
  );
}

/**
 * FeatureCard component props
 * @interface FeatureCardProps
 */
interface FeatureCardProps {
  feature: FeatureItem;
  isActive: boolean;
  onMouseEnter: () => void;
}

/**
 * Individual feature card component
 * @param {FeatureCardProps} props - Component props
 * @returns The rendered feature card
 */
function FeatureCard({ feature, isActive, onMouseEnter }: FeatureCardProps): JSX.Element {
  return (
    <div className={`relative overflow-hidden rounded-lg border p-2 transition-all hover:border-foreground/50 ${isActive ? 'border-foreground/50 shadow-lg' : 'border-border'}`} onMouseEnter={onMouseEnter}>
      <div className="flex h-full flex-col justify-between space-y-2">
        {renderFeatureIcon(feature.icon)}
        {renderFeatureText(feature.title, feature.description)}
      </div>
    </div>
  );
}

/**
 * Helper Functions for LandingFeatures
 */

/**
 * Returns the features data array
 * @deprecated Use FEATURES_DATA constant directly instead.
 * @returns {FeatureItem[]} Array of feature objects.
 */
function _getFeatures(): FeatureItem[] {
  return FEATURES_DATA;
}
