/**
 * DemoWindowTemplate Component
 *
 * Template section of the demo window
 *
 * @module components/LandingHero/DemoWindowTemplate
 */

/**
 * Renders a placeholder tag with specific styling
 * @param {object} props - Component props
 * @param {string} props.text - Text to display
 * @param {string} props.color - Color theme (blue, purple, amber)
 * @returns {JSX.Element} The placeholder tag component
 */
function PlaceholderTag({ text, color }: { text: string; color: string }): JSX.Element {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-800/70 dark:text-blue-200 dark:shadow-[0_0_10px_rgba(59,130,246,0.3)]",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-800/70 dark:text-purple-200 dark:shadow-[0_0_10px_rgba(168,85,247,0.3)]",
    amber: "bg-amber-100 text-amber-800 dark:bg-amber-800/70 dark:text-amber-200 dark:shadow-[0_0_10px_rgba(245,158,11,0.3)]"
  };
  return <span className={`inline-block rounded px-1.5 py-0.5 text-xs font-medium ${colorClasses[color as keyof typeof colorClasses]}`}>{text}</span>;
}

/**
 * Renders the template section of the demo window
 * @returns {JSX.Element} The template section component
 */
export function DemoWindowTemplate(): JSX.Element {
  return <>
    <div className="mb-4 text-sm font-medium">Template:</div>
    <div className="mb-4 rounded-md border border-border/50 bg-background/50 p-3 text-sm">
      Write a compelling ad for{' '}<PlaceholderTag text={'<company>'} color="blue" />{' '}
      promoting their{' '}<PlaceholderTag text={'<product>'} color="purple" />{' '}
      to{' '}<PlaceholderTag text={'<audience>'} color="amber" />
    </div>
  </>;
}
