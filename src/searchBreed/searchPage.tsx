import { useEffect, useState } from 'react';
import axios from 'axios';
import DogCard from '../dog/dogCard';
import BreedFilter from '../filter/breed-filter';
import MatchList from '../match/match-list';
import { useNavigate } from 'react-router-dom';
import DogPagination from '../dog/dog-pagination';
import MatchedBreed from '../match/matched-breed';
import FilterIcon from '../filter/filter-icon';
import type { LocationSearchParams, LocationSearchResponse } from '../types/interfaces';
import type { Location } from '../types/interfaces';
import type { Dog } from '../types/interfaces';
import type { SearchResponse } from '../types/interfaces';
import type { MatchResponse } from '../types/interfaces';




const SearchPage = () => {
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favoriteDogIds, setFavoriteDogIds] = useState<string[]>([]);
  const[favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const size = 20;

  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedZipCodes, setSelectedZipCodes] = useState<string[]>([]);
  const [cityFilter, setCityFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [locationPage, setLocationPage] = useState(0);
  const [totalLocations, setTotalLocations] = useState(0);
  const locationSize = 25;
  const [locationDetails, setLocationDetails] = useState<Location[]>([]);
  const [sortType, setSortType] = useState<'name'|'breed'|'age'>('name');
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [matchedDog, setMatchedDog] = useState<Dog|null>(null); 
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// Function to search for locations based on filters
  const searchLocations = async () => {
    try {
      const params: LocationSearchParams = {
        size: locationSize,
        from: locationPage * locationSize
      };

      if (cityFilter) params.city = cityFilter;
      if (stateFilter) params.states = [stateFilter];

      const response = await axios.post<LocationSearchResponse>(
        'https://frontend-take-home-service.fetch.com/locations/search',
        params,
        { withCredentials: true }
      );
      console.log('Location search response:', response.data);

      setLocations(response.data.results);
      setTotalLocations(response.data.total);
    } catch (error) {
      console.error('Error searching locations:', error);
      setLocations([]);
      setTotalLocations(0);
    }
  };

  // Fetching location details based on selected zip codes
const fetchLocations = async (zipCodes: string[]) => {
    try {
      const response = await axios.post<Location[]>(
        'https://frontend-take-home-service.fetch.com/locations',
        zipCodes,
        { withCredentials: true }
      );
      console.log('Location details response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching locations:', error);
      return [];
    }
  };

  // Fetching location details when selected zip codes change
const getLocationDetails = async () => {
        const details = await fetchLocations(selectedZipCodes);
        setLocationDetails(details);
      };

  // Fetching location details when selected zip codes change
  useEffect(() => {
    if (selectedZipCodes.length > 0) {
      
      getLocationDetails();
    } else {
      setLocationDetails([]);
    }
  }, [selectedZipCodes]);

  // Fetching ALL breeds from the API
  const fetchBreeds = async () => {
    try {
      const res = await axios.get<string[]>(
        'https://frontend-take-home-service.fetch.com/dogs/breeds',
        { withCredentials: true }
      );
      console.log('Breeds response:', res.data);
      setBreeds(res.data);
    } catch (error) {
      console.error('Error fetching breeds:', error);
      navigate('/login');
    }
  };

  // Fetching dog IDs based on filters
  const fetchDogIds = async () => {
    try {
      const searchRes = await axios.get<SearchResponse>(
        `https://frontend-take-home-service.fetch.com/dogs/search`,
        {
          params: {
            breeds: selectedBreed ? [selectedBreed] : undefined,
            zipCodes: selectedZipCodes.length > 0 ? selectedZipCodes : undefined,
            size,
            from: page * size,
            sort: `${sortType}:${sortOrder}`
          },
          withCredentials: true
        }
      );
      console.log('Dog search response:', searchRes.data);

      // Fetching dog details based on IDs
      if (searchRes.data.resultIds.length > 0) {
        const dogRes = await axios.post<Dog[]>(
          'https://frontend-take-home-service.fetch.com/dogs',
          searchRes.data.resultIds,
          { withCredentials: true }
        );
        setDogs(dogRes.data);
        setTotal(searchRes.data.total);
      } else {
        setDogs([]);
        setTotal(0);
      }
    } catch (error) {
      console.error('Error fetching dogs:', error);
      setDogs([]);
      navigate('/login');
    }
  };

  // FetchinG breeds on component mount
  useEffect(() => {
    fetchBreeds();
  }, []);


// useEffect for location search
  useEffect(() => {
    if (cityFilter || stateFilter) {
      searchLocations();
    }
  }, [cityFilter, stateFilter, locationPage]);

  useEffect(() => {
    fetchDogIds();
  }, [selectedBreed, page]);

  const applyfilter = () => {
    fetchDogIds();
  }

  // Function to toggle favorite status of a dog
  const toggleFavorite = (id: string) => {
    setFavoriteDogIds(prev=>{
      if(prev.includes(id)){
        return prev.filter((dogId)=>dogId!==id)
      }
      else{

        return [...prev,id];
      }
      
    }
    );
  }
 
  // Function to handle dog matching
  const matchDog = async () => {
    try {
      const res = await axios.post<MatchResponse>(
        'https://frontend-take-home-service.fetch.com/dogs/match',
        favoriteDogIds,
        { withCredentials: true }
      );
      
      // Fetch the matched dog details
      const matchedDogRes = await axios.post<Dog[]>(
        'https://frontend-take-home-service.fetch.com/dogs',
        [res.data.match],
        { withCredentials: true }
      );
      
      setMatchedDog(matchedDogRes.data[0]);
      setIsMatchModalOpen(true);
      console.log('Matched dog:', matchedDogRes.data[0]);
      
      // alert(`You've been matched with ${matchedDog.name}, a ${matchedDog.breed}!`);
    } catch (error) {
      console.error('Error matching dog:', error);
      alert('Failed to find a match. Please try again.');
      navigate('/login');
    }
  };

  // Function to add or remove a dog from favorites
  const addfavoriteDog=(dog:Dog)=>{
    const isDogList=favoriteDogs.map((dogEntry:Dog)=>dogEntry.id).includes(dog.id);
    if(isDogList){
      setFavoriteDogs(favoriteDogs.filter((dogEntry:Dog)=>dogEntry.id!==dog.id));
      // toggleFavorite(dog.id);
    }else{
      setFavoriteDogs([...favoriteDogs,dog]);
    }

  }

  const maxPages = Math.ceil(total / size);
  
  return(
    <div className='min-h-screen bg-amber-50'>
      {/* Header Section */}

      <div className="flex flex-col items-center justify-center py-10">
        <img 
          src='src/assets/logo.svg' 
          alt="Pawsome Logo" 
          className="w-50 h-40 object-contain"
        />
        <h1 className="text-3xl font-bold text-orange-600 mt-[-30px]">Pawsome</h1>
      </div>

      {/* Main Content */}

      {/* Filter Icon */}
   <div className="flex justify-center w-full">
  <div className="max-w-7xl w-full">

    

    <FilterIcon 
            isOpen={isSidebarOpen} 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)
              
            }
            
            />
            

      <BreedFilter 
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          cityFilter={cityFilter}
          setCityFilter={setCityFilter}
          stateFilter={stateFilter}
          setStateFilter={setStateFilter}
          locations={locations}
          selectedZipCodes={selectedZipCodes}
          setSelectedZipCodes={setSelectedZipCodes}
          locationPage={locationPage}
          setLocationPage={setLocationPage}
          totalLocations={totalLocations}
          locationSize={locationSize}
          locationDetails={locationDetails}
          applyFilter={applyfilter}
          setSortType={setSortType}
          sortType={sortType}
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
          />
    

    
    <div className="flex justify-center w-full">
