import { Link } from "react-router-dom";
import type { User } from "../../types/User";
import styles from "./UserItem.module.css";

export type UserItemProps = {
  user: User;
};

function UserItem({ user }: UserItemProps) {
  return (
    <li className={styles.card}>
      <div className={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>

      <div className={styles.content}>
        <h2 className={styles.name}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </h2>

        <p className={styles.email}>{user.email}</p>

        <div className={styles.meta}>
          <span className={styles.role}>{user.role}</span>

          <span className={styles.id}>ID: {user.id}</span>
        </div>
      </div>
    </li>
  );
}

export default UserItem;
