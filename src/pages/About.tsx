
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowRight, Sparkles, Wand2, FileCode, 
  Layers, Palette, RotateCw, Check 
} from "lucide-react";

const About = () => {
  const [activeExample, setActiveExample] = useState(0);

  // Rotate through examples automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExample((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const examples = [
    {
      title: "Create Placeholders",
      description: "Define reusable placeholders for your prompts with custom colors and categories.",
      animation: (
        <div className="relative h-32 w-full overflow-hidden rounded-md border bg-white/50 p-2">
          <div className="animate-slide-in absolute inset-0 flex items-center justify-center" 
               style={{ opacity: activeExample === 0 ? 1 : 0, transition: "opacity 0.5s" }}>
            <div className="flex gap-2">
              <div className="chip chip-primary">{"<customer_name>"}</div>
              <div className="chip chip-secondary">{"<product_feature>"}</div>
              <div className="chip" style={{ backgroundColor: "#f97316", color: "white" }}>{"<timeline>"}</div>
            </div>
          </div>
        </div>
      ),
      icon: <Palette className="text-blue-500" />
    },
    {
      title: "Build Templates",
      description: "Create prompt templates with your placeholders for consistent AI interactions.",
      animation: (
        <div className="relative h-32 w-full overflow-hidden rounded-md border bg-white/50 p-2">
          <div className="animate-slide-in absolute inset-0 flex items-center justify-center"
               style={{ opacity: activeExample === 1 ? 1 : 0, transition: "opacity 0.5s" }}>
            <div className="max-w-xs text-sm text-gray-700">
              <p>Design a landing page for <span className="chip chip-primary text-xs px-1">{"<customer_name>"}</span> that highlights 
              <span className="chip chip-secondary text-xs px-1">{"<product_feature>"}</span> and delivers within 
              <span className="chip text-xs px-1" style={{ backgroundColor: "#f97316", color: "white" }}>{"<timeline>"}</span>.</p>
            </div>
          </div>
        </div>
      ),
      icon: <FileCode className="text-purple-500" />
    },
    {
      title: "Generate Content",
      description: "Fill in your prompts with real values and generate perfect AI content every time.",
      animation: (
        <div className="relative h-32 w-full overflow-hidden rounded-md border bg-white/50 p-2">
          <div className="animate-slide-in absolute inset-0 flex items-center justify-center"
               style={{ opacity: activeExample === 2 ? 1 : 0, transition: "opacity 0.5s" }}>
            <div className="max-w-xs text-sm flex flex-col items-center gap-2">
              <div className="flex items-center gap-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>Placeholders replaced</span>
              </div>
              <div className="flex items-center gap-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>Content generated</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Perfect results every time</span>
              </div>
            </div>
          </div>
        </div>
      ),
      icon: <Wand2 className="text-amber-500" />
    }
  ];

  return (
    <div className="min-h-screen overflow-auto">
      {/* Hero Section with Gradient */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 opacity-70"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgc3Ryb2tlPSIjOUI4N0Y1IiBzdHJva2Utb3BhY2l0eT0iLjA1IiBjeD0iMTAwIiBjeT0iMTAwIiByPSI5OSIvPjwvZz48L3N2Zz4=')] bg-center opacity-50"></div>
        
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-block rounded-full bg-accent/30 px-4 py-2 text-sm font-medium text-accent-foreground">
            Prompt Generator
          </div>
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Create perfect AI prompts <span className="text-primary">without repetition</span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Our prompt generator helps you create, manage, and reuse placeholders for
            consistent AI interactions across your team or projects.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/">
              <Button size="lg" className="gap-2 text-base">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="gap-2 text-base">
                View Examples
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Our prompt generator simplifies the process of creating consistent AI prompts
              with reusable placeholders and templates.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {examples.map((example, index) => (
              <Card key={index} className="overflow-hidden border-none bg-gradient-to-br from-white to-gray-50 shadow-md transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                    {example.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{example.title}</h3>
                  <p className="mb-4 text-muted-foreground">{example.description}</p>
                  {example.animation}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Features */}
      <section className="relative px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-70"></div>
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Key Features
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Everything you need to create and manage your AI prompts efficiently
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="glass-panel p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Layers className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Placeholder Library</h3>
              <p className="text-muted-foreground">
                Create and manage a library of reusable placeholders with custom colors and categories
              </p>
            </div>

            <div className="glass-panel p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <FileCode className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Template Management</h3>
              <p className="text-muted-foreground">
                Build and save prompt templates that use your custom placeholders
              </p>
            </div>

            <div className="glass-panel p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <Wand2 className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Live Preview</h3>
              <p className="text-muted-foreground">
                See your prompt in real-time as you build and edit it
              </p>
            </div>

            <div className="glass-panel p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <RotateCw className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Version History</h3>
              <p className="text-muted-foreground">
                Track changes to your prompts and revert when needed
              </p>
            </div>

            <div className="glass-panel p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <Palette className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Custom Styling</h3>
              <p className="text-muted-foreground">
                Color-code your placeholders for better visual organization
              </p>
            </div>

            <div className="glass-panel p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                <Sparkles className="h-5 w-5 text-teal-600" />
              </div>
              <h3 className="mb-2 text-lg font-medium">AI Integration</h3>
              <p className="text-muted-foreground">
                Connect directly to AI services to test your prompts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-primary/90 to-primary p-8 text-center text-white md:p-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to improve your AI prompts?
          </h2>
          <p className="mb-8 text-primary-foreground/90">
            Start creating consistent, reusable prompts that save time and improve results.
          </p>
          <Link to="/">
            <Button size="lg" variant="secondary" className="gap-2 text-primary">
              Get Started Today <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
