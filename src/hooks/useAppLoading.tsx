"use client";

import { useEffect } from "react";
import { useAppLoadingContext } from "../contexts/LoadingContext";

export default function useAppLoadingState(toState?: boolean, msDelay?: number) {
  const loadingState = toState ?? false;
  const delay = msDelay ?? 750;

  const { setAppLoading } = useAppLoadingContext();

  useEffect(() => {
    setTimeout(() => {
      setAppLoading(loadingState);
    }, delay);
  }, []);
}
