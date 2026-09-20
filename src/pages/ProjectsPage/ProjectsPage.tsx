import { useEffect, useState } from "react";
import { type Project, type ProjectUpdate } from "../../types/projects";
import {
    createProject,
    getProjects,
    deleteProject,
    updateProject,
} from "../../services/projectApi";
import ProjectList from "../../Components/ProjectList/ProjectList";
import ProjectForm from "../../Components/ProjectForm/ProjectForm";
import styles from "./ProjectsPage.module.css";

function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProjects() {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                setError("Load projects is failed");
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, []);

    const handleCreateProject = async (newProject: Omit<Project, "id">) => {
        try {
            const createdProject = await createProject(newProject);

            setProjects((prevProjects) => [...prevProjects, createdProject]);
        } catch (error) {
            setError("Cant create project");
        }
    };

    const handleDeleteProject = async (id: string) => {
        try {
            await deleteProject(id);

            setProjects((prevProjects) =>
                prevProjects.filter((project) => project.id !== id),
            );
        } catch (error) {
            setError("Помилка видалення");
        }
    };

    const handleUpdate = async (id: string, changes: ProjectUpdate) => {
        try {
            const updatedProject = await updateProject(id, changes);

            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project.id === id ? updatedProject : project,
                ),
            );
        } catch (error) {
            setError("Project update failed");
        }
    };

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <>
            <div className={styles.page}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Projects</h1>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <ProjectForm onCreate={handleCreateProject} />

                <ProjectList
                    projects={projects}
                    onDelete={handleDeleteProject}
                    onUpdate={handleUpdate}
                />
            </div>
        </>
    );
}

export default ProjectsPage;
