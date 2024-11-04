import React from 'react';
import Select from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

interface MultiSelectComponentProps {
  options: OptionType[];
  label: string;
  isMulti: boolean;
}

const MultiSelectComponent: React.FC<MultiSelectComponentProps> = ({ options, label, isMulti }) => {
  return (
    <div className="w-full flex flex-col space-y-1">
      <label className="text-left">{label}</label>
      <Select<OptionType, boolean>
        options={options}
        isMulti={isMulti} // Use isMulti prop
        className="react-select"
        classNamePrefix="select"
      />
    </div>
  );
};

export default MultiSelectComponent;
