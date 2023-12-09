interface ButtonProps {
  label: string;
  isLoading?: boolean,
  onclick: (e: any) => void
}

export function Button({ label, isLoading = false, onclick }: ButtonProps) {
  return (
    <button type="submit" className={`py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-500 transition-colors duration-300 disabled:bg-indigo-500 disabled:cursor-not-allowed`} disabled={isLoading} onClick={onclick}>
      {label}
    </button>
  );
}
