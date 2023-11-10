interface ButtonProps {
    label: string
}

export function Button({label}: ButtonProps) {
    return (
        <button type="submit"
                className={'py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-500 transition-colors duration-300'}>
            {label}
        </button>
    )
}