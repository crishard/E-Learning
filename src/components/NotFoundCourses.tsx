import { Link } from "react-router-dom"

export const NotFoundCourses = () => {
  return (
    <div className="text-center py-12">
    <h2 className="text-2xl font-bold mb-4">Nenhum curso matriculado</h2>
    <p className="text-gray-600 mb-6">
        Você ainda não está matriculado em nenhum curso.
    </p>
    <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
    >
        Explorar Cursos
    </Link>
</div>
  )
}
