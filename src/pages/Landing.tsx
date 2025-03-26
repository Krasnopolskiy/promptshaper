import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/LandingHeader';
import { 
  Wand2, FileCode, Layers, 
  Palette, RotateCw, Check, ArrowRight,
  MessageSquare, Bot, User, ChevronRight, Sparkles
} from 'lucide-react';

const Landing = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({
    hero: false,
    features: false,
    workflow: false,
    testimonials: false,
    cta: false
  });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const sectionRefs = useMemo(() => ({
    hero: heroRef,
    features: featuresRef,
    workflow: workflowRef,
    testimonials: testimonialsRef,
    cta: ctaRef
  }), []);

  const features = [
    {
      title: "Reusable Placeholders",
      description: "Create and manage placeholders that can be reused across multiple prompts.",
      icon: <Layers className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Custom Templates",
      description: "Build and save prompt templates with your placeholders for consistent results.",
      icon: <FileCode className="h-6 w-6 text-purple-500" />
    },
    {
      title: "Real-time Preview",
      description: "See your completed prompt with all placeholders filled in as you type.",
      icon: <Wand2 className="h-6 w-6 text-amber-500" />
    },
    {
      title: "Color Coding",
      description: "Visually organize your placeholders with custom colors for better recognition.",
      icon: <Palette className="h-6 w-6 text-red-500" />
    }
  ];

  // Rotate through features automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  // Intersection observer for animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setIsVisible(prev => ({ ...prev, [key]: true }));
              }
            });
          },
          { threshold: 0.1 }
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
      title: "Create placeholders",
      description: "Define reusable variables like customer names, product features, or timelines.",
      icon: <Layers className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Build templates",
      description: "Create prompt templates that incorporate your custom placeholders.",
      icon: <FileCode className="h-6 w-6 text-purple-500" />
    },
    {
      title: "Fill in values",
      description: "Replace placeholders with actual values for each specific use case.",
      icon: <Wand2 className="h-6 w-6 text-amber-500" />
    },
    {
      title: "Generate content",
      description: "Use your completed prompt to generate perfect AI content every time.",
      icon: <Bot className="h-6 w-6 text-green-500" />
    }
  ];

  const testimonials = [
    {
      quote: "Prompt Shaper has completely transformed how our team creates AI prompts. We save hours every week!",
      author: "Sarah J.",
      role: "Content Manager"
    },
    {
      quote: "The ability to reuse placeholders across different templates is a game-changer for consistency.",
      author: "Michael T.",
      role: "AI Prompt Engineer"
    },
    {
      quote: "I love how I can visually organize my prompts with color coding. Makes complex prompts so much easier.",
      author: "Alex R.",
      role: "UX Designer"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative px-4 py-20 md:py-32 overflow-hidden"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
                <Sparkles className="h-3.5 w-3.5 mr-2" />
                AI Prompt Management
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Create <span className="text-primary">perfect AI prompts</span> with reusable placeholders
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                Prompt Shaper helps you create, manage, and reuse placeholders for consistent AI interactions across your team or projects.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/app">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative z-10 bg-white dark:bg-background backdrop-blur-none rounded-2xl shadow-xl border border-border/50 overflow-hidden">
                <div className="border-b border-border/50 p-4 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  <div className="ml-2 text-sm font-medium">Prompt Shaper</div>
                </div>
                <div className="p-6">
                  <div className="mb-4 text-sm font-medium">Template:</div>
                  <div className="p-3 rounded-md bg-background/50 border border-border/50 text-sm mb-4">
                    Write a compelling ad for <span className="inline-block px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-800/70 text-blue-800 dark:text-blue-200 dark:shadow-[0_0_10px_rgba(59,130,246,0.3)]">{"<company>"}</span> promoting their <span className="inline-block px-1.5 py-0.5 rounded text-xs font-medium bg-purple-100 dark:bg-purple-800/70 text-purple-800 dark:text-purple-200 dark:shadow-[0_0_10px_rgba(168,85,247,0.3)]">{"<product>"}</span> to <span className="inline-block px-1.5 py-0.5 rounded text-xs font-medium bg-amber-100 dark:bg-amber-800/70 text-amber-800 dark:text-amber-200 dark:shadow-[0_0_10px_rgba(245,158,11,0.3)]">{"<audience>"}</span>
                  </div>
                  <div className="mb-4 text-sm font-medium">Values:</div>
                  <div className="space-y-2 mb-6">
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
                  <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/50 text-sm">
                    Write a compelling ad for Acme Inc promoting their Smart Home Hub to tech enthusiasts.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="px-4 py-20 bg-white dark:bg-background"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create and manage your AI prompts efficiently
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white dark:bg-background rounded-xl p-6 shadow-lg border border-border/50 transition-all duration-500 ${
                  activeFeature === index 
                    ? 'scale-105 border-primary/20 shadow-xl' 
                    : 'hover:shadow-xl hover:scale-[1.02]'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section 
        ref={workflowRef}
        className="px-4 py-20 bg-white dark:bg-background"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible.workflow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Prompt Shaper simplifies the process of creating consistent AI prompts
            </p>
          </div>
          
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>
            
            {/* Step 1: Create placeholders */}
            <div className="flex flex-col md:flex-row items-center mb-16 md:mb-24">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Create placeholders</h3>
                <p className="text-muted-foreground text-lg">
                  Define reusable variables like customer names, product features, or timelines.
                </p>
              </div>
              
              <div className="relative flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-white dark:bg-background shadow-lg border border-blue-100 dark:border-blue-900/50 flex items-center justify-center z-10 relative">
                  <Layers className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
                <div className="bg-white dark:bg-background p-6 rounded-lg shadow-md border border-blue-100 dark:border-blue-900/50">
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-800/70 text-indigo-800 dark:text-indigo-200 dark:shadow-[0_0_10px_rgba(99,102,241,0.3)]">{"<company>"}</div>
                    <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-800/70 text-purple-800 dark:text-purple-200 dark:shadow-[0_0_10px_rgba(168,85,247,0.3)]">{"<product>"}</div>
                    <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-800/70 text-orange-800 dark:text-orange-200 dark:shadow-[0_0_10px_rgba(249,115,22,0.3)]">{"<audience>"}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 2: Build templates */}
            <div className="flex flex-col md:flex-row items-center mb-16 md:mb-24">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0 md:order-1 order-2">
                <div className="bg-white dark:bg-background p-6 rounded-lg shadow-md border border-blue-100 dark:border-blue-900/50">
                  <p className="text-base">
                    Write a compelling ad for <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 dark:bg-indigo-800/70 text-indigo-800 dark:text-indigo-200 dark:shadow-[0_0_10px_rgba(99,102,241,0.3)]">{"<company>"}</span> promoting their <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-purple-100 dark:bg-purple-800/70 text-purple-800 dark:text-purple-200 dark:shadow-[0_0_10px_rgba(168,85,247,0.3)]">{"<product>"}</span> to <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-orange-100 dark:bg-orange-800/70 text-orange-800 dark:text-orange-200 dark:shadow-[0_0_10px_rgba(249,115,22,0.3)]">{"<audience>"}</span>
                  </p>
                </div>
              </div>
              
              <div className="relative flex-shrink-0 order-1 md:order-2">
                <div className="h-16 w-16 rounded-full bg-white dark:bg-background shadow-lg border border-blue-100 dark:border-blue-900/50 flex items-center justify-center z-10 relative">
                  <FileCode className="h-8 w-8 text-purple-500" />
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0 order-3">
                <h3 className="text-2xl font-bold mb-2">Build templates</h3>
                <p className="text-muted-foreground text-lg">
                  Create prompt templates that incorporate your custom placeholders.
                </p>
              </div>
            </div>
            
            {/* Step 3: Fill in values */}
            <div className="flex flex-col md:flex-row items-center mb-16 md:mb-24">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Fill in values</h3>
                <p className="text-muted-foreground text-lg">
                  Replace placeholders with actual values for each specific use case.
                </p>
              </div>
              
              <div className="relative flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-white dark:bg-background shadow-lg border border-blue-100 dark:border-blue-900/50 flex items-center justify-center z-10 relative">
                  <Wand2 className="h-8 w-8 text-amber-500" />
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
                <div className="bg-white dark:bg-background p-6 rounded-lg shadow-md border border-blue-100 dark:border-blue-900/50">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-24 text-sm text-right text-muted-foreground mr-4">company:</div>
                      <div className="text-base font-medium">Acme Inc</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 text-sm text-right text-muted-foreground mr-4">product:</div>
                      <div className="text-base font-medium">Smart Home Hub</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 text-sm text-right text-muted-foreground mr-4">audience:</div>
                      <div className="text-base font-medium">tech enthusiasts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 4: Generate content */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0 md:order-1 order-2">
                <div className="bg-white dark:bg-background p-6 rounded-lg shadow-md border border-blue-100 dark:border-blue-900/50">
                  <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded border border-green-100 dark:border-green-900/50 text-base">
                    Write a compelling ad for Acme Inc promoting their Smart Home Hub to tech enthusiasts.
                  </div>
                </div>
              </div>
              
              <div className="relative flex-shrink-0 order-1 md:order-2">
                <div className="h-16 w-16 rounded-full bg-white dark:bg-background shadow-lg border border-blue-100 dark:border-blue-900/50 flex items-center justify-center z-10 relative">
                  <Bot className="h-8 w-8 text-green-500" />
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0 order-3">
                <h3 className="text-2xl font-bold mb-2">Generate content</h3>
                <p className="text-muted-foreground text-lg">
                  Use your completed prompt to generate perfect AI content every time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef}
        className="px-4 py-20 bg-white dark:bg-background"
      >
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Users Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who are already improving their AI prompts
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-background rounded-xl p-6 shadow-lg border border-border/50 transition-all duration-300 hover:shadow-xl"
              >
                <div className="mb-4 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="inline-block h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="italic mb-4 text-muted-foreground">"{testimonial.quote}"</p>
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
      <section 
        ref={ctaRef}
        className="px-4 py-20"
      >
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-primary/90 to-primary rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to improve your AI prompts?
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Start creating consistent, reusable prompts that save time and improve results.
            </p>
            <Link to="/app">
              <Button size="lg" variant="secondary" className="text-primary dark:text-primary-foreground">
                Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background px-4 py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex justify-center items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold">P</span>
            </div>
            <span className="font-medium">Prompt Shaper</span>
          </div>
          
          <div className="text-sm text-muted-foreground ml-4">
            © {new Date().getFullYear()} Prompt Shaper
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 