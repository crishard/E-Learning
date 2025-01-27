import { InputNumber } from "../ui/InputNumber"
import Label from "../ui/Label"
import Textarea from "../ui/Textarea"

interface IPriceAndDescription {
    description: string,
    handleChange: any,
    price: number
}
export const PriceAndDescription = ({ description, price, handleChange }: IPriceAndDescription) => {
    return (
        <div>
            <div>
                <Label name="description" label="Descrição" />
                <Textarea id={"description"} name={"description"} defaultValue={description} />

            </div>

            <div>
                <Label name="price" label="Preço" />
                <InputNumber id={"price"} name={"price"} defaultValue={price} handleChange={handleChange} />
                
            </div>
        </div>
    )
}
