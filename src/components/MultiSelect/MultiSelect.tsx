import React from "react";
import Select, { OnChangeValue } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

interface MultiSelectComponentProps {
  options: OptionType[];
  label: string;
  isMulti: boolean;
  onChange: (selectedOptions: OnChangeValue<OptionType, boolean>) => void;
  value: OptionType[] | any | null; 
}

const MultiSelectComponent: React.FC<MultiSelectComponentProps> = ({
  options,
  label,
  isMulti,
  onChange,
  value,
}) => {
  return (
    <div className="w-full flex flex-col space-y-1">
      <label className="text-left">{label}</label>
      <Select<OptionType, boolean>
        options={options}
        isMulti={isMulti}
        onChange={onChange}
        value={value} 
        className="react-select"
        classNamePrefix="select"
      />
    </div>
  );
};

export default MultiSelectComponent;
