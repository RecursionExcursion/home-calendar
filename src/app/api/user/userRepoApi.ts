"use server";

import { ObjectId } from "mongodb";
import { getMongoConnection } from "../../../db/mongoConnection";
import { User } from "../../../types";
import { userCollectionName as collectionName } from "../../../db/collectionConstants";

export const createUser = async (user: User) => {
  const db = await getMongoConnection();
  const result = await db.collection(collectionName).insertOne(user);
  return result;
};

const searchFilterMap = {
  username: (search: string) => ({ username: search }),
  id: (search: string) => ({ _id: ObjectId.createFromHexString(search) }),
};

export const readUser = async (
  searchString: string,
  by: keyof typeof searchFilterMap
) => {
  const db = await getMongoConnection();
  const filter = searchFilterMap[by](searchString);
  const user = await db.collection(collectionName).findOne(filter);
  return user;
};

export const updateUser = async (user: User) => {
  const db = await getMongoConnection();
  const { _id, ...updatedUser } = user;
  const res = await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(user._id) }, { $set: updatedUser });
  return res;
};

export const deleteUser = async (id: string) => {
  const db = await getMongoConnection();
  const objId = ObjectId.createFromHexString(id);
  const deleteResult = await db.collection(collectionName).deleteOne({ _id: objId });
  return deleteResult;
};

// export const updateUser = async (user: User) => {
//   const db = await getMongoConnection();
//   const res = await db.collection(collectionName).updateOne(
//     { _id: new ObjectId(user._id) },
//     {
//       $set: {
//         username: user.username,
//         password: user.password,
//         created: user.created,
//         settings: user.settings,
//         friends: user.friends,
//         message_ids: user.message_ids,
//         task_ids: user.task_ids,
//         session: user.session,
//       },
//     }
//   );
//   return res;
// };
