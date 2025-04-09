/**
 * DemoWindowValues Component
 *
 * Values section of the demo window
 *
 * @module components/LandingHero/DemoWindowValues
 */

interface ValueItemProps {
  label: string;
  value: string;
}

/**
 * Renders a single value item with label and value
 * @param {ValueItemProps} props - Component props
 * @returns {JSX.Element} The value item component
 */
function ValueItem({ label, value }: ValueItemProps): JSX.Element {
  return <div className="flex items-center">
    <div className="w-24 text-xs text-muted-foreground">{label}:</div>
    <div className="text-sm">{value}</div>
  </div>;
}

/**
 * Renders the values section of the demo window
 * @returns {JSX.Element} The values section component
 */
export function DemoWindowValues(): JSX.Element {
  return <>
    <div className="mb-4 text-sm font-medium">Values:</div>
    <div className="mb-6 space-y-2">
      <ValueItem label="company" value="Acme Inc" />
      <ValueItem label="product" value="Smart Home Hub" />
      <ValueItem label="audience" value="tech enthusiasts" />
    </div>
  </>;
}
