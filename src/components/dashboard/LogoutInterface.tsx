"use client";

import { useState } from "react";
import Button from "../base/Button";
import { H2 } from "../base/H2";
import Input from "../base/Input";
import { useUserContext } from "../../contexts/UserContext";
import { removeSession } from "../../service/sessionService";
import { deleteUserCookie } from "../../lib/cookieManager";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../contexts/AppContext";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      <H2>Logout</H2>
      <div
        style={{
          display: "flex",
          textWrap: "nowrap",
          gap: "0.5rem",
        }}
      >
        <label htmlFor="logoutAllSessions">Logout of all sessions?</label>
        <Input
          type="checkbox"
          id="logoutAllSessions"
          name="logoutAllSessions"
          checked={logoutOfAllSessions}
          onChange={() => setLogoutOfAllSessions(!logoutOfAllSessions)}
        />
      </div>
      <Button theme="primary" text="Logout" onClick={handleLogout} />
    </div>
  );
}
