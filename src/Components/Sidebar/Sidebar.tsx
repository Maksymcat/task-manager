import { NavLink } from "react-router-dom"
import styles from "../Sidebar/Sidebar.module.css"

function Sidebar() {
    return (
        <>
        <aside className={styles.sidebar}>
<NavLink to="/">Dashboard</NavLink>
<NavLink to="/projects">Projects</NavLink>
<NavLink to="/settings">Settings</NavLink>
<NavLink to="/tasks">Tasks</NavLink>
<NavLink to="/users">Users</NavLink>
</aside>

        </>
    )
}

export default Sidebar