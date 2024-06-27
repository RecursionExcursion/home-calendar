"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { removeSession } from "../../../service/sessionService";
import { deleteUserCookie } from "../../../lib/cookieManager";
import { useDashboardContext, useUserContext } from "../../../contexts";
import { useContentContext } from "../../../contexts/UserContentContext";
import useAppLoading from "../../../hooks/useAppLoading";

export default function LogOutInterface() {
  // const { user } = useUserContext();
  const { user } = useContentContext();
  const { showToast } = useDashboardContext();

  const router = useRouter();

  const [logoutOfAllSessions, setLogoutOfAllSessions] = useState<boolean>(false);

  useAppLoading();

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
    <div className="flex-col gap-2">
      <h2 className="db-h2">Logout</h2>
      <div className="flex gap-0_5" style={{ textWrap: "nowrap" }}>
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
      <button className="db-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
function useLoadingContext(): { setAppLoading: any } {
  throw new Error("Function not implemented.");
}
