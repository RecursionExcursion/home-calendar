"use client";

import { useAppContext } from "../../contexts/AppContext";
import { getTimeDifference } from "../../lib/util";
import { renewSession } from "../../service/sessionService";

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
    <div className="flex-col">
      <span>{`Your session is about to expire in ${timeDifference}!`}</span>
      <span>{`Would you like to renew your session on all devices?`}</span>
      <div className="flex gap-0_5" style={{ margin: "0.5rem 0 0 0" }}>
        <button className="modal-button" onClick={handleYesClick}>
          Yes
        </button>
        <button className="modal-button" onClick={handleNoClick}>
          No
        </button>
      </div>
    </div>
  );
}
