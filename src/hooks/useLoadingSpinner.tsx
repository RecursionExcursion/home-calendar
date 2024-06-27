"use client";

import { useState } from "react";

export default function useLoadingSpinner(initialState?: boolean) {
  const [loadingState, setLoadingState] = useState(initialState ?? false);

  const Spinner = ({ children }: { children: JSX.Element }) => {
    return loadingState ? <span className="loader"></span> : children;
  };

  const setLoading = (toState: boolean, msDelay?: number) => {
    const delay = msDelay ?? 0;

    setTimeout(() => {
      setLoadingState(toState);
    }, delay);
  };

  return {
    Spinner,
    setLoading,
  };
}
