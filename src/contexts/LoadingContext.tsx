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

type LoadingContextState = {
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const AppContext = createContext<LoadingContextState>({} as LoadingContextState);

type LoadingProviderProps = {
  children: ReactNode;
};

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState(false);

  return loading ? (
    <Spinner />
  ) : (
    <AppContext.Provider value={{ setLoading }}>{children}</AppContext.Provider>
  );
};

export const useLoadingContext = () => useContext(AppContext);
