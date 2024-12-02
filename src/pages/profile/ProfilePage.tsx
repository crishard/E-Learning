import { doc, updateDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';

export const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        displayName: user?.displayName || '',
        bio: user?.bio || '',
        photoURL: user?.photoURL || '',
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    if (!user) {
        return null;
    }
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Image = reader.result as string;
                try {
                    await updateDoc(doc(db, 'users', user.uid), {
                        photoURL: base64Image,
                    });
                    setFormData(prev => ({ ...prev, photoURL: base64Image }));
                } catch (error) {
                    console.error('Error uploading image:', error);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        try {
            await updateDoc(doc(db, 'users', user.uid), {
                displayName: formData.displayName,
                bio: formData.bio,
            });
            user.displayName = formData.displayName;
            user.bio = formData.bio;

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="max-w-2xl mx-auto sm:p-6 p-2">
            <div className="bg-white rounded-lg shadow-md sm:p-6 p-4">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        {formData.photoURL ? (
                            <img
                                src={formData.photoURL}
                                alt={user.displayName}
                                onClick={handleImageClick}
                                className="w-20 h-20  rounded-full cursor-pointer object-cover"
                            />
                        ) : (
                            <div
                                onClick={handleImageClick}
                                className="w-20 h-20 sm:w-20 sm:h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl cursor-pointer"
                            >
                                {user.displayName[0]}
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold ">{user.displayName.substring(0, 20)}</h1>
                        <p className="text-gray-600">{user.email}</p>
                        <span className="inline-block px-3 py-1 mt-2 text-sm font-medium text-white bg-blue-500 rounded-full">
                            {user.role === 'instructor' ? 'Professor' : 'Aluno'}
                        </span>
                    </div>
                </div>

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Nome
                            </label>
                            <input
                                type="text"
                                value={formData.displayName}
                                onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Biografia
                            </label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit">Salvar</Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-2">Sobre</h2>
                            <p className="text-gray-600">{user.bio || 'Nenhuma biografia adicionada.'}</p>
                        </div>
                        <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>

                        {user.role === 'instructor' && (
                            <Link to="/instructor-courses">
                                <Button className="ml-2">Meus Cursos</Button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};