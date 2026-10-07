import styles from "./Stats.module.css";

type StatsProps = {
  tasks: number;
  users: number;
  projects: number;
  todoTasks: number;
  inProgressTasks: number;
  doneTasks: number;
  progress: number;
};

function Stats({
  tasks,
  users,
  projects,
  todoTasks,
  inProgressTasks,
  doneTasks,
  progress,
}: StatsProps) {
  return (
    <dl className={styles.grid}>
      <div className={styles.card}>
        <dt className={styles.label}>
          Total tasks
        </dt>

        <dd className={styles.value}>
          {tasks}
        </dd>
      </div>

      <div className={styles.card}>
        <dt className={styles.label}>
          To do
        </dt>

        <dd className={styles.value}>
          {todoTasks}
        </dd>
      </div>

      <div className={styles.card}>
        <dt className={styles.label}>
          In progress
        </dt>

        <dd className={styles.value}>
          {inProgressTasks}
        </dd>
      </div>

      <div className={styles.card}>
        <dt className={styles.label}>
          Done
        </dt>

        <dd className={styles.value}>
          {doneTasks}
        </dd>
      </div>

      <div className={styles.card}>
        <dt className={styles.label}>
          Projects
        </dt>

        <dd className={styles.value}>
          {projects}
        </dd>
      </div>

      <div className={styles.card}>
        <dt className={styles.label}>
          Users
        </dt>

        <dd className={styles.value}>
          {users}
        </dd>
      </div>

      <div
        className={`${styles.card} ${styles.progressCard}`}
      >
        <div className={styles.progressHeader}>
          <dt className={styles.label}>
            Completion
          </dt>

          <dd className={styles.progressValue}>
            {progress}%
          </dd>
        </div>

        <div
          className={styles.progressTrack}
          aria-hidden="true"
        >
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </dl>
  );
}

export default Stats;