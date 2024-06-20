"use client";

import { useState } from "react";

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
      <div className="modal-disable-overlay">
        <div className="modal-wrapper">
          {/* <div className="modal-container"> */}
          {modalContent}
          {/* </div> */}
        </div>
      </div>
    );
  };

  return { Modal, showModal, closeModal };
};
