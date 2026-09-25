import { useParams } from "react-router-dom";
import { getTasksById } from "../../services/taskApi";
import { useState, useEffect } from "react";
import type { Task } from "../../types/task";
import { Link } from "react-router-dom";
import styles from "./TaskDetailsPage.module.css"
import { getUserById } from "../../services/usersApi";
import { getProjectById } from "../../services/projectApi";
import { type User } from "../../types/User";
import { type Project } from "../../types/projects";

function TaskDetailsPage() {

  const [taskById, setTaskById] = useState<Task | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const { id } = useParams();

  useEffect(() => {



    async function loadTask() {
      if (!id) {
        return
      }
      
      setLoading(true)
      try {
        const currentTask = await getTasksById(id);
        setTaskById(currentTask);
    
        const [user, project] = await Promise.all([
          getUserById(currentTask.assigneeId),
          getProjectById(currentTask.projectId)
        ])
        setUser(user)
        setProject(project)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        }
      } finally {

        setLoading(false)
      }



    }

    loadTask();




  }, [id]);

  console.log(user, project)
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <div>{error}</div>
  }
  if (!taskById) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return <p>user...</p>;
  }
  if (!project) {
    return <p>Project...</p>;
  }


  return (
    <>
      <button><Link to={`/tasks/`}>Back to tasks</Link></button>
      <div className={styles.card}>
        <h1 className={styles.title}>{taskById.title}</h1>
        <div className={styles.field}><span className={styles.label}>Description</span><p className={styles.value}>{taskById.description}</p></div>
        <div className={styles.field}><span className={styles.label}>ID</span><p className={styles.value}>{taskById.id}</p></div>
        <div className={styles.field}><span className={styles.label}>Status</span><p className={styles.value}>{taskById.status}</p></div>
         <div className={styles.field}><span className={styles.label}>Project</span><p className={styles.value}>{project.name}</p></div>
        <div className={styles.field}><span className={styles.label}>User</span><p className={styles.value}>{user.name}</p></div>
        <div className={styles.field}><span className={styles.label}>Priority</span><p className={styles.value}>{taskById.priority}</p></div>
        <div>{new Date(taskById.createdAt).toLocaleString("uk-UA")}</div>
      </div>
    </>
  )
}

export default TaskDetailsPage