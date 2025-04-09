/**
 * DemoWindowResult Component
 *
 * Result section of the demo window
 *
 * @module components/LandingHero/DemoWindowResult
 */

/**
 * Result section of the demo window
 * @returns {JSX.Element} The result section component
 */
export function DemoWindowResult(): JSX.Element {
  return <>
    <div className="mb-4 text-sm font-medium">Result:</div>
    <div className="rounded-md border border-green-100 bg-green-50 p-3 text-sm dark:border-green-900/50 dark:bg-green-900/20">
      Write a compelling ad for Acme Inc promoting their Smart Home Hub to tech enthusiasts.
    </div>
  </>;
}
