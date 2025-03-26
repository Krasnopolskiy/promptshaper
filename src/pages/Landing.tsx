import {useEffect, useMemo, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {LandingHeader} from '@/components/LandingHeader';
import {ArrowRight, Bot, FileCode, Layers, Palette, Sparkles, Wand2} from 'lucide-react';

const Landing = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    hero: false,
    features: false,
    workflow: false,
    testimonials: false,
    cta: false,
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useMemo(
    () => ({
      hero: heroRef,
      features: featuresRef,
      workflow: workflowRef,
      testimonials: testimonialsRef,
      cta: ctaRef,
    }),
    []
  );

  const features = [
    {
      title: 'Reusable Placeholders',
      description: 'Create and manage placeholders that can be reused across multiple prompts.',
      icon: <Layers className="h-6 w-6 text-blue-500"/>,
    },
    {
      title: 'Custom Templates',
      description: 'Build and save prompt templates with your placeholders for consistent results.',
      icon: <FileCode className="h-6 w-6 text-purple-500"/>,
    },
    {
      title: 'Real-time Preview',
      description: 'See your completed prompt with all placeholders filled in as you type.',
      icon: <Wand2 className="h-6 w-6 text-amber-500"/>,
    },
    {
      title: 'Color Coding',
      description: 'Visually organize your placeholders with custom colors for better recognition.',
      icon: <Palette className="h-6 w-6 text-red-500"/>,
    },
  ];

  // Rotate through features automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  // Intersection observer for animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setIsVisible(prev => ({...prev, [key]: true}));
              }
            });
          },
          {threshold: 0.1}
        );

        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sectionRefs]);

  const workflowSteps = [
    {
      title: 'Create placeholders',
      description: 'Define reusable variables like customer names, product features, or timelines.',
      icon: <Layers className="h-6 w-6 text-blue-500"/>,
    },
    {
      title: 'Build templates',
      description: 'Create prompt templates that incorporate your custom placeholders.',
      icon: <FileCode className="h-6 w-6 text-purple-500"/>,
    },
    {
      title: 'Fill in values',
      description: 'Replace placeholders with actual values for each specific use case.',
      icon: <Wand2 className="h-6 w-6 text-amber-500"/>,
    },
    {
      title: 'Generate content',
      description: 'Use your completed prompt to generate perfect AI content every time.',
      icon: <Bot className="h-6 w-6 text-green-500"/>,
    },
  ];

  const testimonials = [
    {
      quote:
        'Prompt Shaper has completely transformed how our team creates AI prompts. We save hours every week!',
      author: 'Sarah J.',
      role: 'Content Manager',
    },
    {
      quote:
        'The ability to reuse placeholders across different templates is a game-changer for consistency.',
      author: 'Michael T.',
      role: 'AI Prompt Engineer',
    },
    {
      quote:
        'I love how I can visually organize my prompts with color coding. Makes complex prompts so much easier.',
      author: 'Alex R.',
      role: 'UX Designer',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader/>

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden px-4 py-20 md:py-32">
        <div
          className={`mx-auto max-w-6xl transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
            <div className="flex-1">
              <div
                className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Sparkles className="mr-2 h-3.5 w-3.5"/>
                AI Prompt Management
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Create <span className="text-primary">perfect AI prompts</span> with reusable
                placeholders
              </h1>

              <p className="mb-8 max-w-xl text-lg text-muted-foreground md:text-xl">
                Prompt Shaper helps you create, manage, and reuse placeholders for consistent AI
                interactions across your team or projects.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/app">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started <ArrowRight className="ml-2 h-4 w-4"/>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative flex-1">
              <div
                className="relative z-10 overflow-hidden rounded-2xl border border-border/50 bg-white shadow-xl backdrop-blur-none dark:bg-background">
                <div className="flex items-center gap-2 border-b border-border/50 p-4">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  <div className="ml-2 text-sm font-medium">Prompt Shaper</div>
                </div>
                <div className="p-6">
                  <div className="mb-4 text-sm font-medium">Template:</div>
                  <div
                    className="mb-4 rounded-md border border-border/50 bg-background/50 p-3 text-sm">
                    Write a compelling ad for{' '}
                    <span
                      className="inline-block rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-800/70 dark:text-blue-200 dark:shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                      {'<company>'}
                    </span>{' '}
                    promoting their{' '}
                    <span
                      className="inline-block rounded bg-purple-100 px-1.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-800/70 dark:text-purple-200 dark:shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                      {'<product>'}
                    </span>{' '}
                    to{' '}
                    <span
                      className="inline-block rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-800/70 dark:text-amber-200 dark:shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                      {'<audience>'}
                    </span>
                  </div>
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
                  <div className="mb-4 text-sm font-medium">Result:</div>
                  <div
                    className="rounded-md border border-green-100 bg-green-50 p-3 text-sm dark:border-green-900/50 dark:bg-green-900/20">
                    Write a compelling ad for Acme Inc promoting their Smart Home Hub to tech
                    enthusiasts.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="bg-white px-4 py-20 dark:bg-background">
        <div
          className={`mx-auto max-w-6xl transition-all duration-1000 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powerful Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Everything you need to create and manage your AI prompts efficiently
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`rounded-xl border border-border/50 bg-white p-6 shadow-lg transition-all duration-500 dark:bg-background ${
                  activeFeature === index
                    ? 'scale-105 border-primary/20 shadow-xl'
                    : 'hover:scale-[1.02] hover:shadow-xl'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={workflowRef} className="bg-white px-4 py-20 dark:bg-background">
        <div
          className={`mx-auto max-w-6xl transition-all duration-1000 ${isVisible.workflow ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How It Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Prompt Shaper simplifies the process of creating consistent AI prompts
            </p>
          </div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 bg-border md:block"></div>

            {/* Step 1: Create placeholders */}
            <div className="mb-16 flex flex-col items-center md:mb-24 md:flex-row">
              <div className="mb-8 md:mb-0 md:w-1/2 md:pr-12 md:text-right">
                <h3 className="mb-2 text-2xl font-bold">Create placeholders</h3>
                <p className="text-lg text-muted-foreground">
                  Define reusable variables like customer names, product features, or timelines.
                </p>
              </div>

              <div className="relative flex-shrink-0">
                <div
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-blue-100 bg-white shadow-lg dark:border-blue-900/50 dark:bg-background">
                  <Layers className="h-8 w-8 text-blue-500"/>
                </div>
              </div>

              <div className="mt-8 md:mt-0 md:w-1/2 md:pl-12">
                <div
                  className="rounded-lg border border-blue-100 bg-white p-6 shadow-md dark:border-blue-900/50 dark:bg-background">
                  <div className="flex flex-wrap gap-2">
                    <div
                      className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 dark:bg-indigo-800/70 dark:text-indigo-200 dark:shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                      {'<company>'}
                    </div>
                    <div
                      className="inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-800/70 dark:text-purple-200 dark:shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                      {'<product>'}
                    </div>
                    <div
                      className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800 dark:bg-orange-800/70 dark:text-orange-200 dark:shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                      {'<audience>'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Build templates */}
            <div className="mb-16 flex flex-col items-center md:mb-24 md:flex-row">
              <div className="order-2 mb-8 md:order-1 md:mb-0 md:w-1/2 md:pr-12 md:text-right">
                <div
                  className="rounded-lg border border-blue-100 bg-white p-6 shadow-md dark:border-blue-900/50 dark:bg-background">
                  <p className="text-base">
                    Write a compelling ad for{' '}
                    <span
                      className="inline-block rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-800/70 dark:text-indigo-200 dark:shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                      {'<company>'}
                    </span>{' '}
                    promoting their{' '}
                    <span
                      className="inline-block rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-800/70 dark:text-purple-200 dark:shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                      {'<product>'}
                    </span>{' '}
                    to{' '}
                    <span
                      className="inline-block rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-800/70 dark:text-orange-200 dark:shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                      {'<audience>'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="relative order-1 flex-shrink-0 md:order-2">
                <div
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-blue-100 bg-white shadow-lg dark:border-blue-900/50 dark:bg-background">
                  <FileCode className="h-8 w-8 text-purple-500"/>
                </div>
              </div>

              <div className="order-3 mt-8 md:mt-0 md:w-1/2 md:pl-12">
                <h3 className="mb-2 text-2xl font-bold">Build templates</h3>
                <p className="text-lg text-muted-foreground">
                  Create prompt templates that incorporate your custom placeholders.
                </p>
              </div>
            </div>

            {/* Step 3: Fill in values */}
            <div className="mb-16 flex flex-col items-center md:mb-24 md:flex-row">
              <div className="mb-8 md:mb-0 md:w-1/2 md:pr-12 md:text-right">
                <h3 className="mb-2 text-2xl font-bold">Fill in values</h3>
                <p className="text-lg text-muted-foreground">
                  Replace placeholders with actual values for each specific use case.
                </p>
              </div>

              <div className="relative flex-shrink-0">
                <div
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-blue-100 bg-white shadow-lg dark:border-blue-900/50 dark:bg-background">
                  <Wand2 className="h-8 w-8 text-amber-500"/>
                </div>
              </div>

              <div className="mt-8 md:mt-0 md:w-1/2 md:pl-12">
                <div
                  className="rounded-lg border border-blue-100 bg-white p-6 shadow-md dark:border-blue-900/50 dark:bg-background">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="mr-4 w-24 text-right text-sm text-muted-foreground">
                        company:
                      </div>
                      <div className="text-base font-medium">Acme Inc</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 w-24 text-right text-sm text-muted-foreground">
                        product:
                      </div>
                      <div className="text-base font-medium">Smart Home Hub</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 w-24 text-right text-sm text-muted-foreground">
                        audience:
                      </div>
                      <div className="text-base font-medium">tech enthusiasts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Generate content */}
            <div className="flex flex-col items-center md:flex-row">
              <div className="order-2 mb-8 md:order-1 md:mb-0 md:w-1/2 md:pr-12 md:text-right">
                <div
                  className="rounded-lg border border-blue-100 bg-white p-6 shadow-md dark:border-blue-900/50 dark:bg-background">
                  <div
                    className="rounded border border-green-100 bg-green-50 p-3 text-base dark:border-green-900/50 dark:bg-green-900/30">
                    Write a compelling ad for Acme Inc promoting their Smart Home Hub to tech
                    enthusiasts.
                  </div>
                </div>
              </div>

              <div className="relative order-1 flex-shrink-0 md:order-2">
                <div
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-blue-100 bg-white shadow-lg dark:border-blue-900/50 dark:bg-background">
                  <Bot className="h-8 w-8 text-green-500"/>
                </div>
              </div>

              <div className="order-3 mt-8 md:mt-0 md:w-1/2 md:pl-12">
                <h3 className="mb-2 text-2xl font-bold">Generate content</h3>
                <p className="text-lg text-muted-foreground">
                  Use your completed prompt to generate perfect AI content every time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="bg-white px-4 py-20 dark:bg-background">
        <div
          className={`mx-auto max-w-4xl transition-all duration-1000 ${isVisible.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Users Say</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Join thousands of users who are already improving their AI prompts
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-xl border border-border/50 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-background"
              >
                <div className="mb-4 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="inline-block h-4 w-4 fill-current"/>
                  ))}
                </div>
                <p className="mb-4 italic text-muted-foreground">"{testimonial.quote}"</p>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="px-4 py-20">
        <div
          className={`mx-auto max-w-4xl transition-all duration-1000 ${isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div
            className="rounded-2xl bg-gradient-to-r from-primary/90 to-primary p-8 text-center text-white shadow-xl md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to improve your AI prompts?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              Start creating consistent, reusable prompts that save time and improve results.
            </p>
            <Link to="/app">
              <Button
                size="lg"
                variant="secondary"
                className="text-primary dark:text-primary-foreground"
              >
                Get Started Today <ArrowRight className="ml-2 h-4 w-4"/>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background px-4 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <span className="font-semibold text-primary">P</span>
            </div>
            <span className="font-medium">Prompt Shaper</span>
          </div>

          <div className="ml-4 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Prompt Shaper
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
