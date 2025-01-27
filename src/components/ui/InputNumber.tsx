interface IInputNumberProps {
    id: string,
    name: string,
    defaultValue: number,
    handleChange: any
    
}
export const InputNumber = (props: IInputNumberProps) => {
    return (
        <input
            type="number"
            id={props.id}
            name={props.name}
            defaultValue={props.defaultValue}
            onChange={props.handleChange}
            min="0"
            step="0.01"
            className="mt-1 py-1.5 px-2 block w-full rounded-md border-2 border-blue-200 focus:outline-none  focus:border-blue-500"
            required
            autoComplete="off"
        />
    )
}
