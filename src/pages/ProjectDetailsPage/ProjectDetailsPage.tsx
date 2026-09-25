import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Project } from "../../types/projects";
import { getProjectById } from "../../services/projectApi";
import { getTasksByProjectId } from "../../services/taskApi";
import { type Task } from "../../types/task";
import styles from "./ProjectDetailsPage.module.css";

type SortValue = "" | "New" | "Old" | "Alphabet";

function ProjectDetailsPage() {
  const { id } = useParams();

  const [projectById, setProjectById] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tasksByProjectId, setTasksByProjectId] = useState<Task[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState<SortValue>("");

  useEffect(() => {
    async function loadProjectData() {
      if (!id) {
        return;
      }
      setError(null);
      setLoading(true);
      try {
        const [project, tasks] = await Promise.all([
          getProjectById(id),
          getTasksByProjectId(id),
        ]);

        setProjectById(project);
        setTasksByProjectId(tasks);
      } catch {
        setError("error");
      } finally {
        setLoading(false);
      }
    }
    loadProjectData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  if (!projectById) {
    return <div>Loading...</div>;
  }

  let filteredTasks = tasksByProjectId.filter(
    (task) =>
      searchValue === "" ||
      task.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
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

  const doneTasksCount = tasksByProjectId.filter(
    (task) => task.status === "done",
  ).length;
  const progress =
    tasksByProjectId.length === 0
      ? 0
      : (doneTasksCount / tasksByProjectId.length) * 100;
  return (
    <div className={styles.page}>
      <Link className={styles.back} to="/projects">
        ← Back to projects
      </Link>

      <div className={styles.projectCard}>
        <h1 className={styles.title}>{projectById.name}</h1>

        <p className={styles.description}>{projectById.description}</p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Tasks</span>

            <span className={styles.statValue}>{tasksByProjectId.length}</span>
          </div>

          <div className={styles.stat}>
            <span className={styles.statLabel}>Completed</span>

            <span className={styles.statValue}>{doneTasksCount}</span>
          </div>

          <div className={styles.stat}>
            <span className={styles.statLabel}>Progress</span>

            <span className={styles.statValue}>{Math.round(progress)}%</span>
          </div>
        </div>

        <p className={styles.meta}>ID: {projectById.id}</p>

        <p className={styles.meta}>
          Created: {new Date(projectById.createdAt).toLocaleString("uk-UA")}
        </p>
      </div>

      <div className={styles.controls}>
        <input
          className={styles.input}
          type="text"
          value={searchValue}
          placeholder="Find task..."
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <select
          className={styles.select}
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value as SortValue)}
        >
          <option value="">Select sort</option>
          <option value="New">Newest</option>
          <option value="Old">Oldest</option>
          <option value="Alphabet">A-Z</option>
        </select>
      </div>

      <h2 className={styles.tasksTitle}>Project tasks</h2>

      {sortedTasks.length === 0 ? (
        <div className={styles.empty}>No tasks found</div>
      ) : (
        <ul className={styles.taskList}>
          {sortedTasks.map((task) => (
            <li className={styles.task} key={task.id}>
              <Link to={`/tasks/${task.id}`}>{task.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectDetailsPage;
