
import {useState} from 'react';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {PlaceholderForm} from './PlaceholderForm';
import {PlaceholderCard} from './PlaceholderCard';
import {Placeholder} from '@/types';
import {ListPlus, PlusCircle, Sparkles} from 'lucide-react';

interface PlaceholderPanelProps {
  placeholders: Placeholder[];
  onAddPlaceholder: (name: string, content: string, color: string) => void;
  onUpdatePlaceholder: (id: string, updates: Partial<Placeholder>) => void;
  onDeletePlaceholder: (id: string) => void;
  onInsertPlaceholder?: (name: string) => void;
  onPlaceholderNameChange?: (oldName: string, newName: string) => void;
}

export function PlaceholderPanel({
                                   placeholders,
                                   onAddPlaceholder,
                                   onUpdatePlaceholder,
                                   onDeletePlaceholder,
                                   onInsertPlaceholder,
                                   onPlaceholderNameChange,
                                 }: PlaceholderPanelProps) {
  const [activeTab, setActiveTab] = useState('add');

  // Sort placeholders by creation date (newest first)
  const sortedPlaceholders = [...placeholders].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <aside className="flex h-full w-full flex-col bg-background">
      <div className="border-b border-border/50 bg-background p-4">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Sparkles className="h-4 w-4" />
          <h2 className="text-lg font-medium">Placeholders</h2>
        </div>
        <p className="text-sm text-muted-foreground">Create and manage your prompt placeholders</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col">
        <div className="px-2 pt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add" className="flex items-center gap-1">
              <PlusCircle className="h-3.5 w-3.5"/>
              <span>Add New</span>
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-1">
              <ListPlus className="h-3.5 w-3.5"/>
              <span>Manage</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="add" className="flex-1 p-4">
          <PlaceholderForm onSubmit={onAddPlaceholder}/>
        </TabsContent>

        <TabsContent value="manage" className="mt-0 flex flex-1 flex-col">
          <div className="border-b border-border/50 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">All Placeholders</h3>
              <span className="rounded-full bg-accent/30 px-2 py-0.5 text-xs text-muted-foreground">
                {placeholders.length} total
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="space-y-3 p-4">
                {sortedPlaceholders.map(placeholder => (
                  <PlaceholderCard
                    key={placeholder.id}
                    placeholder={placeholder}
                    onUpdate={onUpdatePlaceholder}
                    onDelete={onDeletePlaceholder}
                    onInsert={onInsertPlaceholder}
                    onNameChange={onPlaceholderNameChange}
                  />
                ))}
                {sortedPlaceholders.length === 0 && (
                  <div className="px-4 py-8 text-center">
                    <div
                      className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <PlusCircle className="h-6 w-6 text-primary"/>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No placeholders yet. Create your first one in the "Add New" tab.
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
}
