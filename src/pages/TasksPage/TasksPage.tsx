import TaskList from "../../Components/TaskList/TaskList"
import { getTasks, updateTaskStatus } from "../../services/taskApi"
import { type Priority, type Task, type TaskUpdate } from "../../types/task"
import { createTask, deleteTask } from "../../services/taskApi"
import { useState, useEffect } from "react"
import TaskForm from "../../Components/TaskForm/TaskForm"
import styles from "../TasksPage/TasksPage.module.css"
import type { Status } from "../../types/task"
import KanbanBoard from "../../Components/KanbanBoard/KanbanBoard"

type SortValue = "" | "New" | "Old" | "Alphabet";

function TasksPage() {

    const [sortValue, setSortValue] = useState<SortValue>("")
    const [statusFilter, setStatusFilter] = useState<Status | "">("")
    const [priorityFilter, setPriorityFilter] = useState<Priority | "">("")
    const [searchValue, setSearchValue] = useState<string>('')
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
let filteredTasks = tasks.filter((task) => searchValue === '' || task.title.toLowerCase().includes(searchValue.toLowerCase()))

let statusFiltered = filteredTasks.filter((task) => statusFilter === "" || task.status === statusFilter)
const priorityFiltered = statusFiltered.filter((task) => priorityFilter === "" || task.priority === priorityFilter  )
const sortedTasks = [...priorityFiltered].sort((a,b) => {
  if(sortValue === "Old"){
  return a.createdAt - b.createdAt
  }
    if(sortValue === "New"){
  return b.createdAt - a.createdAt
  }
    if(sortValue === "Alphabet"){
  return a.title.localeCompare(b.title)
  }
  return 0
  

  
} )
    return(
        <>
        <div className={styles.filters}>
          <div>sort By 
            <select
  value={sortValue}
  onChange={(e) => setSortValue(e.target.value as SortValue)}
>
  <option value="">Select sort</option>
  <option value="New">Newest</option>
  <option value="Old">Oldest</option>
  <option value="Alphabet">A-Z</option>
</select>
          </div>
        <div> <span className={styles.filterLabel}>Status</span>
          <button  className={styles.filterButton} onClick={() => setStatusFilter('')}>all</button>
          <button  className={
  statusFilter === "todo"
    ? `${styles.filterButton} ${styles.active}`
    : styles.filterButton
} onClick={() => setStatusFilter("todo")}>todo</button>
          <button className={
  statusFilter === "in-progress"
    ? `${styles.filterButton} ${styles.active}`
    : styles.filterButton
} onClick={() => setStatusFilter("in-progress")}>in-progress</button>
          <button className={
  statusFilter === "done"
    ? `${styles.filterButton} ${styles.active}`
    : styles.filterButton
} onClick={() => setStatusFilter("done")}>done </button>
        </div>
        <div className={styles.filterGroup}><span className={styles.filterLabel}>Priority</span>

          <button className={styles.filterButton} onClick={() => setPriorityFilter('')}>all</button>
          <button className={styles.filterButton} onClick={() => setPriorityFilter("high")}>high</button>
          <button className={styles.filterButton} onClick={() => setPriorityFilter("medium")}>medium</button>
          <button className={styles.filterButton} onClick={() => setPriorityFilter("low")}>low </button>
        </div>
        <div>Find task <input  className={styles.search} type="text" value={searchValue} placeholder="Find" onChange={(e) => setSearchValue(e.target.value)}></input></div>
        </div>
        <div className={styles.page}>
             <h1 className={styles.title}>Tasks</h1>
           <TaskForm onCreate={handleCreateTask} />
           <KanbanBoard tasks={sortedTasks} onUpdate={handleUpdate} onDelete={handleDelete}/>
   
   
     
        </div>
        </>
    )
}

export default TasksPage