import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceholderForm } from './PlaceholderForm';
import { PlaceholderCard } from './PlaceholderCard';
import { Placeholder, PlaceholderCategory } from '@/types';

interface PlaceholderPanelProps {
  placeholders: Placeholder[];
  onAddPlaceholder: (name: string, content: string, category: PlaceholderCategory) => void;
  onUpdatePlaceholder: (id: string, updates: Partial<Placeholder>) => void;
  onDeletePlaceholder: (id: string) => void;
  onInsertPlaceholder?: (name: string) => void;
}

export function PlaceholderPanel({
  placeholders,
  onAddPlaceholder,
  onUpdatePlaceholder,
  onDeletePlaceholder,
  onInsertPlaceholder
}: PlaceholderPanelProps) {
  const [activeTab, setActiveTab] = useState('add');

  const categoryMap: Record<PlaceholderCategory, string> = {
    style: 'Style',
    tone: 'Tone',
    format: 'Format',
    terminology: 'Terminology',
    other: 'Other'
  };

  const placeholdersByCategory = placeholders.reduce((acc, placeholder) => {
    if (!acc[placeholder.category]) {
      acc[placeholder.category] = [];
    }
    acc[placeholder.category].push(placeholder);
    return acc;
  }, {} as Record<PlaceholderCategory, Placeholder[]>);

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
              <div className="space-y-6">
                {Object.entries(placeholdersByCategory).map(([category, items]) => (
                  items.length > 0 && (
                    <div key={category} className="space-y-3">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {categoryMap[category as PlaceholderCategory]}
                      </h3>
                      <div className="grid gap-3">
                        {items.map(placeholder => (
                          <PlaceholderCard
                            key={placeholder.id}
                            placeholder={placeholder}
                            onUpdate={onUpdatePlaceholder}
                            onDelete={onDeletePlaceholder}
                            onInsert={onInsertPlaceholder}
                          />
                        ))}
                      </div>
                    </div>
                  )
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
