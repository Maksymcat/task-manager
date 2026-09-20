export type Project = {
    "id": string
    "name": string
    "description": string
    "createdAt": number
}
export type EditableProject = Pick<
  Project,
  "name" | "description"
>;

export type ProjectUpdate = Partial<EditableProject>;