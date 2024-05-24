import { ObjectId } from "mongodb";

export type Task = {
  _id: ObjectId;
  task: string;
  date: string;
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
  task: string;
  date: string;
  createdById: string;
  assignedToId: string | null;
  expiration: string | null;
  priortiy: number;
};

export const TaskFactory = (newTask: NewTask): Task => {
  return {
    _id: new ObjectId(),
    task: newTask.task,
    date: newTask.date,
    priority: newTask.priortiy,
    status: TaskStatus.Pending,
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    createdById: newTask.createdById,
    updatedById: null,
    assignedToId: newTask.assignedToId,
    expiration: newTask.expiration ? newTask.expiration : null,
  };
};
