"use client";

import { useAppContext } from "../../contexts/AppContext";
import { renewSession } from "../../service/sessionService";
import Button from "../base/Button";

type RenewSessionModalProps = {
  sessionExp: number;
  currentTime: number;
  toDashboardAction: () => void;
};

export default function RenewSessionModal(props: RenewSessionModalProps) {
  const { closeModal } = useAppContext();

  const { sessionExp, currentTime, toDashboardAction } = props;

  const timeDifference = getTimeDifference(sessionExp, currentTime);

  const handleYesClick = async () => {
    await renewSession();
    closeModal();
    toDashboardAction();
  };

  const handleNoClick = () => {
    closeModal();
    toDashboardAction();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <span>{`Your session is about to expire in ${timeDifference}!`}</span>
      <span>{`Would you like to renew your session on all devices?`}</span>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          margin: "0.5rem 0 0 0",
        }}
      >
        <Button child="Yes" onClick={handleYesClick} />
        <Button child="No" onClick={handleNoClick} />
      </div>
    </div>
  );
}

const getTimeDifference = (epoch1: number, epoch2: number) => {
  const timeDifference = Math.abs(epoch1 - epoch2);

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Return the formatted string
  return `${days}D ${hours}H ${minutes}M ${seconds}S`;
};
