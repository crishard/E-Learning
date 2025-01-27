import Label from "../ui/Label";

interface ILevelSelect {
    level: string;
    handleChange: any;
}

const LevelSelect = ({ level, handleChange }: ILevelSelect) => {
    return (
        <div>
            <Label name="level" label="Nível" />
           
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
