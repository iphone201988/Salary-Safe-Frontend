import React, { useState, useEffect } from "react";
import axios from "axios";

interface SearchSelectProps {
  placeholder: string;
  type: "1" | "2"; // 1 for API data, 2 for direct data
  apiEndpoint?: string; // Optional, required if type is 1
  onSelectionChange: (selectedOptions: string[]) => void;
  multiple?: boolean; // Default to multiple selection
  data?: string[]; // Optional, used if type is 2
}

const SearchSelect: React.FC<SearchSelectProps> = ({
  placeholder,
  type,
  apiEndpoint,
  onSelectionChange,
  multiple = false,
  data = [],
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
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

  // Fetch options from API
  const fetchOptions = async (query: string) => {
    if (!query) {
      setOptions([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(apiEndpoint as string, {
        params: { query },
      });
      setOptions(response.data); // Assuming response.data is an array of strings
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (type === "1") {
      debouncedFetchOptions(value);
    } else if (type === "2") {
      // Filter the local data based on input value
      setOptions(data.filter((item) => item.toLowerCase().includes(value.toLowerCase())));
    }
  };

  // Debounced API call
  const debouncedFetchOptions = debounce(fetchOptions, 300);

  // Add an option to the selected list (for multiple or single selection)
  const handleOptionSelect = (option: string) => {
    if (multiple) {
      if (!selectedOptions.includes(option)) {
        const updatedSelectedOptions = [...selectedOptions, option];
        setSelectedOptions(updatedSelectedOptions);
        onSelectionChange(updatedSelectedOptions); // Notify parent
      }
    } else {
      setSelectedOptions([option]);
      onSelectionChange([option]); // Notify parent
    }
    setInputValue(""); // Clear input after selection
    setOptions([]); // Close dropdown
  };

  // Remove a selected option
  const handleRemoveOption = (option: string) => {
    const updatedSelectedOptions = selectedOptions.filter(
      (selected) => selected !== option
    );
    setSelectedOptions(updatedSelectedOptions);
    onSelectionChange(updatedSelectedOptions); // Notify parent
  };

  useEffect(() => {
    if (type === "2" && data.length) {
      setOptions(data); // Initialize with direct data if type is 2
    }
  }, [data, type]);

  return (
    <div className="search-select bg-white p-4">
      <div className="selected-options flex flex-wrap gap-2 mb-2">
        {selectedOptions.map((option, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-200 text-blue-800 px-2 py-1 rounded"
          >
            {option}
            <button
              onClick={() => handleRemoveOption(option)}
              className="ml-2 text-red-500"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="border p-2 w-full"
      />
      {loading && <div className="mt-2">Loading...</div>}
      {options.length > 0 && (
        <ul className="border mt-2 max-h-48 overflow-y-auto bg-white">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionSelect(option)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSelect;
