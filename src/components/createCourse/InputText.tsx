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
            <label htmlFor={name} className="block sm:text-lg text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type="text"
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                className="mt-1 py-1.5 px-2 block w-full rounded-md border-blue-200 border-2  shadow-sm focus:border-blue-500 focus:outline-none"
                required
            />
        </div>
    )
}
