"use client";

import { useEffect, useState } from "react";
import { colors } from "../styles/colors";

type ToastType = "success" | "error" | "info" | "warning";

export type ShowToastProps = {
  title: string;
  message: string;
  type: ToastType;
};

export function useToast() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<ToastType>("success");

  useEffect(() => {
    if (title && message) {
      setShow(true);
    }
  }, [title, message]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
        setTitle(null);
        setMessage(null);
      }, 5000);
    }
  }, [show]);

  const Toast = () => {
    const toastStyles = {
      success: colors.prioirtyColors.good,
      error: colors.prioirtyColors.danger,
      info: colors.aqua,
      warning: colors.prioirtyColors.warning,
    };

    return !show ? null : (
      <div
        style={{
          alignItems: "center",
          backgroundColor: toastStyles[type ?? "info"],
          borderRadius: "0.375rem",
          bottom: "10px",
          display: "flex",
          flexDirection: "column",
          left: "50%",
          padding: "10px",
          position: "absolute",
          textAlign: "center",
          transform: "translateX(-50%)",
          width: "200px",
        }}
      >
        <div style={{ fontSize: "1.125rem", fontWeight: "600", lineHeight: "1.75rem" }}>
          {title}
        </div>
        <div style={{ textWrap: "wrap" }}>{message}</div>
      </div>
    );
  };

  const showToast = (props: ShowToastProps) => {
    const { title, message, type } = props;
    setType(type);
    setTitle(title);
    setMessage(message);
  };

  return {
    Toast,
    showToast,
  };
}
