import Input from "../ui/Input"
import Label from "../ui/Label"

interface IInputText {
    value: string,
    handleChange: any,
    label: string,
    id: string,
    name: string
}
export const InputText = ({ handleChange, label, name, id }: IInputText) => {
    return (
        <div>
            <Label name={name} label={label} />
            <Input  handleChange={handleChange} name={name} id={id} />
        </div>
    )
}
