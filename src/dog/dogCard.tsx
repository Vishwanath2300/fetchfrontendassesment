import type { Dog } from '../types/interfaces';

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
  addFavoriteDog:(dog:Dog)=>void;
  favoriteDog: Dog[];
}



// DogCard component
// This component is used to display the dog card

const DogCard = ({ dog, isFavorite, toggleFavorite,addFavoriteDog}: DogCardProps) => {
  
  return (
    <div className="p-10 flex flex-col items-center w-full max-w-xs">
      <img src={dog.img} alt={dog.name} className="w-40 h-40 object-cover mb-4 rounded-2xl" />
      <h2 className="text-[18px] font-bold">{dog.name}</h2>
     <div className="w-full text-center">
        <p className="text-gray-600 text-[13px]" title={`Breed: ${dog.breed}`}>
          Breed: {dog.breed}
        </p>
        <p className="text-gray-600 text-[13px]">Age: {dog.age}</p>
        <p className="text-gray-600 text-[13px]">ZIP: {dog.zip_code}</p>
      </div>
      <button
        className={`mt-2 px-4 py-2 rounded-4xl shadow-lg hover:bg-yellow-500 text-black  w-50 h-10 text-sm ${
          isFavorite ? 'bg-yellow-500 text-[13px]' : 'bg-[#e1e7e1]'
        }`}
        onClick={() => {
  toggleFavorite(dog.id);
  addFavoriteDog(dog);
  }}
      >
        {isFavorite ? 'Remove from Match List' : 'Add to Match List'}
      </button>
    </div>
  );
};

export default DogCard;