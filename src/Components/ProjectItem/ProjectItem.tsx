import { Link } from "react-router-dom";
import type { Project, EditableProject, ProjectUpdate } from "../../types/projects";
import {  useState } from "react";
import styles from "./ProjectItem.module.css"


type ProjectItemProps = {
    project: Project;
    onDelete: (id: string) => void;
    onUpdate: (id: string, changes: ProjectUpdate) => void
}

function ProjectItem({ project, onDelete, onUpdate }: ProjectItemProps) {

    const [update, setUpdate] = useState(false)
    const [draft, setDraft] = useState<EditableProject>({
        name: project.name,
        description: project.description,
    })
  
   

    const handleEdit = () => {
        setDraft({
            name: project.name,
            description: project.description,
        })
    }

  
 
    return (

        <li className={styles.card}>
            {update ? (<div className={styles.editForm}>
                <label className={styles.field}>
                    <span className={styles.label}>Project name</span>

                    <input
                        className={styles.input}
                        value={draft.name}
                        onChange={(e) =>
                            setDraft((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>Description</span>

                    <textarea
                        className={styles.textarea}
                        value={draft.description}
                        onChange={(e) =>
                            setDraft((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                    />
                </label>

                <div className={styles.actions}>
                    <button
                        className={styles.saveButton}
                        onClick={() => {
                            onUpdate(project.id, draft);
                            setUpdate(false);
                        }}
                    >
                        Save Changes
                    </button>

                    <button
                        className={styles.cancelButton}
                        onClick={() => setUpdate(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>) : (<><p className={styles.name}><Link to={`/projects/${project.id}`}>{project.name}</Link></p>
                <p className={styles.description}>{project.description}</p>
                <p className={styles.meta}>{project.id}</p>
                <p className={styles.meta}>{new Date(project.createdAt).toLocaleString("uk-UA")}</p>
                <div className={styles.actions}>
                <button className={styles.deleteButton} onClick={() => onDelete(project.id)}>Delete project</button> 


                    <button className={styles.editButton} onClick={() => { handleEdit(); setUpdate(true) }}>Edit Project</button></div></>)}</li>


    )
}
export default ProjectItem