"use client";

import { useEffect, useState } from "react";

import { login } from "../../service/loginService";
import { useAppContext } from "../../contexts/AppContext";
import { miscRoutes } from "../../constants/routes";
import { getEnvRegistration } from "../../lib/envManager";
import RenewSessionModal from "../modals/RenewSessionExpModal";
import { areDatesLessThanXDaysApart } from "../../util";
import Link from "next/link";
import { serverRedirect } from "../../lib/serverActions";

export default function LoginUI() {
  const { showModal, showToast } = useAppContext();

  const [dialogOpen, setDialogOpen] = useState(false);

  const [showRegistration, setShowRegistration] = useState(false);

  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    getEnvRegistration().then((resp) => setShowRegistration(resp));
  }, []);

  const handleLogin = async () => {
    const resp = await login(loginCredentials.username, loginCredentials.password);

    if (!resp.success) {
      showToast({
        title: "Login Failed",
        message: resp.message,
        type: "error",
      });
      return;
    }

    const currentTime = new Date();
    const exirationTime = new Date(resp.sessionExp!!);

    const sessionCloseToExp = areDatesLessThanXDaysApart(currentTime, exirationTime, 5);

    if (sessionCloseToExp) {
      showModal(
        <RenewSessionModal
          sessionExp={exirationTime.getTime()}
          currentTime={currentTime.getTime()}
        />
      );
    } else {
      serverRedirect("/dashboard");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value.trim() }));
  };

  return (
    <>
      <div className="login-ui-container">
        <div className="flex">
          <div className="flex-col gap-0_5">
            <input
              className="login-input"
              placeholder="UserName"
              value={loginCredentials.username}
              onChange={handleInputChange}
              name="username"
            />
            <input
              className="login-input"
              placeholder="Password"
              value={loginCredentials.password}
              onChange={handleInputChange}
              name="password"
              type="password"
            />
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
            {showRegistration && (
              <Link className="login-button" href={miscRoutes.register}>
                Create an account
              </Link>
            )}
          </div>
        </div>
      </div>
      <dialog open={dialogOpen}>
        <p>Dialog</p>
      </dialog>
    </>
  );
}
