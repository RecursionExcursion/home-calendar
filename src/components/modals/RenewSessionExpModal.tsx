"use client";

import { useAppContext } from "../../contexts/AppContext";
import { serverRedirect } from "../../lib/serverActions";
import { getTimeDifference } from "../../lib/util";
import { renewSession } from "../../service/sessionService";

type RenewSessionModalProps = {
  sessionExp: number;
  currentTime: number;
};

export default function RenewSessionModal(props: RenewSessionModalProps) {
  const { closeModal } = useAppContext();

  const { showToast } = useAppContext();

  const { sessionExp, currentTime } = props;

  const timeDifference = getTimeDifference(sessionExp, currentTime);

  const handleYesClick = async () => {
    await renewSession();
    showToast({
      title: "Session Renewed",
      message: "Your session has been successfully renewed!",
      type: "success",
    });
    setTimeout(() => {
      serverRedirect("/dashboard");
    }, 2000);
    closeModal();
  };

  const handleNoClick = () => {
    closeModal();
    serverRedirect("/dashboard");
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
