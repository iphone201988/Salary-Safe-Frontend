interface InputFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange: any;
  error?: string | undefined;
  type?: string;
  placeholder?: string;
  classes?: string;
  min?: number;
  view?: boolean;
}
const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder = "",
  classes = "",
  min=0,
  view =false
}: InputFieldProps) => (
  <div className="w-full flex flex-col space-y-1">
    <label className="text-left">{label}:</label>
    {view 
    ? (<div className="text-gray-700 w-full p-1 rounded-md">{value}</div>)
    :(<input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      className={`border border-black rounded-md w-full px-2 py-1 ${
        error && "border-red-600"
      } ${classes}`}
    />)
    }
    {error && <small className="text-red-600 font-bold text-sm">{error}</small>}
  </div>
);

export default InputField;
