interface IPersonalInformation{
    name: string,
    email: string,
    role: string
}
export const PersonalInformation = ({name, email, role}:IPersonalInformation) => {
    return (
        <div>
            <h1 className="text-2xl font-bold">{name.substring(0, 20)}</h1>
            <p className="text-gray-600">{email}</p>
            <span className="inline-block px-3 py-1 mt-2 text-sm font-medium text-white bg-blue-500 rounded-full">
                {role === 'instructor' ? 'Professor' : 'Aluno'}
            </span>
        </div>
    )
}
