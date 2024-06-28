"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types";
import { getUserIdFromCookie } from "../lib/cookieManager";
import { getUser } from "../service/userService";

type UserContextState = {
  user: User;
};

export const UserContext = createContext<UserContextState>({
  user: {} as User,
});

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = (props: UserProviderProps) => {
  const [user, setUser] = useState({} as User);
  const [initalized, setInitialized] = useState(false);

  useEffect(() => {
    getUserIdFromCookie().then((userId) => {
      if (!userId) {
        //This should never happen as it is handled in the middleware
        throw new Error("No user id found in cookie");
      }
      getUser(userId, "id").then((userJson) => {
        const user = JSON.parse(userJson) as User;
        setUser(user);
        setInitialized(true);
      });
    });
  }, []);

  const state: UserContextState = {
    user,
  };

  return !initalized ? null : (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
