import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { CardImage } from './CardImage';
import type { Card } from '../types';

interface SortableCardProps {
  card: Card;
  onCardClick: (type: string) => void;
}

export const SortableCard: React.FC<SortableCardProps> = ({ card, onCardClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.type });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent click when dragging
    if (isDragging) return;
    onCardClick(card.type);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-white rounded-lg shadow-md overflow-hidden transform transition-transform ${
        isDragging ? 'scale-105 shadow-lg' : ''
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 z-10 p-1 rounded-md bg-white/80 backdrop-blur-sm shadow-sm cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="w-5 h-5 text-gray-500" />
      </div>
      
      <div
        onClick={handleClick}
        className="cursor-pointer"
      >
        <CardImage
          type={card.type}
          isLoading={isDragging}
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {card.title}
          </h2>
        </div>
      </div>
    </div>
  );
};