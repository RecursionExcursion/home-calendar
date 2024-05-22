import { ObjectId } from "mongodb";
import { User } from "../_types/user";
import { getMongoConnection } from "./mongoConnection";
import { Task } from "../_types/task";

const collectionName = "tasks";

export const taskRepo = {
  save: async (task: Task) => {
    const db = await getMongoConnection();
    const result = await db.collection(collectionName).insertOne(task);
    return result;
  },

  getById: async (id: string) => {
    const db = await getMongoConnection();
    const objId = ObjectId.createFromHexString(id);
    return db.collection(collectionName).findOne({ _id: objId });
  },

  getAll: async () => {
    const db = await getMongoConnection();
    return db.collection(collectionName).find().toArray();
  },

  update: async (task: Task) => {
    const db = await getMongoConnection();
    const updateResult = await db
      .collection(collectionName)
      .updateOne({ _id: task._id }, { $set: task });
    return updateResult;
  },

  delete: async (id: string) => {
    const db = await getMongoConnection();
    const objId = ObjectId.createFromHexString(id);
    const deleteResult = await db
      .collection(collectionName)
      .deleteOne({ _id: objId });
    return deleteResult;
  },
};
