import React from 'react';
import { Loader2 } from 'lucide-react';

interface CardImageProps {
  type: string;
  isLoading: boolean;
}

const IMAGE_LIST: Record<string, string> = {
  'bank-draft': '7',
  'bill-of-lading': '13',
  'invoice': '29',
  'bank-draft-2': '34',
  'bill-of-lading-2': '36'
}

export const CardImage: React.FC<CardImageProps> = ({ type, isLoading }) => {
  const [loaded, setLoaded] = React.useState(false);
  const imageUrl = `https://picsum.photos/id/${IMAGE_LIST[type]}/400/300`;

  return (
    <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
      {(isLoading || !loaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      )}
      <img
        src={imageUrl}
        alt={type}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};