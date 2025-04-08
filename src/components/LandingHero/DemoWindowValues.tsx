/**
 * DemoWindowValues Component
 *
 * Values section of the demo window
 *
 * @module components/LandingHero/DemoWindowValues
 */

/**
 * DemoWindowValues component
 * @returns {JSX.Element} The rendered values section
 */
export function DemoWindowValues(): JSX.Element {
  return (
    <>
      <div className="mb-4 text-sm font-medium">Values:</div>
      <div className="mb-6 space-y-2">
        <div className="flex items-center">
          <div className="w-24 text-xs text-muted-foreground">company:</div>
          <div className="text-sm">Acme Inc</div>
        </div>
        <div className="flex items-center">
          <div className="w-24 text-xs text-muted-foreground">product:</div>
          <div className="text-sm">Smart Home Hub</div>
        </div>
        <div className="flex items-center">
          <div className="w-24 text-xs text-muted-foreground">audience:</div>
          <div className="text-sm">tech enthusiasts</div>
        </div>
      </div>
    </>
  );
}
