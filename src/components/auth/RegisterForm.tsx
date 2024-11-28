import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { auth, db } from "../../lib/firebase";
import { UserRole } from "../../types/user";
import { Button } from "../ui/Button";

export const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        displayName: '',
        role: 'student' as UserRole,
    });
    const [error, setError] = useState('');
    const { signInWithGoogle } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: formData.email,
                displayName: formData.displayName,
                role: formData.role,
                createdAt: new Date(),
            });
        } catch (err) {
            setError('Erro ao criar conta. Tente novamente.');
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                        Nome
                    </label>
                    <input
                        type="text"
                        id="displayName"
                        value={formData.displayName}
                        onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Tipo de Conta
                    </label>
                    <select
                        value={formData.role}
                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as UserRole }))}
                        id="role"
                        className="mt-2 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                Cadastrar com Google
            </Button>
        </div>

    )
}
