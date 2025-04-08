import {useState} from 'react';
import {Placeholder} from '@/types';
import {PanelHeader} from './PanelHeader';
import {PanelTabs} from './PanelTabs';

/**
 * Props for the placeholder panel component
 */
export interface PlaceholderPanelProps {
  placeholders: Placeholder[];
  onAddPlaceholder: (name: string, content: string, color: string) => void;
  onUpdatePlaceholder: (id: string, updates: Partial<Placeholder>) => void;
  onDeletePlaceholder: (id: string) => void;
  onInsertPlaceholder?: (name: string) => void;
  onPlaceholderNameChange?: (oldName: string, newName: string) => void;
}

/**
 * Component to manage placeholders with add and manage tabs
 * @param {PlaceholderPanelProps} props - Component properties
 * @returns {JSX.Element} The placeholder panel component
 */
export function PlaceholderPanel(props: PlaceholderPanelProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('add');
  return <PanelLayout state={{activeTab, setActiveTab}} {...props} />;
}

/**
 * Props for the panel layout component
 */
interface PanelLayoutProps extends PlaceholderPanelProps {
  state: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
  };
}

/**
 * Renders the panel layout
 * @param {PanelLayoutProps} props - Component props
 * @returns {JSX.Element} The panel layout
 */
function PanelLayout(props: PanelLayoutProps): JSX.Element {
  const {state, ...panelProps} = props;
  return (
    <aside className="flex h-full w-full flex-col bg-background">
      <PanelHeader />
      <PanelTabs activeTab={state.activeTab} setActiveTab={state.setActiveTab} {...panelProps} />
    </aside>
  );
}
