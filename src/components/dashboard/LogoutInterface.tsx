"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { removeSession } from "../../service/sessionService";
import { deleteUserCookie } from "../../lib/cookieManager";
import { Button, H2, Input } from "../base";
import { useAppContext, useUserContext } from "../../contexts";

export default function LogOutInterface() {
  const { user } = useUserContext();
  const { showToast } = useAppContext();

  const router = useRouter();

  const [logoutOfAllSessions, setLogoutOfAllSessions] = useState<boolean>(false);

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
    <div className="colContainer" style={{ gap: "2rem" }}>
      <H2>Logout</H2>
      <div className="rowContainer" style={{ textWrap: "nowrap", gap: "0.5rem" }}>
        <label htmlFor="logoutAllSessions">Logout of all sessions?</label>
        <Input
          type="checkbox"
          id="logoutAllSessions"
          name="logoutAllSessions"
          checked={logoutOfAllSessions}
          onChange={() => setLogoutOfAllSessions(!logoutOfAllSessions)}
        />
      </div>
      <Button theme="primary" child="Logout" onClick={handleLogout} />
    </div>
  );
}