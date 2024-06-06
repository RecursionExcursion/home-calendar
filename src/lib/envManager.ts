"use server";

export const getEnvRegistration = async (): Promise<boolean> => {
  const reg = process.env.REGISTRATION;
  const regBoolean = reg === "true";
  return regBoolean;
};
