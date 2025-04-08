/**
 * DemoWindowContent Component
 *
 * Content section of the demo window
 *
 * @module components/LandingHero/DemoWindowContent
 */
import { DemoWindowTemplate } from './DemoWindowTemplate';
import { DemoWindowValues } from './DemoWindowValues';
import { DemoWindowResult } from './DemoWindowResult';

/**
 * DemoWindowContent component
 * @returns {JSX.Element} The rendered content
 */
export function DemoWindowContent(): JSX.Element {
  return (
    <div className="p-6">
      <DemoWindowTemplate />
      <DemoWindowValues />
      <DemoWindowResult />
    </div>
  );
}
