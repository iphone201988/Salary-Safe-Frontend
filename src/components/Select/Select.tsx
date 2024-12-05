import React from "react";

interface Option {
  value: string;
  text: string;
}

interface SelectProps {
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
}

const Select: React.FC<SelectProps> = ({ value, name, onChange, options, className }) => {
  return (
    <select
      value={value}
      name={name}
      onChange={onChange}
      className={className || "border rounded p-2 col-span-1"}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
