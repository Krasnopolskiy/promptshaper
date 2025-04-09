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
 * Creates the first usage step
 * @returns {UsageStep} The first step configuration
 */
function createStepOne(): UsageStep {
  return {
    icon: <FileCode className="h-10 w-10 text-primary"/>,
    title: "Create your template",
    description: "Start by creating a prompt template with placeholder tags like <n> or <context>."
  };
}

/**
 * Creates the second usage step
 * @returns {UsageStep} The second step configuration
 */
function createStepTwo(): UsageStep {
  return {
    icon: <Braces className="h-10 w-10 text-primary"/>,
    title: "Define placeholders",
    description: "Add and customize each placeholder with specific content to be used in your prompt."
  };
}

/**
 * Creates the third usage step
 * @returns {UsageStep} The third step configuration
 */
function createStepThree(): UsageStep {
  return {
    icon: <Copy className="h-10 w-10 text-primary"/>,
    title: "Generate and export",
    description: "Preview your formatted prompt, then copy or export the result for your AI application."
  };
}

/**
 * Returns the steps for the usage section
 * @returns {UsageStep[]} Array of usage steps
 */
function getUsageSteps(): UsageStep[] {
  return [createStepOne(), createStepTwo(), createStepThree()];
}

/**
 * Renders the icon portion of a step
 * @param {JSX.Element} icon - The icon to render
 * @returns {JSX.Element} The icon container
 */
function StepIcon({ icon }: { icon: JSX.Element }): JSX.Element {
  return <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">{icon}</div>;
}

/**
 * Renders the step description
 * @param {string} description - The step description text
 * @returns {JSX.Element} The description component
 */
function StepDescription({ description }: { description: string }): JSX.Element {
  return <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
    <p className="flex-auto">{description}</p>
  </dd>;
}

/**
 * Renders a single usage step
 * @param {Object} props - The component props
 * @param {UsageStep} props.step - The usage step data to render
 * @returns {JSX.Element} The rendered step
 */
function UsageStepItem({ step }: { step: UsageStep }): JSX.Element {
  return <div className="flex flex-col">
    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7">
      <StepIcon icon={step.icon} />
      {step.title}
    </dt>
    <StepDescription description={step.description} />
  </div>;
}

/**
 * Renders the section header
 * @returns {JSX.Element} The section header component
 */
function SectionHeader(): JSX.Element {
  return <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How to Use Prompt Shaper</h2>
    <p className="mt-4 text-lg leading-8 text-muted-foreground">Create perfect AI prompts in a few simple steps</p>
  </div>;
}

/**
 * Renders the steps grid
 * @param {UsageStep[]} steps - The steps to render
 * @returns {JSX.Element} The steps grid component
 */
function StepsGrid({ steps }: { steps: UsageStep[] }): JSX.Element {
  return <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
      {steps.map((step, i) => <UsageStepItem key={i} step={step} />)}
    </dl>
  </div>;
}

/**
 * Renders the usage section of the landing page
 * @returns {JSX.Element} The usage section component
 */
export function LandingUsage(): JSX.Element {
  const steps = getUsageSteps();
  return <section id="usage" className="py-24 sm:py-32">
    <div className="px-6 lg:px-8">
      <SectionHeader />
      <StepsGrid steps={steps} />
    </div>
  </section>;
}
