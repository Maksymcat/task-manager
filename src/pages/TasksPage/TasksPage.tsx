import TaskList from "../../Components/TaskList/TaskList"
import { getTasks, updateTaskStatus } from "../../services/taskApi"
import type { Task, TaskUpdate } from "../../types/task"
import { createTask, deleteTask } from "../../services/taskApi"
import { useState, useEffect } from "react"
import TaskForm from "../../Components/TaskForm/TaskForm"
import styles from "../TasksPage/TasksPage.module.css"
import type { Status } from "../../types/task"

function TasksPage() {

       const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const handleCreateTask = async (
  newTask: Omit<Task, "id">
) => {
  try {
    const createdTask = await createTask(newTask);

    setTasks((prevTasks) => [
      ...prevTasks,
      createdTask,
    ]);
  } catch {
    setError("Не вдалося створити задачу");
  }
};

    useEffect(() => {
        async function loadTasks() {
            try{
            const data = await getTasks();
            setTasks(data)
            

            } catch (error) {
                setError("Не вдалося завантажити данні")
            } finally {
                setLoading(false)
            }
        }
        loadTasks()
    },  [])

    const handleDelete = async (id: string) => {
  try {
    await deleteTask(id);

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  } catch {
    setError("Не вдалося видалити задачу");
  }
};
if (loading) {
  return <p>Loading...</p>;
}
if (error) {
  return <p>{error}</p>;
}
const  handleUpdate = async (id: string, changes: TaskUpdate) =>  {
  try{
    const updatedTask = await updateTaskStatus(id, changes);

    setTasks((prevTasks) => 
    prevTasks.map((task) => 
    task.id === id ? updatedTask : task))
  } catch {
    setError("Не вдалося оновити задачу");
  }
  
}

    return(
        <>
        <div className={styles.page}>
             <h1 className={styles.title}>Tasks</h1>
           <TaskForm onCreate={handleCreateTask} />
    <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
   
     
        </div>
        </>
    )
}

export default TasksPage