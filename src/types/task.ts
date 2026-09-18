
export type Status = "todo" | "in-progress" | "done" ;
export type Priority = "high" | "medium" | "low";

export type Task = {
  id: string;
  title: string;
  description: string;
 status: Status;
 priority: Priority;
 createdAt: number;
};

export type EditableTask = Pick<
  Task,
  "title" | "description" | "status" | "priority"
>;


export type TaskUpdate = Partial<EditableTask>;