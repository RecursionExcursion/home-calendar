"use server";

import { ObjectId } from "mongodb";

import { Tasks } from "../../../types";
import { readTasksByUserId, createTasks, updateTasks } from "./taskRepoApi";

/* Create */
export const createNewTasks = async (userId: string) => {
  const newTasks: Tasks = {
    _id: new ObjectId(),
    userId: userId,
    taskList: [],
  };
  const result = await createTasks(newTasks);
  return result;
};

/* Read */
export const getUserTasks = async (userId: string) => {
  let dbTasks = await readTasksByUserId(userId);

  if (!dbTasks) {
    await createNewTasks(userId);
    dbTasks = await readTasksByUserId(userId);
  }

  return JSON.stringify({
    ...dbTasks,
    _id: dbTasks!!._id.toString(),
  });
};

/* Update */
export const saveTasks = async (tasks: Tasks) => {
  tasks.taskList.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return await updateTasks(tasks);
};

/* Delete */

//TODO Keep for reference, deleting old tasks
// export const getAllTasks = async (): Promise<string> => {
//   const tasks = (await findAllTasks()) as Task[];

//   //Check and remove old tasks
//   const filteredTasks = await deleteExpiredTasks(tasks);

//   const tasksArrayString = JSON.stringify(filteredTasks);
//   return tasksArrayString;
// };

/* Helpers */

//TODO It is possible to access the cookie in a layout before the userContext checks the cookie
//This will cause the app to crash, a solution would to place a redirect in this fn or in the layout
// const deleteExpiredTasks = async (tasks: Task[]): Promise<Task[]> => {
//   const userId = await getUserIdFromCookie();
//   if (!userId) throw new Error("User not found");

//   const userJSON = await getUser(userId, "id");

//   const user = JSON.parse(userJSON) as User;

//   const deleteAfter = user.settings.deleteTasksAfterNDays;

//   if (user.settings.deleteTasksAfterNDays !== -1) {
//     const expiredTasks = tasks.filter((task) => {
//       const expirationDate = changeDate(new Date(task.date), deleteAfter, "day");
//       return expirationDate < new Date();
//     });

//     const deleteTaskProms = expiredTasks.map((task) =>
//       deleteTaskById(task._id.toHexString())
//     );

//     await Promise.all(deleteTaskProms);
//     return (await findAllTasks()) as Task[];
//   }
//   return tasks;
// };
