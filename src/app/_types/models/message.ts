import { ObjectId } from "mongodb";

export type Message = {
  _id: ObjectId ;
  message: string;
  createdAt: Date;
  createdBy: string;
};
