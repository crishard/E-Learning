interface IDeleteCourse {
    loading: boolean
    setShowDeleteModal: (value: React.SetStateAction<boolean>) => void
}
export const DeleteCourse = ({ loading, setShowDeleteModal }: IDeleteCourse) => {
    return (
        <div className="pt-6 flex justify-between">
            <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                disabled={loading}
            >
                Excluir Curso
            </button>
        </div>
    )
}
