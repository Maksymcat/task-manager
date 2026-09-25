import { useState } from "react";
import type { Task } from "../../types/task";
import type { FormEvent } from "react";
import type { Priority } from "../../types/task";
import type { Status } from "../../types/task";
import styles from "../TaskForm/TaskForm.module.css";
import type { Project } from "../../types/projects";
import type { User } from "../../types/User";

type TaskFormProps = {
  onCreate: (task: Omit<Task, "id">) => void;
  projects: Project[];
  users: User[];
};

function TaskForm({ onCreate, projects, users }: TaskFormProps) {
  const [priority, setPriority] = useState<Priority>("medium");
  const [status, setStatus] = useState<Status>("todo");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTask: Omit<Task, "id"> = {
      title: title,
      description: description,
      status: status,
      priority: priority,
      createdAt: Date.now(),
      projectId: projectId,
      assigneeId: userId,
    };

    onCreate(newTask);

    setTitle("");
    setDescription("");
    setProjectId("");
    setUserId("");
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className={styles.select}
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        className={styles.select}
        value={status}
        onChange={(e) => setStatus(e.target.value as Status)}
      >
        <option value="done">done</option>
        <option value="in-progress">in-progress</option>
        <option value="todo">todo</option>
      </select>
      <select
        className={styles.select}
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      >
        <option value={""}>Choose Project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      <select
        className={styles.select}
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      >
        <option value={""}>Choose User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <button className={styles.submit} type="submit">
        Create task
      </button>
    </form>
  );
}

export default TaskForm;
