"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "../../service/loginService";
import { useAppContext } from "../../contexts/AppContext";
import { miscRoutes } from "../../constants/routes";
import { getEnvRegistration } from "../../lib/envManager";
import RenewSessionModal from "../modals/RenewSessionExpModal";
import { colors } from "../../styles/colors";
import { areDatesLessThanXDaysApart } from "../../util";
import { useDashboardContext } from "../../contexts";
import Link from "next/link";

export default function LoginUI() {
  const router = useRouter();
  const { showModal } = useAppContext();
  const { showToast } = useDashboardContext();

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
          toDashboardAction={() => router.push("/dashboard")}
        />
      );
    } else {
      router.push("/dashboard");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value.trim() }));
  };

  return (
    <div className="greedy-container row-container">
      <div style={{ minWidth: "10rem", maxWidth: "20rem", width: "50%" }}>
        <div className="col-container gap-0_5">
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
            <Link className="link" href={miscRoutes.register}>
              Create an account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
