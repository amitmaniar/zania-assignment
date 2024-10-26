import React, { useState, useEffect, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { Loader2, AlertCircle } from 'lucide-react';
import { SortableCard } from './components/SortableCard';
import { ImageModal } from './components/ImageModal';
import { SaveIndicator } from './components/SaveIndicator';
import type { Card, SaveStatus } from './types';

const API_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({
    saving: false,
    lastSaved: null,
    hasChanges: false,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + 'records');
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        const formattedData = data.map((item: any, index: number) => ({
          id: item.id,
          type: item.type || `item-${index}`,
          title: item.title || `Item ${index + 1}`,
          position: index,
        }));

        setCards(formattedData);
        setError(null);
      } catch (err) {
        setError('Failed to load cards. Please try again later.' + err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const saveChanges = useCallback(async () => {

    if (!saveStatus.hasChanges) return;

    setSaveStatus(prev => ({ ...prev, saving: true }));

    await fetch(API_URL + "records/batch", {
      method: "POST",
      body: JSON.stringify(cards),
    });

    setSaveStatus({
      saving: false,
      lastSaved: new Date(),
      hasChanges: false,
    });
  }, [saveStatus.hasChanges]);

  useEffect(() => {
    const interval = setInterval(saveChanges, 5000);
    return () => clearInterval(interval);
  }, [saveChanges]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setCards((items) => {
      const oldIndex = items.findIndex((item) => item.type === active.id);
      const newIndex = items.findIndex((item) => item.type === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex).map((card, index) => ({
        ...card,
        position: index,
      }));

      setSaveStatus(prev => ({ ...prev, hasChanges: true }));
      return newItems;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading cards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Document Gallery</h1>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={cards.map(card => card.type)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map((card) => (
                <SortableCard
                  key={card.type}
                  card={card}
                  onCardClick={setSelectedCard}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {selectedCard && (
          <ImageModal
            type={selectedCard}
            onClose={() => setSelectedCard(null)}
          />
        )}

        <SaveIndicator status={saveStatus} />
      </div>
    </div>
  );
}

export default App;