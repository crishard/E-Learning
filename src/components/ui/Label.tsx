interface ILbaleProps {
    name: string,
    label: string
}
const Label = (props: ILbaleProps) => {
    return (
        <label htmlFor={props.name} className="block sm:text-lg text-sm font-medium text-gray-700">
            {props.label}
        </label>
    )
}
export default Label;