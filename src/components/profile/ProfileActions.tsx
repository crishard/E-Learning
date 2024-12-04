import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

interface ProfileActionsProps {
    bio: string | undefined;
    role: string;
    onEdit: () => void;
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({ bio, role, onEdit }) => {
    return (
        <div>
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Sobre</h2>
                <p className="text-gray-600">{bio || 'Nenhuma biografia adicionada.'}</p>
            </div>
            <Button onClick={onEdit}>Editar Perfil</Button>
            {role === 'instructor' && (
                <Link to="/instructor-courses">
                    <Button className="ml-2">Meus Cursos</Button>
                </Link>
            )}
        </div>
    );
};
