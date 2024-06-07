"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { ShowToastProps, useToast } from "../hooks/useToast";
import { useModal } from "../hooks/useModal";

type AppContextState = {
  showToast: (props: ShowToastProps) => void;
  showModal: (content: JSX.Element) => void;
  closeModal: () => void;
};

export const AppContext = createContext<AppContextState>({} as AppContextState);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const { Toast, showToast } = useToast();
  const { showModal, Modal, closeModal } = useModal();

  return (
    <AppContext.Provider
      value={{
        showModal: (content) => showModal(content),
        closeModal: () => closeModal(),
        showToast: ({ title, message, type }) => showToast({ title, message, type }),
      }}
    >
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
        }}
      >
        {children}
        <Toast />
        <Modal />
      </div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
