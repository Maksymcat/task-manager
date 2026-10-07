import { useEffect, useState } from "react";

import { getTasks } from "../../services/taskApi";
import { getUsers } from "../../services/usersApi";
import { getProjects } from "../../services/projectApi";

import type { Task } from "../../types/task";
import type { Project } from "../../types/projects";
import type { User } from "../../types/User";

import RecentTasks from "../../Components/RecentTasks/RecentTasks";
import RecentProjects from "../../Components/RecentProjects/RecentProjects";
import Stats from "../../Components/Stats/Stats";

import styles from "./DashboardPage.module.css";

function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPage() {
      try {
        const [tasks, projects, users] = await Promise.all([
          getTasks(),
          getProjects(),
          getUsers(),
        ]);

        setTasks(tasks);
        setProjects(projects);
        setUsers(users);
      } catch {
        setError("Не вдалося завантажити Dashboard");
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, []);

  const todoTasks = tasks.filter(
    (task) => task.status === "todo",
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress",
  );

  const doneTasks = tasks.filter(
    (task) => task.status === "done",
  );

  const recentTasks = [...tasks]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  const recentProjects = [...projects]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  const progress =
    tasks.length === 0
      ? 0
      : (doneTasks.length / tasks.length) * 100;

  if (loading) {
    return (
      <main className={styles.page}>
        <p className={styles.loading}>
          Loading dashboard...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.error}>
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            Overview
          </p>

          <h1 className={styles.title}>
            Dashboard
          </h1>

          <p className={styles.subtitle}>
            Track tasks, projects and team progress.
          </p>
        </div>
      </header>

      <section
        className={styles.section}
        aria-labelledby="stats-heading"
      >
        <h2
          id="stats-heading"
          className={styles.visuallyHidden}
        >
          Workspace statistics
        </h2>

        <Stats
          tasks={tasks.length}
          todoTasks={todoTasks.length}
          inProgressTasks={inProgressTasks.length}
          doneTasks={doneTasks.length}
          progress={Math.round(progress)}
          projects={projects.length}
          users={users.length}
        />
      </section>

      <div className={styles.dashboardGrid}>
        <section
          className={styles.panel}
          aria-labelledby="recent-tasks-heading"
        >
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelLabel}>
                Activity
              </p>

              <h2
                id="recent-tasks-heading"
                className={styles.panelTitle}
              >
                Recent tasks
              </h2>
            </div>

            <span className={styles.counter}>
              {recentTasks.length}
            </span>
          </div>

          <RecentTasks tasks={recentTasks} />
        </section>

        <section
          className={styles.panel}
          aria-labelledby="recent-projects-heading"
        >
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelLabel}>
                Workspace
              </p>

              <h2
                id="recent-projects-heading"
                className={styles.panelTitle}
              >
                Recent projects
              </h2>
            </div>

            <span className={styles.counter}>
              {recentProjects.length}
            </span>
          </div>

          <RecentProjects
            projects={recentProjects}
          />
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;