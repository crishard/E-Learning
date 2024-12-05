import { useRef } from "react";
import { Course } from "../../types/course";
interface ILoadImage{
    setFormData: React.Dispatch<React.SetStateAction<Omit<Course, "id" | "instructor" | "rating" | "totalRatings" | "modules" | "duration" | "userId">>>,
    formData: Omit<Course, "id" | "instructor" | "rating" | "totalRatings" | "modules" | "duration" | "userId">
}
export const LoadImage = ({setFormData, formData}: ILoadImage) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    thumbnail: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                Imagem de Capa
            </label>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
            />
            {formData.thumbnail ? (
                <img
                    src={formData.thumbnail}
                    alt="Course thumbnail"
                    className="mt-2 max-w-full h-auto cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                />
            ) : (
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Carregar Imagem
                </button>
            )}
        </div>
    )
}
