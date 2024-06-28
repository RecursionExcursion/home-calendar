"use client";

import { Session, User } from "../../../types";
import {
  getTimeDifferenceObject,
  getTimeDifferenceString,
  msTimestamps,
  stripTimeFromDate,
} from "../../../lib/util";
import { FallbackIcon } from "../../misc/FallbackIcon";
import { renewSession } from "../../../service/sessionService";
import { useEffect, useState } from "react";
import { getUserIdFromCookie } from "../../../lib/cookieManager";
import { getUser } from "../../../service/user/userService";

export default function SessionManagmentUI() {
  const [session, setSession] = useState<Session | null>();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const now = new Date();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const userId = await getUserIdFromCookie();
    if (!userId) return;
    const userJson = await getUser(userId, "id");
    const user = JSON.parse(userJson) as User;

    if (!user.session) {
      setSession(null);
      return;
    }

    const session = JSON.parse(user.session) as Session;
    setSession(session);

    const daysDiff = getTimeDifferenceObject(now.getTime(), session.exp).days;

    setButtonDisabled(daysDiff >= 6);
  };

  if (!session) return <FallbackIcon />;

  const handleRenewSession = async () => {
    await renewSession();
    await fetchUser();
  };

  const expString = getTimeDifferenceString(now.getTime(), session.exp);

  return (
    <div className="sm-wrapper">
      <p>
        Your current session will expire in <span>{expString}</span>
      </p>
      <div className="sm-button-container">
        <button
          onClick={handleRenewSession}
          className="db-button"
          disabled={buttonDisabled}
        >
          Renew Session
        </button>
      </div>
    </div>
  );
}
