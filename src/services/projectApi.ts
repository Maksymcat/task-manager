import {
  type Project,
  type ProjectUpdate,
} from "../types/projects";

export async function getProjects(): Promise<Project[]> {
  const response = await fetch("http://localhost:3001/projects");

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();

  return data;
}

export async function getProjectById(id: string): Promise<Project> {
  const response = await fetch(`http://localhost:3001/projects/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();

  return data;
}

export async function createProject(
  project: Omit<Project, "id">,
): Promise<Project> {
  const response = await fetch("http://localhost:3001/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  const data = await response.json();

  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const response = await fetch(`http://localhost:3001/projects/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}

export async function updateProject(
  id: string,
  changes: ProjectUpdate,
): Promise<Project> {
  const response = await fetch(`http://localhost:3001/projects/${id}`, {
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
