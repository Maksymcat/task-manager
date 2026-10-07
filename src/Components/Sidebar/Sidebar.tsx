import { NavLink } from "react-router-dom"
import styles from "../Sidebar/Sidebar.module.css"

function Sidebar() {
    return (

            <aside className={styles.sidebar}>
                <NavLink className={({ isActive }) =>
          isActive ? styles.active : undefined
        } to="/">Dashboard</NavLink>
                <NavLink className={({ isActive }) =>
          isActive ? styles.active : undefined
        } to="/projects">Projects</NavLink>
                <NavLink className={({ isActive }) =>
          isActive ? styles.active : undefined
        } to="/settings">Settings</NavLink>
                <NavLink className={({ isActive }) =>
          isActive ? styles.active : undefined
        } to="/tasks">Tasks</NavLink>
                <NavLink className={({ isActive }) =>
          isActive ? styles.active : undefined
        } to="/users">Users</NavLink>
            </aside>

   
    )
}

export default Sidebar