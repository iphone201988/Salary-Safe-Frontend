type EditableFieldProps = {
    label: string;
    value: string;
    isEditable: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  const EditableField = ({
    label,
    value,
    isEditable,
    onChange,
  }: EditableFieldProps) => (
    <div className="flex gap-1 justify-center items-center">
      <div className="font-bold text-black">{label} :</div>
      {isEditable ? (
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="text-sm text-gray-500 border border-gray-300 rounded-md p-1"
        />
      ) : (
        <p className="text-sm text-gray-500">{value}</p>
      )}
    </div>
  );

export default EditableField;