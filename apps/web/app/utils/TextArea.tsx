interface TextAreaProps {
  name: string;
  label: string;
  placeholder: string;
  value: string,
  onChange: (e: any) => void;
}

export function TextArea({ name, label, placeholder, value, onChange }: TextAreaProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-gray-800">
        {label}
      </label>
      <textarea
        onChange={onChange}
        name={name}
        value={value}
        className=" lg:text-lg focus:outline-none text-sm block w-full rounded-md h-[180px] border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}

