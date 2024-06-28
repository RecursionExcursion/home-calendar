import { ObjectId } from "mongodb";

export type Tasks = {
  _id: ObjectId;
  userId: string;
  taskList: Task[];
};

export type Task = {
  id: string;
  description: string;
  date: string;
  allDay: boolean;
  priority: number;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  updatedById: string | null;
  assignedToId: string | null;
  expiration: string | null;
};

export enum TaskStatus {
  Pending = "Pending",
  InProgress = "In Progress",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export type NewTask = {
  description: string;
  date: string;
  allDay: boolean;
  createdById: string;
  assignedToId: string | null;
  expiration: string | null;
  priortiy: number;
};
