"use server";

import { getUserIdFromCookie } from "../../lib/cookieManager";
import { NewTask, Task, TaskFactory, User } from "../../types";
import { changeDate } from "../../util";
import { getUser } from "../user/userService";
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

  //Check and remove old tasks
  const filteredTasks = await deleteExpiredTasks(tasks);

  const tasksArrayString = JSON.stringify(filteredTasks);
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

//TODO It is possible to access the cookie in a layout before the userContext checks the cookie
//This will cause the app to crash, a solution would to place a redirect in this fn or in the layout
const deleteExpiredTasks = async (tasks: Task[]): Promise<Task[]> => {
  const userId = await getUserIdFromCookie();
  if (!userId) throw new Error("User not found");

  const userJSON = await getUser(userId, "id");

  const user = JSON.parse(userJSON) as User;

  const deleteAfter = user.settings.deleteTasksAfterNDays;

  if (user.settings.deleteTasksAfterNDays !== -1) {
    const expiredTasks = tasks.filter((task) => {
      const expirationDate = changeDate(new Date(task.date), deleteAfter, "day");
      return expirationDate < new Date();
    });

    const deleteTaskProms = expiredTasks.map((task) =>
      deleteTaskById(task._id.toHexString())
    );

    await Promise.all(deleteTaskProms);
    return (await findAllTasks()) as Task[];
  }
  return tasks;
};
