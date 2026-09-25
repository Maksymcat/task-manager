import type { User } from "../types/User";

export async function getUsers(): Promise<User[]> {
  const response = await fetch("http://localhost:3001/users");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();

  return data;
}

export async function getUserById(id: string): Promise<User> {
  const response = await fetch(`http://localhost:3001/users/${id}`);
  if(!response.ok){
    throw new Error("Failed to fetch user by id")
  }

  const data = await response.json();
  
  return data;
}
