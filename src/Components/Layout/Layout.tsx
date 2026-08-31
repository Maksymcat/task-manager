import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import TaskList from "../TaskList/TaskList";
import TasksPage from "../../pages/TasksPage/TasksPage";
import styles from "../Layout/Layout.module.css"

function Layout() {
  return (
    <>
    <div className={styles.layout}>
   <Sidebar />
      <main className={styles.content}>

        <Outlet />
      </main>
      </div>
    </>
  );
}

export default Layout