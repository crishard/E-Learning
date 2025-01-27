import { useCreateCourseForm } from "../../hooks/useCreateCourseForm";
import { ButtonForm } from "./ButtonForm";
import { InputText } from "./InputText";
import LevelSelect from "./LevelSelect";
import { LoadImage } from "./LoadImage";
import { PriceAndDescription } from "./PriceAndDescription";

export const CreateCourseForm = () => {
    const { formData, handleChange, handleSubmit, setFormData } = useCreateCourseForm();

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <LoadImage setFormData={setFormData} formData={formData}/>

            <InputText value={formData.title} handleChange={handleChange} label={"Título do curso"} id={"title"} name={"title"} />

            <PriceAndDescription description={formData.description} handleChange={handleChange} price={formData.price} />

            <InputText value={formData.category} handleChange={handleChange} label={"Categoria"} id={"category"} name={"category"} />

            <LevelSelect level={formData.level} handleChange={handleChange} />

            <ButtonForm />
        </form>
    );
};
