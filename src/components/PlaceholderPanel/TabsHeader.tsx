import {TabsList, TabsTrigger} from '@/components/ui/tabs';
import {ListPlus, PlusCircle} from 'lucide-react';

/**
 * Renders the tabs header with tab triggers
 * @returns {JSX.Element} The tabs header component
 */
export function TabsHeader(): JSX.Element {
  return (
    <div className="px-2 pt-2">
      <TabsList className="grid w-full grid-cols-2">
        <AddTabTrigger />
        <ManageTabTrigger />
      </TabsList>
    </div>
  );
}

/**
 * Renders the Add tab trigger
 * @returns {JSX.Element} The Add tab trigger
 */
function AddTabTrigger(): JSX.Element {
  return (
    <TabsTrigger value="add" className="flex items-center gap-1">
      <PlusCircle className="h-3.5 w-3.5"/>
      <span>Add New</span>
    </TabsTrigger>
  );
}

/**
 * Renders the Manage tab trigger
 * @returns {JSX.Element} The Manage tab trigger
 */
function ManageTabTrigger(): JSX.Element {
  return (
    <TabsTrigger value="manage" className="flex items-center gap-1">
      <ListPlus className="h-3.5 w-3.5"/>
      <span>Manage</span>
    </TabsTrigger>
  );
}
