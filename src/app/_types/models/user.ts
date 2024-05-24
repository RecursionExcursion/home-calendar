import { ObjectId } from "mongodb";
import { Message } from "./message";
import { Task } from "./task";

type BaseUser = {
  username: string;
  password: string;
  created: string;
  friends: User[];
  message_ids: string[];
  task_ids: string[];
  session_id: string | null;
};

export type User = BaseUser & {
  _id: ObjectId;
};

export type NewUser = {
  username: string;
  password: string;
};

export const createNewUser = (newUser: NewUser): User => {
  return {
    _id: new ObjectId(),
    username: newUser.username,
    password: newUser.password,
    created: new Date().toISOString(),
    friends: [],
    message_ids: [],
    task_ids: [],
    session_id: null,
  };
};
