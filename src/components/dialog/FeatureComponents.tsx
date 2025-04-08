/**
 * Feature Components
 *
 * UI components for rendering feature cards in the welcome dialog
 *
 * @module components/dialog/FeatureComponents
 */
import { Fragment } from 'react';
import { getCardClassName } from './utils/featureUtils';

/**
 * Renders a feature card's icon
 * @param {React.ReactNode} icon - Feature icon
 * @returns {JSX.Element} Feature icon component
 */
export function FeatureIcon({ icon }: { icon: React.ReactNode }): JSX.Element {
  return <div className="mb-2">{icon}</div>;
}

/**
 * Renders a feature title
 * @param {string} title - Feature title
 * @returns {JSX.Element} Feature title component
 */
export function FeatureTitle({ title }: { title: string }): JSX.Element {
  return <h3 className="font-medium">{title}</h3>;
}

/**
 * Renders a feature description
 * @param {string} description - Feature description
 * @returns {JSX.Element} Feature description component
 */
export function FeatureDescription({ description }: { description: string }): JSX.Element {
  return <p className="text-sm text-muted-foreground">{description}</p>;
}

/**
 * Creates a fragment with children
 * @param {React.ReactNode} children - Content
 * @returns {JSX.Element} React fragment
 */
export function ContentFragment({ children }: { children: React.ReactNode }): JSX.Element {
  return <Fragment>{children}</Fragment>;
}

/**
 * Renders a feature card's content
 * @param {string} title - Feature title
 * @param {string} description - Feature description
 * @returns {JSX.Element} Feature content component
 */
export function FeatureContent({ title, description }: { title: string; description: string }): JSX.Element {
  return (
    <ContentFragment>
      <FeatureTitle title={title} />
      <FeatureDescription description={description} />
    </ContentFragment>
  );
}

/**
 * Renders a feature card container with components
 * @param {React.ReactNode} children - Card content
 * @returns {JSX.Element} Card container
 */
export function FeatureCardContainer({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className={getCardClassName()}>{children}</div>;
}
