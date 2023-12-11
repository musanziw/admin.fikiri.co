import Select from 'react-select';

interface InputProps {
  name: string;
  label: string;
  options: any[];
  onChange: (e: any) => void;
}

export function SelectInput({ name, label, options ,onChange }: InputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-gray-800">
        {label}
      </label>
      <Select
        isMulti
        options={options}
        onChange={onChange}
        className="h-12 rounded w-full mt-2 basic-multi-select"
      />
    </div>
  );
}
