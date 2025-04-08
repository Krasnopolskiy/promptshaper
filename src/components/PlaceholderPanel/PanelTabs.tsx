import {Tabs, TabsContent} from '@/components/ui/tabs';
import {TabsHeader} from './TabsHeader';
import {ManageTabContent} from './ManageTab';
import {PlaceholderForm} from '../PlaceholderForm';
import {PlaceholderPanelProps} from './index';

/**
 * Props for the panel tabs component
 */
export interface PanelTabsProps extends PlaceholderPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

/**
 * Renders the tabs section of the panel
 * @param {PanelTabsProps} props - Component properties
 * @returns {JSX.Element} The tabs component
 */
export function PanelTabs(props: PanelTabsProps): JSX.Element {
  const {activeTab, setActiveTab} = props;
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col">
      <TabsHeader />
      <TabContents {...props} />
    </Tabs>
  );
}

/**
 * Renders the tab contents
 * @param {PanelTabsProps} props - Component properties
 * @returns {JSX.Element} The tab contents
 */
function TabContents(props: PanelTabsProps): JSX.Element {
  return (
    <>
      <AddTab onSubmit={props.onAddPlaceholder} />
      <ManageTab {...props} />
    </>
  );
}

/**
 * Props for the add tab component
 */
interface AddTabProps {
  onSubmit: (name: string, content: string, color: string) => void;
}

/**
 * Renders the add tab
 * @param {AddTabProps} props - Component properties
 * @returns {JSX.Element} The add tab
 */
function AddTab({onSubmit}: AddTabProps): JSX.Element {
  return (
    <TabsContent value="add" className="flex-1 p-4">
      <PlaceholderForm onSubmit={onSubmit} />
    </TabsContent>
  );
}

/**
 * Renders the manage tab
 * @param {PanelTabsProps} props - Component properties
 * @returns {JSX.Element} The manage tab
 */
function ManageTab(props: PanelTabsProps): JSX.Element {
  return (
    <TabsContent value="manage" className="mt-0 flex flex-1 flex-col">
      <ManageTabContent {...props} />
    </TabsContent>
  );
}
