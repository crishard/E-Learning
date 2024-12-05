interface ILevelSelect{
    level: string,
    handleChange: any,

}
const LevelSelect = ({level, handleChange}: ILevelSelect) => {
    return (
        <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                Nível
            </label>
            <select
                id="level"
                name="level"
                value={level}
                onChange={handleChange}
                className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
                <option value="beginner">Iniciante</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
            </select>
        </div>
    )
}

export default LevelSelect