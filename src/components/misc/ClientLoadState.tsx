"use client";

import useAppLoading from "../../hooks/useAppLoading";

type ClientLoadStateProps = {
  toState?: boolean;
  msDelay?: number;
};

export default function ClientLoadState(props: ClientLoadStateProps) {
  useAppLoading(props.toState, props.msDelay);
  return null;
}
