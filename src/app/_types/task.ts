import { ObjectId } from "mongodb";
import { User } from "./user";

export type Task = {
  _id: ObjectId;
  task: string;
  date: Date;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  creadtedBy: User;
  updatedBy: User | null;
  assignedTo: User | null;
  expiration: Date | null;
};

export enum TaskStatus {
  Pending = "Pending",
  InProgress = "In Progress",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export type NewTask = {
  task: string;
  createdBy: User;
  assignedTo: User | null;
  expiration: Date | null;
};

export const createNewTask = (newTask: NewTask): Task => {
  return {
    _id: new ObjectId(),
    task: newTask.task,
    date: new Date(),
    status: TaskStatus.Pending,
    createdAt: new Date(),
    updatedAt: new Date(),
    creadtedBy: newTask.createdBy,
    updatedBy: null,
    assignedTo: newTask.assignedTo,
    expiration: newTask.expiration,
  };
};
