import { useState } from "react"
import type { Task } from "../../types/task";
import type { FormEvent } from "react";
import type { Priority } from "../../types/task";
import type { Status } from "../../types/task";
import styles from "../TaskForm/TaskForm.module.css"
import type { Project } from "../../types/projects";

type TaskFormProps = {
  onCreate: (task: Omit<Task, "id">,) => void;
  projects: Project[],
};

function TaskForm({ onCreate, projects }: TaskFormProps) {

  const [priority, setPriority] = useState<Priority>("medium");
  const [status, setStatus] = useState<Status>("todo");
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [projectId, setProjectId] = useState("")


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newTask: Omit<Task, "id"> = {
      title: title,
      description: description,
      status: status,
      priority: priority,
      createdAt: Date.now(),
      projectId: projectId
    };

    onCreate(newTask)

    setTitle("")
    setDescription("")
    setProjectId("")

  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input className={styles.input} placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select className={styles.select}
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as Priority)
        }
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select className={styles.select}
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as Status)
        }
      >
        <option value="done">done</option>
        <option value="in-progress">in-progress</option>
        <option value="todo">todo</option>
      </select>
      <select className={styles.select}
        value={projectId}
        onChange={(e) =>
          setProjectId(e.target.value)
        }
      >
        <option value={""}>Choose Project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>{project.name}</option>
        ))}
      </select>

      <button className={styles.submit} type="submit">
        Create task
      </button>
    </form>
  )
}

export default TaskForm