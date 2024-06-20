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
    return !show ? null : (
      <div className={`toast-container-${type}`}>
        <h4>{title}</h4>
        <p>{message}</p>
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
