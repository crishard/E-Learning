interface ILevelSelect {
    level: string;
    handleChange: any;
}

const LevelSelect = ({ level, handleChange }: ILevelSelect) => {
    return (
        <div>
            <label htmlFor="level" className="block sm:text-lg text-sm font-medium text-gray-700 pb-2">
                Nível
            </label>
            <select
                id="level"
                name="level"
                value={level}
                onChange={handleChange}
                className="mt-1 py-2.5 block w-full rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none px-2"
            >
                <option value="beginner">Iniciante</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
            </select>
        </div>
    );
};

export default LevelSelect;
