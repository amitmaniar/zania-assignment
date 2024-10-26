import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  type: string;
  onClose: () => void;
}

const IMAGE_LIST: Record<string, string> = {
  'bank-draft': '7',
  'bill-of-lading': '13',
  'invoice': '29',
  'bank-draft-2': '34',
  'bill-of-lading-2': '36'
}

export const ImageModal: React.FC<ImageModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative max-w-4xl w-full mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300"
        >
          <X className="w-8 h-8" />
        </button>
        <img
          src={`https://picsum.photos/id/${IMAGE_LIST[type]}/400/300`}
          alt={type}
          className="w-full rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
};