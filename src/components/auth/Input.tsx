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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none focus:border-blue-500 focus:ring-2"
                required
            />
        </div>
    )
}
