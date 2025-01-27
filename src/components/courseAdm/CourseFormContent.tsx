import { Course } from "../../types/course";
import Input from "../ui/Input";
import { InputNumber } from "../ui/InputNumber";
import Label from "../ui/Label";
import Textarea from "../ui/Textarea";

interface ICourseFormProps {
    course: Course;
    handleSubmit: (e: React.FormEvent) => Promise<void>
    loading?: boolean;
}

const CourseFormContent = ({ course, handleSubmit, loading }: ICourseFormProps) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <Label name={"title"} label={"Título do Curso"} />
                <Input handleChange={undefined} id={"title"} name={"title"} defaultValue={course.title} />
            </div>

            <div>
                <Label name={"description"} label={"Descrição"} />
                <Textarea  id={"description"} name={"description"} defaultValue={course.description} />
                
            </div>

            <div>
                <Label name={"prince"} label={"Preço"} />
                <InputNumber handleChange={undefined} id={"price"} name={"price"} defaultValue={course.price} />
            </div>

            <div>
                <Label name={"category"} label={"Categoria"} />
                <Input handleChange={undefined} id={"category"} name={"category"} defaultValue={course.category} />
            </div>

            <div>
                <Label name={"level"} label={"Nível"} />
                <select
                    id="level"
                    name="level"
                    defaultValue={course.level}
                    className="mt-1 p-2 block w-full rounded-md border-blue-200 border-2 focus:border-blue-500 focus:outline-none"
                >
                    <option value="beginner">Iniciante</option>
                    <option value="intermediate">Intermediário</option>
                    <option value="advanced">Avançado</option>
                </select>
            </div>
            <div className="flex justify-center w-full">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </div>

        </form>
    )
}

export default CourseFormContent