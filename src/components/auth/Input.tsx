interface IInputFormsdProps{
    label: string,
    value: string,
    onChange: any,
    id: string, 
    type: string
}
export const Input = ({label, value, onChange, id, type}: IInputFormsdProps) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className="mt-1 py-1.5 px-2 block w-full rounded-md border-2 border-blue-200  outline-none focus:border-blue-500 "
                required
            />
        </div>
    )
}
