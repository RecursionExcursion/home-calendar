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
    const baseStyle = `absolute z-50 bottom-[5%] left-1/2 transform -translate-x-1/2 
                    border border-white p-2 
                    flex flex-col items-center w-52 rounded-md `;

    const toastStyles = {
      success: baseStyle + "bg-green-500",
      error: baseStyle + "bg-red-500",
      info: baseStyle + "bg-blue-500",
      warning: baseStyle + "bg-yellow-500",
    };

    return !show ? null : (
      <div className={toastStyles[type ?? "info"]}>
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-wrap text-center">{message}</div>
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
