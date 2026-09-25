import { useEffect, useState } from "react";
import { type User } from "../../types/User";
import { getUsers } from "../../services/usersApi";
import UsersList from "../../Components/UsersList/UsersList";
import styles from "./UsersPage.module.css"

function UsersPage() {

  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  async function loadUsers(){
    try{
      const data = await getUsers()

      setUsers(data)
  

    }catch(error){
      setError("loadUsers is failed")
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  loadUsers()
  }, [])

    console.log(users)
  
  if (loading) {
    return <p>Loading...</p>
  }
   if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Users</h1>

        <span className={styles.count}>
          {users.length} users
        </span>
      </div>

      <UsersList users={users} />
    </div>
  );
}

export default UsersPage;
