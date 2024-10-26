import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Loader2, Check } from 'lucide-react';
import type { SaveStatus } from '../types';

interface SaveIndicatorProps {
  status: SaveStatus;
}

export const SaveIndicator: React.FC<SaveIndicatorProps> = ({ status }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg px-4 py-2 flex items-center space-x-2">
      {status.saving ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
          <span className="text-sm text-gray-600">Saving changes...</span>
        </>
      ) : status.lastSaved ? (
        <>
          <Check className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-600">
            Saved {formatDistanceToNow(status.lastSaved)} ago
          </span>
        </>
      ) : null}
    </div>
  );
};