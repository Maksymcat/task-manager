import { Link } from "react-router-dom";

import type { Task } from "../../types/task";

import styles from "./RecentTasks.module.css";

type RecentTasksProps = {
  tasks: Task[];
};

function RecentTasks({
  tasks,
}: RecentTasksProps) {
  if (tasks.length === 0) {
    return (
      <p className={styles.empty}>
        No tasks yet
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li
          key={task.id}
          className={styles.item}
        >
          <div className={styles.content}>
            <Link
              className={styles.title}
              to={`/tasks/${task.id}`}
            >
              {task.title}
            </Link>

            <span className={styles.date}>
              {new Date(
                task.createdAt,
              ).toLocaleDateString("uk-UA")}
            </span>
          </div>

          <div className={styles.meta}>
            <span className={styles.status}>
              {task.status}
            </span>

            <span className={styles.priority}>
              {task.priority}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default RecentTasks;