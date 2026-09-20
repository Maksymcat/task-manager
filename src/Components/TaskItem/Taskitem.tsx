import { useState } from "react";
import { Link } from "react-router-dom";

import type {
  Priority,
  Task,
  TaskUpdate,
  Status,
  EditableTask,
} from "../../types/task";

import styles from "./Taskitem.module.css";

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (id: string, changes: TaskUpdate) => void;
};

function TaskItem({
  task,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [update, setUpdate] = useState(false);

  const [draft, setDraft] = useState<EditableTask>({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
  });

  const handleEdit = () => {
    setDraft({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });

    setUpdate(true);
  };

  return (
    <li className={styles.task}>
      {update ? (
        <div className={styles.editForm}>
          <div className={styles.field}>
            <span className={styles.label}>Title</span>

            <input
              className={styles.editInput}
              value={draft.title}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Description</span>

            <textarea
              className={styles.editTextarea}
              value={draft.description}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Status</span>

            <select
              className={styles.select}
              value={draft.status}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  status: e.target.value as Status,
                }))
              }
            >
              <option value="todo">Todo</option>
              <option value="in-progress">
                In progress
              </option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Priority</span>

            <select
              className={styles.select}
              value={draft.priority}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  priority: e.target.value as Priority,
                }))
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.saveButton}
              onClick={() => {
                onUpdate(task.id, draft);
                setUpdate(false);
              }}
            >
              Save
            </button>

            <button
              className={styles.cancelButton}
              onClick={() => {
                setUpdate(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className={styles.title}>
            <Link to={`/tasks/${task.id}`}>
              {task.title}
            </Link>
          </h2>

          <p className={styles.description}>
            {task.description}
          </p>

          <div className={styles.meta}>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>
                Status
              </span>

              <span className={styles.status}>
                {task.status}
              </span>
            </div>

            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>
                Priority
              </span>

              <span className={styles.priority}>
                {task.priority}
              </span>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.editButton}
              onClick={handleEdit}
            >
              Edit
            </button>

            <button
              className={styles.delete}
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;