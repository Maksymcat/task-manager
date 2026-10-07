import TaskItem from "../TaskItem/Taskitem"
import type { Task, Status, TaskUpdate } from "../../types/task"
import styles from "../TaskList/TaskList.module.css"
import type { User } from "../../types/User";
import type { Project } from "../../types/projects";

export type TaskListProps = {
    tasks: Task[];
    users: User[];
    projects: Project[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, changes: TaskUpdate) => Promise<boolean>
};

function TaskList({ tasks, users, projects, onDelete, onUpdate }: TaskListProps) {



    return (
        <>

            <ul className={styles.list}>
                {tasks.map((task) => (
                    <TaskItem  users={users}
            projects={projects}  task={task} onDelete={onDelete} onUpdate={onUpdate} key={task.id} />
                ))}
            </ul>
        </>
    )
}

export default TaskList