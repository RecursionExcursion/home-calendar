"use client";

import { useEffect, useState } from "react";

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
      success: "bg-green-500",
      error: "bg-red-500",
      info: "bg-blue-500",
      warning: "bg-yellow-500",
    };

    return !show ? null : (
      <div
        className={`rounded-md ${toastStyles[type ?? "info"]} `}
        style={{
          position: "absolute",
          width: "200px",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
          textAlign: "center",
        }}
      >
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-wrap">{message}</div>
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
