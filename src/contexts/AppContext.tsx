"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useModal } from "../hooks/useModal";
import { ShowToastProps, useToast } from "../hooks/useToast";
import { AppLoadingProvider } from "./LoadingContext";

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
  const { showModal, Modal, closeModal } = useModal();
  const { Toast, showToast } = useToast();

  return (
    <AppContext.Provider
      value={{
        showModal: (content) => showModal(content),
        closeModal: () => closeModal(),
        showToast: ({ title, message, type }) => showToast({ title, message, type }),
      }}
    >
      <AppLoadingProvider>
        {children}
        <Modal />
        <Toast />
      </AppLoadingProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
