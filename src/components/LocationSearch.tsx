import React, { useState } from "react";
import axios from "axios";

interface Location {
  id: string;
  city: string;
  country: string;
  location_multiplier: number;
}

interface LocationSearchProps {
  placeholder?: string;
  apiEndpoint?: string|any;
  onSelectionChange?: (selectedLocations: Location[]) => void;
  selectMode: "single" | "multiple"; // New prop for select mode
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  placeholder,
  apiEndpoint,
  onSelectionChange,
  selectMode,
}) => {
  const [options, setOptions] = useState<Location[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Location[]>(
    selectMode === "multiple" ? [] : []
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Debounce helper
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchOptions = async (query: string) => {
    if (!query) {
      setOptions([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(apiEndpoint, {
        params: { query },
        headers: {
          "X-API-KEY" : "47f38e90f9994df85c962cc384e728b137bcd722db2a96c79b94a6723606bf9d",
        },
      });
      setOptions(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced API call
  const debouncedFetchOptions = debounce(fetchOptions, 300);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedFetchOptions(value);
  };

  // Add a location to the selected list
  const handleLocationSelect = (location: Location) => {
    if (selectMode === "multiple") {
      // For multiple select, add location if not already selected
      if (!selectedLocations.some((selected) => selected.id === location.id)) {
        const updatedSelectedLocations = [...selectedLocations, location];
        setSelectedLocations(updatedSelectedLocations);
        if(onSelectionChange){
          onSelectionChange(updatedSelectedLocations); // Notify parent
        }
      }
    } else {
      // For single select, replace selected location
      setSelectedLocations([location]);
      if(onSelectionChange){
        onSelectionChange([location]); // Notify parent
      }
    }
    setInputValue(""); // Clear input after selection
    setOptions([]); // Close dropdown
  };

  // Remove a selected location
  const handleRemoveLocation = (locationId: string) => {
    const updatedSelectedLocations = selectedLocations.filter(
      (location) => location.id !== locationId
    );
    setSelectedLocations(updatedSelectedLocations);
    if(onSelectionChange){
      onSelectionChange(updatedSelectedLocations); // Notify parent
    }
  };

  return (
    <div className="location-search bg-white ">
      <div className="selected-locations flex flex-wrap gap-2 mb-2">
         <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="border w-full rounded-[8px] outline-none border-gray-600 text-[14px] px-2 py-1"
      />
        {selectedLocations.map((location) => (
          <div
            key={location.id}
            className="flex items-center text-black px-2 py-1 rounded"
          >
            {`${location.city}, ${location.country}`}
            <button
              onClick={() => handleRemoveLocation(location.id)}
              className="ml-2 text-red-500"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      {loading && <div className="mt-2">Loading...</div>}
      {options.length > 0 && (
        <ul className="border mt-2 max-h-48 overflow-y-auto bg-white">
          {options.map((location) => (
            <li
              key={location.id}
              onClick={() => handleLocationSelect(location)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {`${location.city}, ${location.country}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
