import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";
import { Input } from "./Input";
interface ILoginFormContentProps {
    handleSubmit: (e: React.FormEvent) => Promise<void>,
    error: string,
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>
}
const LoginFormContent = ({ handleSubmit, error, email, setEmail, password, setPassword }: ILoginFormContentProps) => {

    const { signInWithGoogle } = useAuth();
    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                <Input label={"Email"} value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} id={"email"} type={"email"}/>

                <Input label={"Senha"} value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} id={"password"} type={"password"}/>
               
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full">
                    Entrar
                </Button>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                </div>
            </div>

            <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={signInWithGoogle}
            >
                <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-5 h-5 mr-2"
                />
                Entrar com Google
            </Button>
        </>
    )
}

export default LoginFormContent