import { Button } from "../ui/Button";

interface EditProfileFormProps {
    formData: {
        displayName: string;
        bio: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        displayName: string;
        bio: string;
        photoURL: string;
    }>>
    updateProfile: () => void;
    cancelEdit: () => void;
}

export const EditProfileForm = ({
    formData,
    setFormData,
    updateProfile,
    cancelEdit,
}: EditProfileFormProps) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                updateProfile();
            }}
            className="space-y-4"
        >
            <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            displayName: e.target.value,
                        }))
                    }
                    className="mt-1 px-2 py-1.5 block w-full rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Biografia</label>
                <textarea
                    value={formData.bio}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            bio: e.target.value,
                        }))
                    }
                    rows={4}
                    className="mt-1 px-2 border-2 border-blue-200 focus:border-blue-500 focus:outline-none py-1.5 block w-full rounded-md "
                />
            </div>
            <div className="flex gap-2">
                <Button type="submit">Salvar</Button>
                <Button type="button" variant="outline" onClick={cancelEdit}>
                    Cancelar
                </Button>
            </div>
        </form>
    )
}
