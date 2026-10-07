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
  onUpdate: (id: string, changes: TaskUpdate) => Promise<boolean>;
};

function TaskItem({
  task,
  users,
  projects,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
const [isSaving, setIsSaving] = useState(false);
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
const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!draft.title.trim()) {
    return;
  }

  setIsSaving(true);

  const success = await onUpdate(task.id, draft);

  setIsSaving(false);

  if (!success) {
    return;
  }

  setIsEditing(false);
};
  const project = projects.find((project) => project.id === task.projectId);

  const user = users.find((user) => user.id === task.assigneeId);

  return (
    <li className={styles.task}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <label className={styles.field}>
            <span className={styles.label}>Title</span>

            <input
            required
             maxLength={100}
              className={styles.editInput}
              value={draft.title}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Description</span>

            <textarea maxLength={500}
              className={styles.editTextarea}
              value={draft.description}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </label>
          <label className={styles.field}>
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
          </label>
          <label className={styles.field}>
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
          </label>
          <label className={styles.field}>
            <span className={styles.label}>project</span>
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
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </label>{" "}
          <label className={styles.field}>
            <span className={styles.label}>User</span>
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
          </label>
          <div className={styles.actions}>
            <button type="submit"  disabled={isSaving}
              className={styles.saveButton}
             
            >
          {isSaving ? "Saving..." : "Save"}
            </button>

            <button type="button"
              className={styles.cancelButton}
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
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
