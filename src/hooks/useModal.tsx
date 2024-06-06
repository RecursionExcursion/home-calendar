"use client";

import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";

export const useModal = () => {
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const showModal = (content: JSX.Element) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const Modal = () => {
    if (!modalContent) {
      return null;
    }

    return (
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            color: "black",
            display: "flex",
            flexDirection: "column",
            opacity: "1",
            zIndex: 10,
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              padding: "0 .25rem 0 0",
            }}
          >
            <button
              onClick={() => {
                setModalContent(null);
              }}
            >
              X
            </button>
          </div>
          <div
            style={{
              padding: ".25rem 1rem",
            }}
          >
            {modalContent}
          </div>
        </div>
      </div>
    );
  };

  return { Modal, showModal, closeModal };
};
