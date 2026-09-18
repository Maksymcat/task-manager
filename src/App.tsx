import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import DashboardPage from './pages/DashboardPage/DashboardPage'
import TasksPage from './pages/TasksPage/TasksPage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'
import Layout from './Components/Layout/Layout'
import UsersPage from './pages/UsersPage/UsersPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import TaskDetailsPage from './pages/TaskDetailsPage/TaskDetailsPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
       <Route element={<Layout />}>
  <Route path="/" element={<DashboardPage />} />
  <Route path="/tasks" element={<TasksPage />} />
  <Route path="/projects" element={<ProjectsPage />} />
  <Route path="/users" element={<UsersPage />} />
  <Route path="/settings" element={<SettingsPage />} />
  <Route path="/tasks/:id" element={<TaskDetailsPage />} />
  </Route>

</Routes>
    
    </>
  )
}

export default App
