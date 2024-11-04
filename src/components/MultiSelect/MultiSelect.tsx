import React from 'react';

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const newSelectedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter(option => option !== value)
      : [...selectedOptions, value];

    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div>
      <label>{label}</label>
      <select multiple value={selectedOptions} onChange={handleChange}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiSelectDropdown;