<div className="max-w-7xl w-full flex flex-col items-center gap-6 ">

  
      {/* Breed Dropdown */}
      <select
        className="rounded-4xl p-2 w-84 mt-[-40px] b flex-shrink-0 hover:bg-yellow-500 text-[15px] bg-[#e1e7e1]"
        onChange={(e) => {
          setSelectedBreed(e.target.value);
          setPage(0); // Reset page
        }}
        value={selectedBreed}
        >
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>


      {/* Match List  */}
        <div className="absolute top-60 right-4">
          <MatchList 
            favoriteDogs={favoriteDogs}
            onRemove={(dogId) => {
              toggleFavorite(dogId);
              setFavoriteDogs(prev => prev.filter(dog => dog.id !== dogId));
            }}
            />
        </div>

      {/* Match Button */}
      
        <div className="flex flex-col items-center gap-2 cursor-pointer group" >
        <div className="relative transform transition-transform group-hover:scale-110">
        {favoriteDogIds.length > 0 ? (
          <img 
          src='src/assets/paw-click.gif' 
          alt="Match button" 
          className="w-16 h-16 object-contain filter "
          onClick={matchDog}
          />
        ): (<img 
          src='src/assets/paw-click.gif' 
          alt="Match button" 
          className="w-16 h-16 object-contain filter" 
          />)}
        </div>
        <p className="text-lg font-medium text-yellow-400">
        {favoriteDogIds.length > 0 
          ? `Find my Match` 
          : 'No paws added to match'}
        </p>
          </div>


      {/* Top pagination */}
      <DogPagination 
        setPage={setPage}
        page={page}
        maxPages={maxPages}
        total={total}
        topPage={true}
        ></DogPagination>


        {/* Dog Cards */}
        {dogs.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className='text-2xl'>No Paws Found</p>
          <img src='src/assets/dog-run2.gif'  className="text-center w-40 h-20 mt-10 text-gray-500"></img>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  mt-4">
            {dogs.map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                isFavorite={favoriteDogIds.includes(dog.id)}
                toggleFavorite={toggleFavorite}
                
                favoriteDog={favoriteDogs}
                addFavoriteDog={addfavoriteDog}
              />
            ))}
          </div>
        )}

        {/* BottomPagination */}
<div className="flex justify-center w-full mb-4">
        <DogPagination 
        setPage={setPage}
        page={page}
        maxPages={maxPages}
        total={total}
        topPage={false}
        ></DogPagination>
          </div>
        </div>
        </div>
        </div>

        {/* Match Modal */}

        <MatchedBreed
          dog={matchedDog}
          isOpen={isMatchModalOpen}
          onClose={() => setIsMatchModalOpen(false)}
        />
</div>
</div>

  );
};


export default SearchPage;