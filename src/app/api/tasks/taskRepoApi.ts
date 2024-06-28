"use server";

import { ObjectId } from "mongodb";
import { getMongoConnection } from "../../../db/mongoConnection";
import { Tasks } from "../../../types";

const collectionName = "tasks";

export const createTasks = async (tasks: Tasks) => {
  const db = await getMongoConnection();
  const result = await db.collection(collectionName).insertOne(tasks);
  return {
    acknowledged: result.acknowledged,
    insertedId: result.insertedId.toString(),
  };
};

export const readTasksByUserId = async (userId: string) => {
  const db = await getMongoConnection();
  const tasks = await db.collection(collectionName).findOne({ userId: userId });
  return tasks;
};

export const updateTasks = async (tasks: Tasks) => {
  const db = await getMongoConnection();

  const updateResult = await db.collection(collectionName).updateOne(
    { _id: new ObjectId(tasks._id) },
    {
      $set: {
        userId: tasks.userId,
        taskList: tasks.taskList,
      },
    }
  );

  return updateResult;
};
