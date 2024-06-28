import { ObjectId } from "mongodb";
import { Settings } from "./settings";

type BaseUser = {
  username: string;
  password: string;
  created: string;
  settings: Settings;
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


