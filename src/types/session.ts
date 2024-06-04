import { v4 as uuidv4 } from "uuid";
import { User } from "./user";
import { decryptData, encryptData } from "../lib/crypto";

export type Session = {
  _id: string;
  userId: string;
  exp: number;
};

export const createSession = (user: User): Session => {
  const oneWeekInMs = 1000 * 60 * 60 * 24 * 7;
  return {
    _id: uuidv4(),
    userId: user._id.toString(),
    exp: new Date().getTime() + oneWeekInMs,
  };
};

export const serializeSession = (session: Session): string => {
  return JSON.stringify(session);
};

export const deserializeSession = (sessionString: string): Session => {
  return JSON.parse(sessionString) as Session;
};

export const encryptSession = async (session: Session): Promise<string> => {
  return await encryptData(JSON.stringify(session)).then(
    (data) => data.encryptedData
  );
};

export const decryptSession = async (
  sessionString: string
): Promise<Session> => {
  return JSON.parse(await decryptData(sessionString)) as Session;
};
