
import type { Task,TaskUpdate } from "../../types/task"
import TaskList from "../TaskList/TaskList";
import styles from "../KanbanBoard/KanbanBoard.module.css"
import type { Project } from "../../types/projects";
import type { User } from "../../types/User";

type KanbanProps = {
  tasks: Task[];
  users: User[];
  projects: Project[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, changes: TaskUpdate) => Promise<boolean>
};


function KanbanBoard({ tasks, users, projects, onUpdate, onDelete }: KanbanProps) {

  const todoTasks = tasks.filter((task) => task.status === "todo")
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress")
  const doneTasks = tasks.filter((task) => task.status === "done")



  return (
    <>
      <div className={styles.board}>
        <div className={styles.column}>
          <h2 className={styles.columnTitle}>Todo</h2>

          <TaskList
            users={users}
            projects={projects}
            tasks={todoTasks}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </div>

        <div className={styles.column}>
          <h2 className={styles.columnTitle}>In Progress</h2>

          <TaskList
           users={users}
            projects={projects}
            tasks={inProgressTasks}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </div>

        <div className={styles.column}>
          <h2 className={styles.columnTitle}>Done</h2>

          <TaskList
           users={users}
            projects={projects}
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