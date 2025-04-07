/**
 * NotFoundContent component with the actual 404 page content
 *
 * @returns {JSX.Element} 404 page content
 */
const NotFoundContent = (): JSX.Element => (
  <div className="text-center">
    <h1 className="mb-4 text-4xl font-bold">404</h1>
    <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
    <a href="/" className="text-primary underline hover:text-primary/80">
      Return to Home
    </a>
  </div>
);

/**
 * NotFound page displayed when a route doesn't match any valid routes
 *
 * @returns {JSX.Element} 404 page component
 */
const NotFound = (): JSX.Element => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <NotFoundContent />
  </div>
);

export default NotFound;
