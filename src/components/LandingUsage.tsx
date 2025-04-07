/**
 * Landing Usage Component
 *
 * Usage section for the landing page showing how to use the product
 *
 * @module components/LandingUsage
 */
import { FileCode, Braces, Copy } from 'lucide-react';

/**
 * Step item data interface
 */
interface UsageStep {
  icon: JSX.Element;
  title: string;
  description: string;
}

/**
 * Returns the steps for the usage section
 * @returns Array of usage steps
 */
function getUsageSteps(): UsageStep[] {
  return [
    {
      icon: <FileCode className="h-10 w-10 text-primary"/>,
      title: "Create your template",
      description: "Start by creating a prompt template with placeholder tags like <name> or <context>."
    },
    {
      icon: <Braces className="h-10 w-10 text-primary"/>,
      title: "Define placeholders",
      description: "Add and customize each placeholder with specific content to be used in your prompt."
    },
    {
      icon: <Copy className="h-10 w-10 text-primary"/>,
      title: "Generate and export",
      description: "Preview your formatted prompt, then copy or export the result for your AI application."
    }
  ];
}

/**
 * Renders a single usage step
 * @param props The step data and index
 * @returns The rendered step
 */
function UsageStepItem({ step }: { step: UsageStep }): JSX.Element {
  return (
    <div className="flex flex-col">
      <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          {step.icon}
        </div>
        {step.title}
      </dt>
      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
        <p className="flex-auto">{step.description}</p>
      </dd>
    </div>
  );
}

/**
 * Renders the usage section of the landing page
 * @returns JSX element for the usage section
 */
export function LandingUsage(): JSX.Element {
  const steps = getUsageSteps();

  return (
    <section id="usage" className="py-24 sm:py-32">
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How to Use Prompt Shaper
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Create perfect AI prompts in a few simple steps
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, i) => (
              <UsageStepItem key={i} step={step} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
