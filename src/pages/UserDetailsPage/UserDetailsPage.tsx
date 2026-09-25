import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import type { Task } from "../../types/task";
import type { User } from "../../types/User";

import { getTasksByAssigneeId } from "../../services/taskApi";
import { getUserById } from "../../services/usersApi";

import styles from "./UserDetailsPage.module.css";

function UserDetailsPage() {
    const [tasksByUserId, setTasksByUserId] = useState<Task[]>([]);
    const [userById, setUserById] = useState<User | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        async function loadPage() {
            if (!id) {
                setError("User id not found");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const [tasks, user] = await Promise.all([
                    getTasksByAssigneeId(id),
                    getUserById(id),
                ]);

                setTasksByUserId(tasks);
                setUserById(user);
            } catch {
                setError("Can't load user or tasks");
            } finally {
                setLoading(false);
            }
        }

        loadPage();
    }, [id]);

    if (loading) {
        return <p className={styles.loading}>Loading...</p>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!userById) {
        return (
            <div className={styles.error}>
                User not found
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <Link
                className={styles.back}
                to="/users"
            >
                ← Back to users
            </Link>

            <div className={styles.userCard}>
                <div className={styles.avatar}>
                    {userById.name.charAt(0).toUpperCase()}
                </div>

                <div>
                    <h1 className={styles.name}>
                        {userById.name}
                    </h1>

                    <p className={styles.email}>
                        {userById.email}
                    </p>

                    <span className={styles.role}>
                        {userById.role}
                    </span>
                </div>
            </div>

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <span className={styles.statLabel}>
                        Assigned tasks
                    </span>

                    <span className={styles.statValue}>
                        {tasksByUserId.length}
                    </span>
                </div>

                <div className={styles.stat}>
                    <span className={styles.statLabel}>
                        Completed
                    </span>

                    <span className={styles.statValue}>
                        {
                            tasksByUserId.filter(
                                (task) => task.status === "done"
                            ).length
                        }
                    </span>
                </div>
            </div>

            <h2 className={styles.tasksTitle}>
                Assigned tasks
            </h2>

            {tasksByUserId.length === 0 ? (
                <div className={styles.empty}>
                    No tasks assigned to this user
                </div>
            ) : (
                <ul className={styles.taskList}>
                    {tasksByUserId.map((task) => (
                        <li
                            className={styles.task}
                            key={task.id}
                        >
                            <Link to={`/tasks/${task.id}`}>
                                {task.title}
                            </Link>

                            <span className={styles.taskStatus}>
                                {task.status}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserDetailsPage;