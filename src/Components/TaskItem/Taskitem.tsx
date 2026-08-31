import {  useState } from "react"
import type { Priority, Task, TaskUpdate } from "../../types/task"
import styles from "../TaskItem/Taskitem.module.css"
import type { Status, EditableTask } from "../../types/task"

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (id: string, changes: TaskUpdate) => void
};

function TaskItem({task, onDelete, onUpdate}: TaskItemProps  ) {

    const [update, setUpdate] = useState(false)
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
  })}
    return(
        <>
<li className={styles.task}>
   
    <div className={styles.meta}>
    {update ? (<><input
  value={draft.title}
  onChange={(e) =>
    setDraft((prev) => ({
      ...prev,
      title: e.target.value,
    }))
  }
/> <input
  value={draft.description}
  onChange={(e) =>
    setDraft((prev) => ({
      ...prev,
      description: e.target.value,
    }))
  }
/> <select className={styles.select}
  value={draft.status}
  onChange={(e) => {
    setDraft((prev) => ({
      ...prev, 
      status: e.target.value as Status,
    }))


  }
  }
>
  <option value="done">done</option>
  <option value="in-progress">in-progress</option>
  <option value="todo">todo</option>
</select>
<select className={styles.select}
  value={draft.priority}
  onChange={(e) => {
    setDraft((prev) => ({
      ...prev, 
      priority: e.target.value as Priority,
    }))


  }
  }
>
  <option value="low">low</option>
  <option value="medium">medium</option>
  <option value="high">high</option>
</select><button
  onClick={() => {
    onUpdate(task.id, draft);
    setUpdate(false);
  }}
>
  Save
</button></>) : (<> <h2 className={styles.title}>{task.title}</h2>
    <p className={styles.description}>Desc : {task.description}</p><p>Status : {task.status}<button onClick={() => {handleEdit(); setUpdate(true)} }>redact</button></p></>)}
    <p>Priority : {task.priority}</p>
    </div>
    <button className={styles.delete} onClick={() => onDelete(task.id)}>delete task</button>

</li>

        </>
    )
}

export default TaskItem