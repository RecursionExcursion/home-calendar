"use server";

import {
  deleteTaskById,
  findTaskById,
  saveTask,
  updateTask,
} from "../_repository/taskRepo";
import { NewTask, Task, TaskFactory } from "../_types/task";

export const createNewTask = async (newTaskJson: string) => {
  const newTaskObj = JSON.parse(newTaskJson);

  const newTask: NewTask = {
    task: newTaskObj.task,
    date: newTaskObj.date,
    createdById: newTaskObj.createdById,
    assignedToId: newTaskObj.assignedToId,
    expiration: newTaskObj.expiration,
  };

  const createdTask: Task = TaskFactory(newTask);
  const result = await saveTask(createdTask);
  return result;
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
