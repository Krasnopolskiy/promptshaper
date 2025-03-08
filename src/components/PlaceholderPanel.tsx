import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceholderForm } from './PlaceholderForm';
import { PlaceholderCard } from './PlaceholderCard';
import { Placeholder } from '@/types';

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
  onPlaceholderNameChange
}: PlaceholderPanelProps) {
  const [activeTab, setActiveTab] = useState('add');

  // Sort placeholders by creation date (newest first)
  const sortedPlaceholders = [...placeholders].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <aside className="w-full md:w-80 border-r border-border h-full flex flex-col bg-background/90">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-medium">Placeholders</h2>
        <p className="text-sm text-muted-foreground">
          Create and manage your prompt placeholders
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 mx-4 mt-2">
          <TabsTrigger value="add">Add New</TabsTrigger>
          <TabsTrigger value="view">View All</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="flex-1 p-4">
          <PlaceholderForm onSubmit={onAddPlaceholder} />
        </TabsContent>
        
        <TabsContent value="view" className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            {placeholders.length > 0 ? (
              <div className="grid gap-3">
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
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                <p>No placeholders added yet.</p>
                <p className="text-sm mt-1">Click on "Add New" to create your first placeholder.</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </aside>
  );
}
