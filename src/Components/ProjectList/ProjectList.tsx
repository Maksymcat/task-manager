import type { Project, ProjectUpdate } from "../../types/projects";
import ProjectItem from "../ProjectItem/ProjectItem";
import styles from "./ProjectList.module.css"
type ProjectListProps = {
    projects: Project[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, changes: ProjectUpdate) => void
};


function ProjectList({ projects, onDelete, onUpdate }: ProjectListProps) {


    return (
        <>
            <ul className={styles.list}>
                {projects.map((project) => (
                    <ProjectItem onUpdate={onUpdate} onDelete={onDelete} project={project} key={project.id} />
                ))}
            </ul>
        </>
    )
}

export default ProjectList