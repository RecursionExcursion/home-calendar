"use client";

import { useAppContext } from "../../contexts/AppContext";
import { renewSession } from "../../service/sessionService";
import Button from "../base/Button";

type RenewSessionModalProps = {
  sessionExp: number;
  currentTime: number;
};

export default function RenewSessionModal(props: RenewSessionModalProps) {
  const { closeModal } = useAppContext();

  const { sessionExp, currentTime } = props;

  const timeDifference = getTimeDifference(sessionExp, currentTime);

  const handleYesClick = async () => {
    await renewSession();
    closeModal();
  };

  const handleNoClick = () => {
    closeModal();
  };

  return (
    <div className="flex flex-col justify-center text-center">
      <span>{`Your session is about to expire in ${timeDifference}!`}</span>
      <span>{`Would you like to renew your session on all devices?`}</span>
      <div className="flex gap-2 justify-center mt-2">
        <Button text="Yes" onClick={handleYesClick} />
        <Button text="No" onClick={handleNoClick} />
      </div>
    </div>
  );
}

const getTimeDifference = (epoch1: number, epoch2: number) => {
  const timeDifference = Math.abs(epoch1 - epoch2);

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

  // Return the formatted string
  return `${days}D ${hours}H ${minutes}M ${seconds}S`;
};
