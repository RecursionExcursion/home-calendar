"use client";

import { useEffect } from "react";
import { useAppLoadingContext } from "../contexts/LoadingContext";

export default function useAppLoading(toState?: boolean, msDelay?: number) {
  const loadingState = toState ?? false;
  const delay = msDelay ?? 500;

  const { setAppLoading } = useAppLoadingContext();

  useEffect(() => {
    setTimeout(() => {
      setAppLoading(loadingState);
    }, delay);
  }, []);
}
