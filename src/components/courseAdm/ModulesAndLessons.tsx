import { useEffect, useState } from "react";
import { Module } from "../../types/course";
import { LessonForm } from "./LessonForm";
import { ModuleForm } from "./ModuleForm";

interface IModulesAndLessons {
    modules?: Module[],
    handleAddModule: (moduleData: {
        title: string;
    }) => Promise<void>,
    handleAddLesson: (lessonData: {
        title: string;
        duration: number;
        videoUrl: string;
        moduleIndex: number;
    }) => Promise<void>
}

export const ModulesAndLessons = ({ modules, handleAddLesson, handleAddModule }: IModulesAndLessons) => {
    const [localModules, setLocalModules] = useState(modules);

    useEffect(() => {
        setLocalModules(modules);
        console.log('Modules in ModulesAndLessons:', modules);
    }, [modules]);

    const handleAddModuleAndRefresh = async (moduleData: { title: string }) => {
        await handleAddModule(moduleData);
        setLocalModules([...modules || [], { title: moduleData.title, lessons: [] }]);
    };

    return (
        <div className="sm:grid grid-cols-3 gap-10">

            <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-6">Módulos e Aulas</h2>

                {modules?.length === 0 && (<>
                    <div className="text-center flex justify-items-center text-blue-500">
                        <p>Nenhum módulo adicionado, adicione um novo módulo e adicione suas aulas</p>
                    </div>
                </>)}
                
                {modules?.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="bg-white shadow rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">{module.title}</h3>
                        <ul className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                                <li key={lessonIndex} className="flex items-center gap-2 text-gray-700">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    {lesson.title} - {lesson.duration} minutos
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-8 col-span-2 space-y-6">
                <ModuleForm onSubmit={handleAddModuleAndRefresh} />
                <LessonForm
                    modules={localModules || []}
                    onSubmit={handleAddLesson}
                />
            </div>
        </div>
    )
}
