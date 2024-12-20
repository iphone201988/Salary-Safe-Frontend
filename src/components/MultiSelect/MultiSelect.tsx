import React from "react";
import Select, { OnChangeValue } from "react-select";

interface OptionType {
  value: string | number | boolean;
  label: string;
}

interface MultiSelectComponentProps {
  options: OptionType[];
  label: string;
  isMulti: boolean;
  onChange: (selectedOptions: OnChangeValue<OptionType, boolean>) => void;
  value: OptionType[] | any | null;
  error?: any;
  view?: boolean
  isDisabled?: boolean
}

const MultiSelectComponent: React.FC<MultiSelectComponentProps> = ({
  options,
  label,
  isMulti,
  onChange,
  value,
  error,
  // view=false,
  isDisabled
}) => {
  // console.log("on change",value);
  return (
    <>
      <div className="w-full flex flex-col space-y-1">
        <label className="text-left">{label}</label>
        <Select<OptionType, boolean>
          options={options}
          isMulti={isMulti}
          onChange={onChange}
          value={value}
          className="react-select"
          classNamePrefix="select"
          placeholder="Select...."
          isDisabled={isDisabled}
        />
      </div>

      {error && (
        <small className="text-red-600 font-bold text-sm">{error}</small>
      )}
    </>
  );
};

export default MultiSelectComponent;
