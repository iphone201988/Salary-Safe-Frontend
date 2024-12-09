import { useState, ChangeEvent, FocusEvent } from "react";

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  errorMessage?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  label,
  type = "text",
  placeholder = "",
  name,
  required = true,
  errorMessage = "",
  value,
  onChange,
}: InputProps) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = (_e: FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  return (
    <div className="w-[300px] p-1">
      <div className="flex flex-col">
        <div className="relative w-fit mb-2">
          {required && (
            <div className="absolute text-red-600 text-[13px] right-0">*</div>
          )}
          <label htmlFor={name} className="text-[12px] mt-1 font-semibold">
            {label}
          </label>
        </div>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          required={required}
          className="border rounded-[8px] outline-none border-gray-600 text-[14px] px-2 py-1"
          placeholder={placeholder}
        />
      </div>
      {isTouched && errorMessage && (
        <div className="text-red-600 font-[500] text-[14px] mt-1">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Input;
