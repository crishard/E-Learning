import { UserRole } from "../../types/user";
import { Button } from "../ui/Button";
import { Input } from "./Input";
interface IRegisterFormContent {
    formData: {
        email: string;
        password: string;
        displayName: string;
        role: UserRole;
    },
    setFormData: React.Dispatch<React.SetStateAction<{
        email: string;
        password: string;
        displayName: string;
        role: UserRole;
    }>>,
    error: string
    handleSubmit: (e: React.FormEvent) => Promise<void>
}

export const RegisterFormContent = ({ formData, setFormData, error, handleSubmit }: IRegisterFormContent) => {

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input label={"Nome"} value={formData.displayName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, displayName: e.target.value }))} id={"displayName"} type={"text"}/>

            <Input label={"Email"} value={formData.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, email: e.target.value }))} id={"email"} type={"email"}/>

            <Input label={"Senha"} value={formData.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, password: e.target.value }))} id={"password"} type={"password"}/>
           
            <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Tipo de Conta
                </label>
                <select
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as UserRole }))}
                    id="role"
                    className="mt-2 border outline-none border-blue-200  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                    <option value="student">Aluno</option>
                    <option value="instructor">Professor</option>
                </select>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
                Criar Conta
            </Button>
        </form>
    )
}
