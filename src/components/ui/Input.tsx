interface IInputProps {
    handleChange: any,
    id: string,
    name: string,
    defaultValue?: string,
}
const Input = (props: IInputProps) => {
    return (
        <input
            type="text"
            id={props.id}
            name={props.name}
            onChange={props.handleChange}
            className="mt-1 py-1.5 px-2 block w-full rounded-md border-blue-200 border-2 shadow-sm focus:border-blue-500 focus:outline-none"
            required
            defaultValue={props.defaultValue}
        />
    )
}

export default Input