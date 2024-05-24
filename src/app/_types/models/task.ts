import { ObjectId } from "mongodb";
import { User } from "./user";
import { validateUTCDate } from "../../_lib/util";

export type Task = {
  _id: ObjectId;
  task: string;
  date: string;
  priority: Priority | null;
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
  priortiy: Priority | null;
};

export const TaskFactory = (newTask: NewTask): Task => {
  return {
    _id: new ObjectId(),
    task: newTask.task,
    date: newTask.date,
    priority: newTask.priortiy ? newTask.priortiy : null,
    status: TaskStatus.Pending,
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    createdById: newTask.createdById,
    updatedById: null,
    assignedToId: newTask.assignedToId,
    expiration: newTask.expiration ? newTask.expiration : null,
  };
};

type Priority = 1 | 2 | 3 | 4 | 5;
