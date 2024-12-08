import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../lib/firebase";
import { UserRole } from "../../types/user";
import { RegisterFormContent } from "./RegisterFormContent";

export const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        displayName: '',
        role: 'student' as UserRole,
    });
    const [error, setError] = useState('');


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

    return <RegisterFormContent formData={formData} setFormData={setFormData} error={error} handleSubmit={handleSubmit}/>
        
}
