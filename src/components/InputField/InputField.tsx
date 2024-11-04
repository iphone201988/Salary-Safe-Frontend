interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: any;
  error?: string | undefined;
  type?: string;
  placeholder?: string;
}
const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder=""
}: InputFieldProps) => (
  <div className="w-full flex flex-col space-y-1">
    <label className="text-left">{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-black rounded-md w-full px-2 py-1 ${
        error && "border-red-600"
      }`}
    />
    {error && <small className="text-red-600 font-bold text-sm">{error}</small>}
  </div>
);

export default InputField;
