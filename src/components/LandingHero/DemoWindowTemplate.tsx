/**
 * DemoWindowTemplate Component
 *
 * Template section of the demo window
 *
 * @module components/LandingHero/DemoWindowTemplate
 */

/**
 * DemoWindowTemplate component
 * @returns {JSX.Element} The rendered template section
 */
export function DemoWindowTemplate(): JSX.Element {
  return (
    <>
      <div className="mb-4 text-sm font-medium">Template:</div>
      <div className="mb-4 rounded-md border border-border/50 bg-background/50 p-3 text-sm">
        Write a compelling ad for{' '}
        <span className="inline-block rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-800/70 dark:text-blue-200 dark:shadow-[0_0_10px_rgba(59,130,246,0.3)]">
          {'<company>'}
        </span>{' '}
        promoting their{' '}
        <span className="inline-block rounded bg-purple-100 px-1.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-800/70 dark:text-purple-200 dark:shadow-[0_0_10px_rgba(168,85,247,0.3)]">
          {'<product>'}
        </span>{' '}
        to{' '}
        <span className="inline-block rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-800/70 dark:text-amber-200 dark:shadow-[0_0_10px_rgba(245,158,11,0.3)]">
          {'<audience>'}
        </span>
      </div>
    </>
  );
}
