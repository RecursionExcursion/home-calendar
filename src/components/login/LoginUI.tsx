"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Input, Link } from "../base";

import { login } from "../../service/loginService";
import { useAppContext } from "../../contexts/AppContext";
import { miscRoutes } from "../../constants/routes";
import { getEnvRegistration } from "../../lib/envManager";
import RenewSessionModal from "../modals/RenewSessionExpModal";
import { colors } from "../../styles/colors";
import { areDatesLessThanXDaysApart } from "../../util";

export default function LoginUI() {
  const router = useRouter();
  const { showToast, showModal } = useAppContext();

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
    <div className="greedyContainer rowContainer">
      <div style={{ minWidth: "10rem", maxWidth: "20rem", width: "50%" }}>
        <div className="colContainer" style={{ gap: ".5rem" }}>
          <Input
            theme="primary"
            placeholder="UserName"
            value={loginCredentials.username}
            onChange={handleInputChange}
            name="username"
          />
          <Input
            theme="primary"
            placeholder="Password"
            value={loginCredentials.password}
            onChange={handleInputChange}
            name="password"
            type="password"
          />
          <Button child={"Log In"} onClick={handleLogin} />
          {showRegistration && (
            <Link
              style={{ color: colors.blueLink, textDecoration: "underline" }}
              href={miscRoutes.register}
            >
              Create an account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
