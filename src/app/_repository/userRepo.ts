import { ObjectId } from "mongodb";
import { User } from "../_types/user";
import { getMongoConnection } from "./mongoConnection";

const collectionName = "users";

export const userRepo = {
  save: async (user: User) => {
    const db = await getMongoConnection();
    const result = await db.collection(collectionName).insertOne(user);
    return result;
  },

  getByUsername: async (username: string) => {
    const db = await getMongoConnection();
    const user = await db.collection(collectionName).findOne({ username });
    return user;
  },

  getById: async (id: string) => {
    const db = await getMongoConnection();
    const objId = ObjectId.createFromHexString(id);
    return db.collection(collectionName).findOne({ _id: objId });
  },

  update: async (user: User) => {
    const db = await getMongoConnection();
    await db
      .collection(collectionName)
      .updateOne({ _id: user._id }, { $set: user });
    return user;
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
