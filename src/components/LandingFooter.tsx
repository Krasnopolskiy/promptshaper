/**
 * Landing Footer Component
 *
 * Footer for the landing page
 *
 * @module components/LandingFooter
 */

/**
 * Gets the current year for copyright notice
 * @returns Current year as string
 */
function getCurrentYear(): string {
  return new Date().getFullYear().toString();
}

/**
 * Renders the product logo mark
 * @returns The logo JSX element
 */
function LogoMark(): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
        <span className="font-semibold text-primary">P</span>
      </div>
      <span className="font-medium">Prompt Shaper</span>
    </div>
  );
}

/**
 * Renders the copyright notice
 * @returns The copyright JSX element
 */
function CopyrightNote(): JSX.Element {
  return (
    <div className="ml-4 text-sm text-muted-foreground">
      © {getCurrentYear()} Prompt Shaper
    </div>
  );
}

/**
 * Renders the footer for the landing page
 * @returns JSX element for the footer
 */
export function LandingFooter(): JSX.Element {
  return (
    <footer className="border-t border-border/50 bg-background px-4 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-center">
        <LogoMark />
        <CopyrightNote />
      </div>
    </footer>
  );
}
