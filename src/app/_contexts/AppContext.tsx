"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { ShowToastProps, useToast } from "../_hooks/useToast";

type AppContextState = {
  showToast: (props: ShowToastProps) => void;
};

export const AppContext = createContext<AppContextState>({} as AppContextState);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const { Toast, showToast } = useToast();

  return (
    <AppContext.Provider
      value={{
        showToast: ({ title, message, type }) =>
          showToast({ title, message, type }),
      }}
    >
      <>
        {children}
        <Toast />
      </>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
