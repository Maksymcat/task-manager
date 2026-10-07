import { Link } from "react-router-dom";

import type { Project } from "../../types/projects";

import styles from "./RecentProjects.module.css";

type RecentProjectsProps = {
  projects: Project[];
};

function RecentProjects({
  projects,
}: RecentProjectsProps) {
  if (projects.length === 0) {
    return (
      <p className={styles.empty}>
        No projects yet
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {projects.map((project) => (
        <li
          key={project.id}
          className={styles.item}
        >
          <Link
            className={styles.link}
            to={`/projects/${project.id}`}
          >
            <span className={styles.icon}>
              P
            </span>

            <span className={styles.content}>
              <span className={styles.name}>
                {project.name}
              </span>

              <span className={styles.date}>
                {new Date(
                  project.createdAt,
                ).toLocaleDateString("uk-UA")}
              </span>
            </span>

            <span className={styles.arrow}>
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default RecentProjects;