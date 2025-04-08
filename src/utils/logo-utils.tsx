/**
 * Logo utility components
 *
 * Helper components for rendering the application logo
 *
 * @module utils/logo-utils
 */
import { Link } from 'react-router-dom';

/**
 * Renders the application logo text
 * @returns {JSX.Element} Logo text component
 */
export function renderLogoText(): JSX.Element {
  return (
    <div>
      <h1 className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-xl font-semibold text-transparent">
        Prompt Shaper
      </h1>
      <p className="text-xs text-muted-foreground">Create perfect AI prompts</p>
    </div>
  );
}

/**
 * Renders the application logo icon
 * @returns {JSX.Element} Logo icon component
 */
export function renderLogoIcon(): JSX.Element {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-sm">
      <span className="text-lg font-semibold text-primary-foreground">P</span>
    </div>
  );
}

/**
 * Renders the application brand logo
 * @returns {JSX.Element} Brand logo component
 */
export function renderBrandLogo(): JSX.Element {
  return (
    <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
      {renderLogoIcon()}
      {renderLogoText()}
    </Link>
  );
}
