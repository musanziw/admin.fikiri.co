'use client';

interface InputProps {
    name: string;
    label: string;
    placeholder: string;
    type: string;
    ref : React.RefObject<HTMLInputElement>;
  }
  
  export function InputSolutionSubmiting({ name, label, placeholder, type, ref }: InputProps) {
    return (
      <div className="space-y-2">
        <label htmlFor="email" className="text-gray-800">
          {label}
        </label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="focus:outline-none text-sm block w-full rounded-md border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
        />
      </div>
    );
  }
  