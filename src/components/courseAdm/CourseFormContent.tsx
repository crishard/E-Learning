import { Course } from "../../types/course";

interface ICourseFormProps {
    course: Course;
    handleSubmit: (e: React.FormEvent) => Promise<void>
    loading?: boolean;
}

const CourseFormContent = ({ course, handleSubmit, loading }: ICourseFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="block sm:text-lg text-sm font-medium text-gray-700">
                    Título do Curso
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={course.title}
                    className="mt-1 py-2 px-2 block w-full rounded-md border-blue-200 border-2 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descrição
                </label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={course.description}
                    rows={4}
                    className="mt-1 px-2 pt-2 block w-full rounded-md border-blue-200 border-2 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Preço
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    defaultValue={course.price}
                    min="0"
                    step="0.01"
                    className="mt-1 p-2 block w-full rounded-md border-blue-200 border-2 focus:border-blue-500 focus:outline-none"
                    required
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Categoria
                </label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    defaultValue={course.category}
                    className="mt-1 p-2 block w-full rounded-md border-blue-200 border-2 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                    Nível
                </label>
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