"use client";

import { dashboardRoutes } from "../../constants/routes";
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
    setTimeout(async () => {
      await serverRedirect(dashboardRoutes.home);
    }, 1000);
    closeModal();
  };

  const handleNoClick = async () => {
    await serverRedirect(dashboardRoutes.home);
    closeModal();
  };

  return (
    <div className="sr-container">
      <>
        <div className="sr-text-container">
          <span>{`Your session is about to expire in ${timeDifference}!`}</span>
          <span>{`Would you like to renew your session on all devices?`}</span>
        </div>
        <div className="sr-button-container">
          <button className="sr-button" onClick={handleYesClick}>
            Yes
          </button>
          <button className="sr-button" onClick={handleNoClick}>
            No
          </button>
        </div>
      </>
    </div>
  );
}
