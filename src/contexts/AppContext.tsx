"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { ShowToastProps, useToast } from "../hooks/useToast";
import { useModal } from "../hooks/useModal";

type AppContextState = {
  showToast: (props: ShowToastProps) => void;
  showModal: (content: JSX.Element) => void;
};

export const AppContext = createContext<AppContextState>({} as AppContextState);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const { Toast, showToast } = useToast();
  const { showModal, Modal } = useModal();

  return (
    <AppContext.Provider
      value={{
        showModal: (content) => showModal(content),
        showToast: ({ title, message, type }) => showToast({ title, message, type }),
      }}
    >
      <div className="relative">
        {children}
        <Toast />
        <Modal />
      </div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
