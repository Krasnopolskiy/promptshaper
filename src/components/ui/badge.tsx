import * as React from 'react';
import {cn} from '@/lib/utils';
import {type BadgeProps, badgeVariants} from './badge-utils';

/**
 * Badge component displays a small tag-like element
 *
 * @param {Object} root0 - Component props
 * @param {string} root0.className - Optional CSS class name to apply to the badge
 * @param {string} root0.variant - Variant style of the badge
 * @returns {JSX.Element} JSX element of the badge
 */
function Badge({className, variant, ...props}: BadgeProps): JSX.Element {
  return <div className={cn(badgeVariants({variant}), className)} {...props} />;
}

export {Badge};
