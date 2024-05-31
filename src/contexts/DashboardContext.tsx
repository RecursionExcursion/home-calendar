"use client";

import { createContext, useContext } from "react";
import { ShowToastProps, useToast } from "../hooks/useToast";

type DashboardContextState = {
  showToast: (props: ShowToastProps) => void;
};

const DashboardContext = createContext<DashboardContextState>(
  {} as DashboardContextState
);

type DashboardProviderProps = {
  children: React.ReactNode;
};

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const { Toast, showToast } = useToast();

  return (
    <DashboardContext.Provider
      value={{
        showToast: ({ title, message, type }) =>
          showToast({ title, message, type }),
      }}
    >
      <>
        {children}
        <Toast />
      </>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
