"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import Spinner from "../components/base/Spinner";

type AppLoadingContextState = {
  setAppLoading: Dispatch<SetStateAction<boolean>>;
};

export const AppContext = createContext<AppLoadingContextState>(
  {} as AppLoadingContextState
);

type LoadingProviderProps = {
  children: ReactNode;
};

export const AppLoadingProvider = ({ children }: LoadingProviderProps) => {
  const [appLoading, setAppLoading] = useState(false);

  return (
    <AppContext.Provider value={{ setAppLoading }}>
      {appLoading && (
        <div className="loader-context-wrapper">
          <Spinner />
        </div>
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppLoadingContext = () => useContext(AppContext);
