"use server";

import { NewTask, Task, TaskFactory } from "../../types";
import {
  deleteTaskById,
  findAllTasks,
  findTaskById,
  saveTask,
  updateTask,
} from "./taskRepo";

export const createNewTask = async (newTaskJson: string) => {
  const newTaskObj = JSON.parse(newTaskJson);

  const newTask: NewTask = {
    task: newTaskObj.task,
    date: newTaskObj.date,
    allDay: newTaskObj.allDay,
    createdById: newTaskObj.createdById,
    assignedToId: newTaskObj.assignedToId,
    expiration: newTaskObj.expiration,
    priortiy: newTaskObj.priortiy,
  };

  const createdTask: Task = TaskFactory(newTask);
  const result = await saveTask(createdTask);
  return result;
};

export const getAllTasks = async (): Promise<string> => {
  const tasks = (await findAllTasks()) as Task[];
  const tasksArrayString = JSON.stringify(tasks);
  return tasksArrayString;
};

export const getTaskById = async (id: string) => {
  const task = await findTaskById(id);
  return task;
};

export const editTask = async (task: Task) => {
  const result = await updateTask(task);
  return result;
};

export const deleteTask = async (id: string) => {
  const result = await deleteTaskById(id);
  return result;
};
