import {cn} from '@/lib/utils';

/**
 * Skeleton component displays a placeholder loading state
 *
 * @param {Object} root0 - Component props
 * @param {string} root0.className - Optional CSS class name to apply to the skeleton
 * @returns {JSX.Element} JSX element of the skeleton placeholder
 */
function Skeleton({className, ...props}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
}

export {Skeleton};
