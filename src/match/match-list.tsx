import { useState, useRef, useEffect } from 'react';
import type { Dog } from '../types/interfaces';

interface MatchListProps {
  favoriteDogs: Dog[];
  onRemove: (dogId: string) => void;
}

const MatchList = ({ favoriteDogs, onRemove }: MatchListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#e1e7e1] text-black px-4 py-2 rounded-4xl flex hover:bg-yellow-500 items-center gap-2 text-sm"
      >
        Match List ({favoriteDogs.length})
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          <div className="max-h-48 overflow-y-auto">
            {favoriteDogs.length === 0 ? (
              <div className="p-3 text-gray-500 text-center">
                No dogs in match list
              </div>
            ) : (
              <div className="divide-y">
                {favoriteDogs.map((dog) => (
                  <div key={dog.id} className="p-3 hover:bg-gray-50 flex justify-between items-center">
                    <div>
                      <div className="font-medium">{dog.name}</div>
                      <div className="text-sm text-gray-600">{dog.breed}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(dog.id);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded-md hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchList;