"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useModal } from "../hooks/useModal";

type AppContextState = {
  showModal: (content: JSX.Element) => void;
  closeModal: () => void;
};

export const AppContext = createContext<AppContextState>({} as AppContextState);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const { showModal, Modal, closeModal } = useModal();

  return (
    <AppContext.Provider
      value={{
        showModal: (content) => showModal(content),
        closeModal: () => closeModal(),
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
        <Modal />
      </div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
