"use client";

import useAppLoadingState from "../../hooks/useAppLoading";

type ClientLoadStateProps = {
  toState?: boolean;
  msDelay?: number;
};

export default function ClientSideLoadState(props: ClientLoadStateProps) {
  useAppLoadingState(props.toState, props.msDelay);
  return null;
}
