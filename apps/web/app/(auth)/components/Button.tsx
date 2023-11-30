interface ButtonProps {
  label: string;
  isLoading?: boolean
}

export function Button({ label, isLoading = false }: ButtonProps) {
  return (
    <button type="submit" className={`py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-500 transition-colors duration-300 disabled:bg-bg-indigo-400`} disabled={isLoading}>
      {label}
    </button>
  );
}
