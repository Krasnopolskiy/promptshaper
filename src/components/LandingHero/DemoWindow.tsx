/**
 * DemoWindow Component
 *
 * Demo window showing the app interface
 *
 * @module components/LandingHero/DemoWindow
 */
import { DemoWindowHeader } from './DemoWindowHeader';
import { DemoWindowContent } from './DemoWindowContent';

/**
 * DemoWindow component
 * @returns {JSX.Element} The rendered demo window
 */
export function DemoWindow(): JSX.Element {
  return (
    <div className="relative z-10 overflow-hidden rounded-2xl border border-border/50 bg-white shadow-xl backdrop-blur-none dark:bg-background">
      <DemoWindowHeader />
      <DemoWindowContent />
    </div>
  );
}
