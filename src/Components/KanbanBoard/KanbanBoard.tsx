
import type { Task, Status, TaskUpdate } from "../../types/task"
import TaskList from "../TaskList/TaskList";
import styles from "../KanbanBoard/KanbanBoard.module.css"

type KanbanProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, changes: TaskUpdate) => void
};


function KanbanBoard({tasks, onUpdate, onDelete}: KanbanProps)  {

    const todoTasks = tasks.filter((task) => task.status === "todo")
    const inProgressTasks = tasks.filter((task) => task.status === "in-progress")
    const doneTasks = tasks.filter((task) => task.status === "done")
    


return(
    <>
<div className={styles.board}>
  <div className={styles.column}>
    <h2 className={styles.columnTitle}>Todo</h2>

    <TaskList
      tasks={todoTasks}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  </div>

  <div className={styles.column}>
    <h2 className={styles.columnTitle}>In Progress</h2>

    <TaskList
      tasks={inProgressTasks}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  </div>

  <div className={styles.column}>
    <h2 className={styles.columnTitle}>Done</h2>

    <TaskList
      tasks={doneTasks}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  </div>
</div>
    </> 
)
}


export default KanbanBoard