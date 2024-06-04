import { ObjectId } from "mongodb";

type BaseUser = {
  username: string;
  password: string;
  created: string;
  friends: User[];
  message_ids: string[];
  task_ids: string[];
  session: string | null;
};

export type User = BaseUser & {
  _id: ObjectId;
};

export type NewUser = {
  username: string;
  password: string;
};

export const createEmptyUser = (newUser: NewUser): User => {
  return {
    _id: new ObjectId(),
    username: newUser.username,
    password: newUser.password,
    created: new Date().toISOString(),
    friends: [],
    message_ids: [],
    task_ids: [],
    session: null,
  };
};

export const buildUserFromJSON = (userJSON: string): User => {
  const user = JSON.parse(userJSON);
  return {
    ...user,
    _id: ObjectId.createFromHexString(user._id),
  };
};