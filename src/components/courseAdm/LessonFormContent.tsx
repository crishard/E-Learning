import { Course } from "../../types/course";
import { InputNumber } from "../ui/InputNumber";
import Label from "../ui/Label";

interface ILessonFormContent{
    loading: boolean,
    formData:{
        title: string;
        duration: number;
        videoUrl: string;
        moduleIndex: number;
    },
    handleSubmit: any,
    handleChange: any,
    modules:  Course['modules']
}
export const LessonFormContent = ({loading, handleSubmit, formData, handleChange, modules}: ILessonFormContent) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-medium">Adicionar Nova Aula</h3>

            <div>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border-blue-200 border-2 focus:border-blue-500 focus:outline-none"
                    placeholder="Título da Aula"
                    required
                />
            </div>

            <div>
                <Label name="duration" label="Duração (minutos)" />
                <InputNumber id="duration" name="duration" defaultValue={formData.duration} handleChange={handleChange} />
                
            </div>

            <div>
                <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border-blue-200 border-2 focus:border-blue-500 focus:outline-none"
                    placeholder="URL do Vídeo"
                    required
                />
            </div>

            <div>
                <select
                    name="moduleIndex"
                    value={formData.moduleIndex}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border-blue-200 border-2 focus:border-blue-500 focus:outline-none"
                    required
                >
                    {modules.map((module, index) => (
                        <option key={index} value={index}>
                            {module.title}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold disabled:opacity-50"
                disabled={loading || !formData.title.trim() || !formData.videoUrl.trim()}
            >
                {loading ? 'Adicionando...' : 'Adicionar Aula'}
            </button>
        </form>
    )
}
