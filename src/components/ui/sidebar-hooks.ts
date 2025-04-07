import {useContext} from 'react';
import {SidebarContext, SidebarContextType} from './sidebar-utils';

/**
 * Hook to access sidebar context
 *
 * @returns Sidebar context with state and control functions
 */
export function useSidebar(): SidebarContextType {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
}
