interface ITextAreaProps{
    id: string,
    name: string,
    defaultValue: string,
}
const Textarea = (props: ITextAreaProps) => {
    return (
        <textarea
            id={props.id}
            name={props.name}
            defaultValue={props.defaultValue}
            rows={4}
            className="mt-1 px-2 pt-2 block w-full rounded-md border-blue-200 border-2 focus:border-blue-500 focus:outline-none"
            required
        />
    )
}

export default Textarea