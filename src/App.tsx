import {Toaster} from '@/components/ui/toaster';
import {Toaster as Sonner} from '@/components/ui/sonner';
import {TooltipProvider} from '@/components/ui/tooltip';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Index from './pages/Index';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import {ThemeProvider} from '@/hooks';

const queryClient = new QueryClient();

/**
 * Application routes component
 * @returns Routes for the application
 */
const AppRoutes = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/app" element={<Index/>}/>
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
);

/**
 * Application providers component
 * @returns The providers setup for the application
 */
const AppProviders = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster/>
      <Sonner/>
      <AppRoutes />
    </TooltipProvider>
  </QueryClientProvider>
);

/**
 * Main application component
 * @description Sets up providers and routing for the application
 * @returns The main application component with all providers and routes
 */
const App = (): JSX.Element => (
  <ThemeProvider>
    <AppProviders />
  </ThemeProvider>
);

export default App;
