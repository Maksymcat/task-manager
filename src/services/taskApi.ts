import type { Task, Status, TaskUpdate } from "../types/task";


export async function getTasks(): Promise<Task[]> {
  const response = await fetch("http://localhost:3001/tasks");

 

  
  if (!response.ok) {

   
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();

  return data;
}

export async function createTask(
  task: Omit<Task, "id">
): Promise<Task> {
  const response = await fetch("http://localhost:3001/tasks", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  const data = await response.json();

  return data;
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`http://localhost:3001/tasks/${id}`,{
    method: "DELETE"
  })
    if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}

export async function updateTaskStatus(
  id: string,
  changes : TaskUpdate
): Promise<Task> {
  const response = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(changes),
  });

  if (!response.ok) {
    
    throw new Error("Failed to update task");
   
  }

  const data = await response.json();

  return data;
}

export async function getTasksById(id:string ): Promise<Task> {

  const response = await fetch(`http://localhost:3001/tasks/${id}`);

  if (!response.ok) {
    if(response.status === 404){
      throw new Error("Page not found")
    }
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();

  return data;
}