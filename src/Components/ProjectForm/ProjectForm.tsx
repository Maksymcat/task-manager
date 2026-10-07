import { useState, } from "react";
import { type Project } from "../../types/projects";
import { type FormEvent } from "react";
import styles from "./ProjectForm.module.css"

type ProjectFormProps = {
    onCreate: (project: Omit<Project, "id">) => Promise<boolean>;
};


function ProjectForm({ onCreate }: ProjectFormProps) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!name.trim()) {
            return console.log("cant create without name ")
        }
        const newProject: Omit<Project, "id"> = {
            name: name,
            description: description,
            createdAt: Date.now()
        };
        const success = await onCreate(newProject)
     if(!success){
        return
     }
        setName("")
        setDescription("")
    }
    return (

        <form className={styles.form} onSubmit={handleSubmit}>
            <input   maxLength={100} required className={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="name" type="text"></input>
            <input   className={styles.input} value={description} placeholder="desc" onChange={(e) => setDescription(e.target.value)} type="text"></input>
            <button className={styles.button} type="submit">Create project</button>
        </form>

    )
}

export default ProjectForm