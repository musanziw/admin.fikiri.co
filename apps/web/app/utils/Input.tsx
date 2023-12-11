interface InputProps {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  value: string,
  state?: number;
  onChange: (e: any) => void;
}

export function Input({ name, label, placeholder, type, value, state, onChange }: InputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-gray-800">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`focus:outline-none text-sm block w-full placeholder:text-sm rounded-md border border-gray-200 px-4 py-3 transition duration-300 placeholder:text-gray-600 ring-inset lg:text-lg 
         ${state === 0 && 'focus:ring-2 focus:ring-indigo-600 focus:border-transparent'} ${state === 1 && 'ring-2 ring-red-500 border-transparent'} ${state === 2 && 'ring-2 ring-emerald-300 border-transparent'}`}
      />
    </div>
  );
}
