import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../lib/firebase";
import LoginFormContent from "./LoginFormContent";

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError('Falha no login. Verifique suas credenciais.');
        }
    };

    return (
        <div className="space-y-6">
            <LoginFormContent handleSubmit={handleSubmit} error={error} email={email} setEmail={setEmail} password={password} setPassword={setPassword
            } />
        </div>
    )
}
