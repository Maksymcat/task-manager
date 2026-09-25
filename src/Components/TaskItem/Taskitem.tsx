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
import type { Project } from "../../types/projects";
import type { User } from "../../types/User";

type TaskItemProps = {
  task: Task;
  users: User[];
  projects: Project[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, changes: TaskUpdate) => void;
};

function TaskItem({
  task,
  users,
  projects,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [draft, setDraft] = useState<EditableTask>({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    assigneeId: task.assigneeId,
    projectId: task.projectId,
  });

  const handleEdit = () => {
    setDraft({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assigneeId: task.assigneeId,
      projectId: task.projectId,
    });

    setIsEditing(true);
  };

  const project = projects.find((project) => project.id === task.projectId);

  const user = users.find((user) => user.id === task.assigneeId);

  return (
    <li className={styles.task}>
      {isEditing ? (
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
              <option value="in-progress">In progress</option>
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
          <div className={styles.field}>
            <span>project</span>
            <select
              className={styles.select}
              value={draft.projectId}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  projectId: e.target.value,
                }))
              }
            >
              {projects.map((project) => (
                <option value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>{" "}
          <div className={styles.field}>
            <span>User</span>
            <select
              className={styles.select}
              value={draft.assigneeId}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  assigneeId: e.target.value,
                }))
              }
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.saveButton}
              onClick={() => {
                onUpdate(task.id, draft);
                setIsEditing(false);
              }}
            >
              Save
            </button>

            <button
              className={styles.cancelButton}
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className={styles.title}>
            <Link to={`/tasks/${task.id}`}>{task.title}</Link>
          </h2>

          <p className={styles.description}>{task.description}</p>

          <div className={styles.meta}>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Status</span>

              <span className={styles.status}>{task.status}</span>
            </div>

            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Priority</span>

              <span className={styles.priority}>{task.priority}</span>
            </div>

            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>User</span>

              <span className={styles.priority}>
                {user?.name ?? "Unassigned"}
              </span>
            </div>

            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Project</span>

              <span className={styles.priority}>
                {project?.name ?? "WithoutProject"}
              </span>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.editButton} onClick={handleEdit}>
              Edit
            </button>

            <button className={styles.delete} onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;
