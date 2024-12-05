interface IInputText {
    value: string,
    handleChange: any,
    label: string,
    id: string,
    name: string
}
export const InputText = ({ value, handleChange, label, name, id }: IInputText) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type="text"
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
            />
        </div>
    )
}
