/**
 * DemoWindowHeader Component
 *
 * Header section of the demo window
 *
 * @module components/LandingHero/DemoWindowHeader
 */

/**
 * DemoWindowHeader component
 * @returns {JSX.Element} The rendered header
 */
export function DemoWindowHeader(): JSX.Element {
  return (
    <div className="flex items-center gap-2 border-b border-border/50 p-4">
      <div className="h-3 w-3 rounded-full bg-red-400"></div>
      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
      <div className="h-3 w-3 rounded-full bg-green-400"></div>
      <div className="ml-2 text-sm font-medium">Prompt Shaper</div>
    </div>
  );
}
