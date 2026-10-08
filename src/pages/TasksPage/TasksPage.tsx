
import { getTasks, updateTaskStatus } from "../../services/taskApi";
import { type Priority, type Task, type TaskUpdate } from "../../types/task";
import { createTask, deleteTask } from "../../services/taskApi";
import { useState } from "react";
import TaskForm from "../../Components/TaskForm/TaskForm";
import styles from "../TasksPage/TasksPage.module.css";
import type { Status } from "../../types/task";
import KanbanBoard from "../../Components/KanbanBoard/KanbanBoard";
import { getProjects } from "../../services/projectApi";

import { getUsers } from "../../services/usersApi";
import { useQuery,  useMutation } from "@tanstack/react-query";

type SortValue = "" | "New" | "Old" | "Alphabet";

function TasksPage() {
  const [sortValue, setSortValue] = useState<SortValue>("");
  const [statusFilter, setStatusFilter] = useState<Status | "">("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "">("");
  const [searchValue, setSearchValue] = useState<string>("");

const [mutationError, setMutationError] = useState<string | null>(null);


  const createTaskMutation = useMutation({
  mutationFn: createTask,
});
  const {
  data: tasks = [],
  isPending: tasksLoading,
  isError: tasksError,
  refetch: refetchTasks,
} = useQuery({
  queryKey: ["tasks"],
  queryFn: getTasks,
});
  const {
  data: users = [],
  isPending: usersLoading,
  isError: usersError,
} = useQuery({
  queryKey: ["users"],
  queryFn: getUsers,
});
  const {
  data: projects = [],
  isPending: projectsLoading,
  isError: projectsError,
} = useQuery({
  queryKey: ["projects"],
  queryFn: getProjects,
});

  const handleCreateTask = async (newTask: Omit<Task, "id">): Promise<boolean> => {
  
    setMutationError(null)
    try {
 
    await createTaskMutation.mutateAsync(newTask);

    await refetchTasks()
      return true
    } catch {
      setMutationError("cant update task");

      return false
    }finally{
   
    }
  };

 

  const handleDelete = async (id: string) => {
      setMutationError(null);
    try {
      await deleteTask(id);


    await refetchTasks();
    } catch {
      setMutationError("cant update task");
    }
  };
 

  const handleUpdate = async (id: string, changes: TaskUpdate): Promise<boolean> => {
      setMutationError(null);
    try {
      await updateTaskStatus(id, changes);

    await refetchTasks();
      return true
    } catch {
      setMutationError("cant update task");
      return false
    }
  };
  let filteredTasks = tasks.filter(
    (task) =>
      searchValue === "" ||
      task.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  let statusFiltered = filteredTasks.filter(
    (task) => statusFilter === "" || task.status === statusFilter,
  );
  const priorityFiltered = statusFiltered.filter(
    (task) => priorityFilter === "" || task.priority === priorityFilter,
  );
  const sortedTasks = [...priorityFiltered].sort((a, b) => {
    if (sortValue === "Old") {
      return a.createdAt - b.createdAt;
    }
    if (sortValue === "New") {
      return b.createdAt - a.createdAt;
    }
    if (sortValue === "Alphabet") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
  if(tasksLoading  || projectsLoading || usersLoading){
    return <div>Loading...</div>
  }
  if(tasksError  || projectsError || usersError){
    return <div>failed to load pagediv</div>
  }
  return (
    <>
      <div className={styles.filters}>
        <label>
          sort By
          <select
            className={styles.sortSelect}
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value as SortValue)}
          >
            <option value="">Select sort</option>
            <option value="New">Newest</option>
            <option value="Old">Oldest</option>
            <option value="Alphabet">A-Z</option>
          </select>
        </label>
        <div>
          {" "}
          <span className={styles.filterLabel}>Status</span>
          <button aria-pressed={statusFilter === ""}
            className={styles.filterButton}
            onClick={() => setStatusFilter("")}
          >
            all
          </button>
          <button aria-pressed={statusFilter === "todo"}
            className={
              statusFilter === "todo"
                ? `${styles.filterButton} ${styles.active}`
                : styles.filterButton
            }
            onClick={() => setStatusFilter("todo")}
          >
            todo
          </button>
          <button  aria-pressed={statusFilter === "in-progress"}
            className={
              statusFilter === "in-progress"
                ? `${styles.filterButton} ${styles.active}`
                : styles.filterButton
            }
            onClick={() => setStatusFilter("in-progress")}
          >
            in-progress
          </button>
          <button aria-pressed={statusFilter === "done"}
            className={
              statusFilter === "done"
                ? `${styles.filterButton} ${styles.active}`
                : styles.filterButton
            }
            onClick={() => setStatusFilter("done")}
          >
            done{" "}
          </button>
        </div>
        <div  className={styles.filterGroup}>
          <span className={styles.filterLabel}>Priority</span>

          <button aria-pressed={priorityFilter === ""}
            className={styles.filterButton}
            onClick={() => setPriorityFilter("")}
          >
            all
          </button>
          <button aria-pressed={priorityFilter === "high"}
            className={styles.filterButton}
            onClick={() => setPriorityFilter("high")}
          >
            high
          </button>
          <button aria-pressed={priorityFilter === "medium"}
            className={styles.filterButton}
            onClick={() => setPriorityFilter("medium")}
          >
            medium
          </button>
          <button aria-pressed={priorityFilter === "low"}
            className={styles.filterButton}
            onClick={() => setPriorityFilter("low")}
          >
            low{" "}
          </button>
        </div>
        <label>
          Find task{" "}
          <input
            className={styles.search}
            type="text"
            value={searchValue}
            placeholder="Find"
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
        </label>
      </div>
      <div className={styles.page}>
        <h1 className={styles.title}>Tasks</h1>
   {mutationError && (
    <div role="alert" className={styles.error}>
      {mutationError}
    </div>
  )}
        <TaskForm  isCreating={createTaskMutation.isPending} users={users} projects={projects} onCreate={handleCreateTask} />
        <KanbanBoard
          projects={projects}
          users={users}
          tasks={sortedTasks}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default TasksPage;
