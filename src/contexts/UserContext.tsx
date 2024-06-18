"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { validateClientSessionCookie } from "../service/sessionService";
import { User } from "../types";
import { getUserCookie } from "../lib/cookieManager";
import { serverRedirect } from "../lib/serverActions";

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
    getUserCookie().then((cookie) => {
      if (!cookie) {
        serverRedirect("/login");
        return;
      }
      validateClientSessionCookie(cookie).then((user) => {
        if (!user) {
          serverRedirect("/login");
          return;
        }
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
