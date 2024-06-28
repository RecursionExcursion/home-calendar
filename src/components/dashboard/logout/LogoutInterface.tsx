"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { removeSession } from "../../../service/sessionService";
import { deleteUserCookie } from "../../../lib/cookieManager";
import { useDashboardContext, useUserContext } from "../../../contexts";
import useAppLoadingState from "../../../hooks/useAppLoading";

export default function LogOutInterface() {
  const { user } = useUserContext();
  const { showToast } = useDashboardContext();

  const router = useRouter();

  const [logoutOfAllSessions, setLogoutOfAllSessions] = useState<boolean>(false);

  useAppLoadingState();

  const handleLogout = async () => {
    if (logoutOfAllSessions) {
      await removeSession(user);
    }
    await deleteUserCookie();
    showToast({
      title: "Logged out",
      message: `${user.username} logged out successfully`,
      type: "success",
    });

    router.push("/");
  };

  return (
    <div className="lo-wrapper">
      <h2 className="db-h2">Logout</h2>
      <div className="lo-all-session-container">
        <label className="text-base" htmlFor="logoutAllSessions">
          Logout of all sessions?
        </label>
        <input
          className="db-checkbox"
          type="checkbox"
          id="logoutAllSessions"
          name="logoutAllSessions"
          checked={logoutOfAllSessions}
          onChange={() => setLogoutOfAllSessions(!logoutOfAllSessions)}
        />
      </div>
      <div className="lo-button-container">
        <button className="db-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
