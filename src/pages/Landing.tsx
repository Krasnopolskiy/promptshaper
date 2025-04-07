/**
 * Landing Page Component
 *
 * Main landing page with product information sections
 *
 * @module pages/Landing
 */
import {LandingHeader} from '@/components/LandingHeader';
import {LandingHero} from '@/components/LandingHero';
import {LandingFeatures} from '@/components/LandingFeatures';
import {LandingUsage} from '@/components/LandingUsage';
import {LandingFooter} from '@/components/LandingFooter';
import {useSectionVisibility} from '@/hooks/useSectionVisibility';

/**
 * Interface for section visibility state
 */
interface SectionVisibility {
  [key: string]: boolean;
}

/**
 * Props for the landing layout component
 */
interface LandingLayoutProps {
  /** Whether the hero section is visible */
  isHeroVisible: boolean;
  /** Whether the features section is visible */
  isFeaturesVisible: boolean;
  /** Ref for the hero section */
  heroRef: React.RefObject<HTMLDivElement>;
  /** Ref for the features section */
  featuresRef: React.RefObject<HTMLDivElement>;
}

/**
 * Props for the hero section
 */
interface HeroSectionProps {
  /** Whether the hero section is visible */
  isVisible: boolean;
  /** Ref for the hero section */
  heroRef: React.RefObject<HTMLDivElement>;
}

/**
 * Renders the hero section of the landing page
 * @param {HeroSectionProps} props - Component props
 * @returns The rendered hero section
 */
function HeroSection(props: HeroSectionProps): JSX.Element {
  return <LandingHero isVisible={props.isVisible} heroRef={props.heroRef} />;
}

/**
 * Props for the features section
 */
interface FeaturesSectionProps {
  /** Whether the features section is visible */
  isVisible: boolean;
  /** Ref for the features section */
  featuresRef: React.RefObject<HTMLDivElement>;
}

/**
 * Renders the features section of the landing page
 * @param {FeaturesSectionProps} props - Component props
 * @returns The rendered features section
 */
function FeaturesSection(props: FeaturesSectionProps): JSX.Element {
  return <LandingFeatures isVisible={props.isVisible} featuresRef={props.featuresRef} />;
}

/**
 * Renders the usage section of the landing page
 * @returns The rendered usage section
 */
function UsageSection(): JSX.Element {
  return <LandingUsage />;
}

/**
 * Renders hero and usage sections
 * @param {LandingLayoutProps} props - Component props
 * @returns The rendered hero and usage sections
 */
function TopSections(props: LandingLayoutProps): JSX.Element {
  return (
    <>
      <HeroSection isVisible={props.isHeroVisible} heroRef={props.heroRef} />
      <UsageSection />
    </>
  );
}

/**
 * Renders features section
 * @param {LandingLayoutProps} props - Component props
 * @returns The rendered features section
 */
function BottomSections(props: LandingLayoutProps): JSX.Element {
  return (
    <FeaturesSection
      isVisible={props.isFeaturesVisible}
      featuresRef={props.featuresRef}
    />
  );
}

/**
 * Renders the main content of the landing page
 * @param {LandingLayoutProps} props - Component props
 * @returns The rendered content sections
 */
function LandingContent(props: LandingLayoutProps): JSX.Element {
  return (
    <>
      <TopSections {...props} />
      <BottomSections {...props} />
    </>
  );
}

/**
 * Landing page layout component that structures the main UI
 * @param {LandingLayoutProps} props - Component props
 * @returns The rendered landing page layout
 */
function LandingLayout(props: LandingLayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <LandingContent {...props} />
      <LandingFooter />
    </div>
  );
}

/**
 * Creates visibility props from section visibility
 * @param {SectionVisibility} visibility - Visibility state
 * @returns Visibility state props
 */
function getVisibilityProps(visibility: SectionVisibility):
  Pick<LandingLayoutProps, 'isHeroVisible' | 'isFeaturesVisible'> {
  return {
    isHeroVisible: visibility.hero,
    isFeaturesVisible: visibility.features
  };
}

/**
 * Creates props for the landing layout
 * @param {SectionVisibility} visibility - Visibility state
 * @param {React.RefObject<HTMLDivElement>} heroRef - Reference to hero section
 * @param {React.RefObject<HTMLDivElement>} featuresRef - Reference to features section
 * @returns Props for the landing layout
 */
function createLayoutProps(
  visibility: SectionVisibility,
  heroRef: React.RefObject<HTMLDivElement>,
  featuresRef: React.RefObject<HTMLDivElement>
): LandingLayoutProps {
  return { ...getVisibilityProps(visibility), heroRef, featuresRef };
}

/**
 * Landing page component that showcases the product features
 * @returns The rendered landing page
 */
const Landing = (): JSX.Element => {
  const { isVisible, heroRef, featuresRef } = useSectionVisibility();
  const layoutProps = createLayoutProps(isVisible, heroRef, featuresRef);
  return <LandingLayout {...layoutProps} />;
};

export default Landing;
