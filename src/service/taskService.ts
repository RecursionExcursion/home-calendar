"use server";

import { v4 as uuidv4 } from "uuid";
import { NewTask, Task, TaskStatus, Tasks } from "../types";
import { getTasks, updateTasks } from "./tasksService";

export const createNewTask = async (newTask: NewTask, userId: string) => {
  const createdTask: Task = TaskFactory(newTask);

  const tasksJson = await getTasks(userId);
  const tasks = JSON.parse(tasksJson) as Tasks;

  tasks.taskList.push(createdTask);

  const res = await updateTasks(tasks);
  const resObj = JSON.parse(res);

  return resObj.modifiedCount === 1;
};

export const deleteTask = async (taskId: string, userId: string) => {
  const tasksJson = await getTasks(userId);
  const tasks = JSON.parse(tasksJson) as Tasks;

  const taskIndex = tasks.taskList.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) return false;

  tasks.taskList.splice(taskIndex, 1);

  const res = await updateTasks(tasks);
  const resObj = JSON.parse(res);

  return resObj.modifiedCount === 1;
};

const TaskFactory = (newTask: NewTask): Task => {
  return {
    id: uuidv4(),
    description: newTask.description,
    date: newTask.date,
    allDay: newTask.allDay,
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
