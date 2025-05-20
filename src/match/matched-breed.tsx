import type { Dog } from '../types/interfaces';

interface MatchModalProps {
  dog: Dog | null;
  isOpen: boolean;
  onClose: () => void;
}

const MatchedBreed = ({ dog, isOpen, onClose }: MatchModalProps) => {
  if (!isOpen || !dog) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform transition-all animate-fade-in">
        <div className="text-center">
          <div className="mb-4">
            <img
              src={dog.img}
              alt={dog.name}
              className="w-48 h-48 object-cover rounded-full mx-auto border-4 border-orange-500"
            />
          </div>
          <h2 className="text-2xl font-bold text-orange-600 mb-2">
            Congratulations! 🎉
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            You've been matched with {dog.name}
          </p>
          <div className="bg-orange-50 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-orange-800 mb-2">Dog Details:</h3>
            <p className="text-gray-700">Breed: {dog.breed}</p>
            <p className="text-gray-700">Age: {dog.age} years old</p>
            <p className="text-gray-700">Zip_code: {dog.zip_code}</p>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchedBreed;