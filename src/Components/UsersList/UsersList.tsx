import type { User } from "../../types/User";
import UserItem from "../UserItem/UserItem";
import styles from "./UsersList.module.css";

export type UsersListProps = {
  users: User[];
};

function UsersList({ users }: UsersListProps) {
  if (users.length === 0) {
    return <div className={styles.empty}>No users found</div>;
  }

  return (
    <ul className={styles.list}>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}

export default UsersList;
