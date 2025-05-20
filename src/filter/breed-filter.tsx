import type { Location } from '../types/interfaces';


interface breedfilterProps {
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  cityFilter: string;
  setCityFilter: (city: string) => void;
  stateFilter: string;
  setStateFilter: (state: string) => void;
  locations: Location[];
  selectedZipCodes: string[];
  setSelectedZipCodes: (zipCodes: string[]) => void;
  locationPage: number;
  setLocationPage: (page: number) => void;
  totalLocations: number;
  locationSize: number;
  locationDetails: Location[];
  applyFilter: () => void;
  setSortType: (sortType: 'name' | 'breed' | 'age') => void;
  sortType: 'name' | 'breed' | 'age';
  setIsSidebarOpen: (isOpen: boolean) => void;
  isSidebarOpen: boolean;

}

function BreedFilter({
  sortOrder,
  setSortOrder,
  cityFilter,
  setCityFilter,
  stateFilter,
  setStateFilter,
  locations,
  selectedZipCodes,
  setSelectedZipCodes,
  locationPage,
  setLocationPage,
  totalLocations,
  locationSize,
  applyFilter,
  setSortType,
  sortType,
  locationDetails,
  isSidebarOpen,
  setIsSidebarOpen
}: breedfilterProps) {
  return (
    <>

    {/* Sidebar for filters */}
    
    <div
      className={`fixed left-0 top-0 h-full bg-amber-50 shadow-xl z-50 transition-all duration-300 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '300px' }}
      >
      <div className="p-4 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black">Filters</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700"
            >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      <button
        onClick={() => applyFilter()}
        className="block mb-4 px-20 py-2 bg-[#e1e7e1] text-black  rounded-4xl hover:bg-yellow-500"
        >
        Apply filter
      </button>

{/* Filter by breed */}
      <h2>Sort Type</h2>
    <select value='sortType' className="block p-2 px-20 mb-6 mt-2 bg-[#e1e7e1] text-black  rounded-4xl hover:bg-yellow-500" 
    onChange={(e)=>setSortType(e.target.value as 'name' | 'breed' | 'age')}>
      <option value="sortType" disabled>{sortType.charAt(0).toUpperCase() + sortType.slice(1)}</option>
      <option value="name">Name</option>
      <option value="breed">Breed</option>
      <option value="age">Age</option>
    </select>

{/* Sort order */}

      <h2>Sort Order</h2>
      <select
        className="block  mt-2 p-2 mb-4 px-20  bg-[#e1e7e1] text-black  rounded-4xl hover:bg-yellow-500"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        >
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>



    
{/* Filter by city and state */}

      <h3 className="text-lg font-semibold mb-2   ">Search by city name</h3>
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search by city"
          className="block p-2 w-full   bg-[#e1e7e1] text-black  rounded-4xl hover:bg-yellow-500"
          value={cityFilter}
          onChange={(e) => {
            setCityFilter(e.target.value);
            setLocationPage(0);
            if (e.target.value === '') {
              locations.length = 0;
              
            }
          }}
          />

      <h3 className="text-lg font-semibold mb-2">Search by state</h3>   
        <input
          type="text"
          placeholder="State (e.g., CA)"
          className="block bg-[#e1e7e1] text-black  rounded-4xl hover:bg-yellow-500 p-2 w-full"
          maxLength={2}
          value={stateFilter}
          onChange={(e) => {
            setStateFilter(e.target.value.toUpperCase());
            setLocationPage(0);
            if (e.target.value === '') {
              locations.length = 0;
              
            }
          }}
          />

{/* Filter by zip code */}

        {selectedZipCodes.length > 0 && locationDetails.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Selected Locations:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {locationDetails.map((location) => (
                <div key={location.zip_code} className="bg-blue-50 p-2 rounded">
                  <button
                    onClick={() => setSelectedZipCodes(selectedZipCodes.filter(z => z !== location.zip_code))}
                    className="ml-2 text-red-500 hover:text-red-700"
                    >
                    Remove
                  </button>
                  <div>{location.city}, {location.state}</div>
                  <div className="text-sm text-gray-600">ZIP: {location.zip_code}</div>
                  <div className="text-sm text-gray-600">County: {location.county}</div>
                </div>
              ))}
            </div>
          </div>
        )}

{/* Filter by location */}

        {locations.length > 0 && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {locations.map(location => (
                <button
                key={location.zip_code}
                onClick={() => {
                  if (selectedZipCodes.includes(location.zip_code)) {
                    setSelectedZipCodes(selectedZipCodes.filter(zip => zip !== location.zip_code));
                  } else if (selectedZipCodes.length < 100) {
                    setSelectedZipCodes(selectedZipCodes.concat(location.zip_code));
                  }
                }}
                className={`p-1 text-sm rounded ${
                  selectedZipCodes.includes(location.zip_code)
                  ? 'bg-amber-400 text-black'
                  : 'bg-gray-100 hover:bg-gray-200'
                }`}
                disabled={selectedZipCodes.length >= 100 && !selectedZipCodes.includes(location.zip_code)}
                >
                  {location.city} {location.state} {location.zip_code}
                </button>
              ))}
            </div>

{/* Pagination */}

            {totalLocations > locationSize && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setLocationPage(Math.max(0, locationPage - 1))}
                  disabled={locationPage === 0}
                  className="bg-[#e1e7e1] text-black  rounded-4xl hover:bg-yellow-500 px-3 py-1 disabled:bg-gray-400"
                  >
                  Previous
                </button>

                <span>
                  Page {locationPage + 1} of {Math.ceil(totalLocations / locationSize)}
                </span>

                <button
                  onClick={() => setLocationPage(locationPage + 1)}
                  disabled={(locationPage + 1) * locationSize >= totalLocations}
                  className="bg-[#e1e7e1] text-black  rounded-4xl hover:bg-yellow-500 px-3 py-1 disabled:bg-gray-400"
                  >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
        </div></div>
    </>
  );
}

export default BreedFilter;
