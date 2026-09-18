import TaskItem from "../TaskItem/Taskitem"
import type { Task, Status, TaskUpdate } from "../../types/task"
import { useState } from "react"
import TaskForm from "../TaskForm/TaskForm"
import styles from "../TaskList/TaskList.module.css"

export type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, changes: TaskUpdate) => void
};

function TaskList({tasks, onDelete, onUpdate}: TaskListProps) {



    return(
        <>

         <ul className={styles.list}>
            {tasks.map((task) => (
                <TaskItem task={task} onDelete={onDelete} onUpdate={onUpdate} key={task.id}/>
            ))}
         </ul>
        </>
    )
}

export default TaskList