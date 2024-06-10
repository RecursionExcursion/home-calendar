"use client";

import { useEffect, useState } from "react";
import Button from "../base/Button";
import Input from "../base/Input";
import { useRouter } from "next/navigation";
import { login } from "../../service/loginService";
import { useAppContext } from "../../contexts/AppContext";
import Link from "next/link";
import { miscRoutes } from "../../constants/routes";
import { getEnvRegistration } from "../../lib/envManager";
import RenewSessionModal from "../modals/RenewSessionExpModal";
import { colors } from "../../styles/colors";

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

    const sessionCloseToExp = areDatesLessThanXDaysApart(currentTime, exirationTime, 7);

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

    // const timeInfoString = `Login Successful, session expires at ${exirationTime.toLocaleDateString()} at ${exirationTime.toLocaleTimeString()}.`;
    // const actionInfoString =
    //   "Would you like to extend the exipiration for all current session to 7 days from the current time?`";

    // //TODO Implement modal logic as confirm is not robust enough
    // const modalResp = confirm(`${timeInfoString}\n${actionInfoString}`);

    // console.log({ modalResp });

    // if (!resp.success) {
    //   showToast({
    //     title: "Login Failed",
    //     message: resp.message,
    //     type: "error",
    //   });
    // } else {
    //   router.push("/dashboard");
    // }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value.trim() }));
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ minWidth: "10rem", maxWidth: "20rem", width: "50%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            alignItems: "center",
          }}
        >
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
          />
          <Button text={"Log In"} onClick={handleLogin} />
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

const areDatesLessThanXDaysApart = (date1: Date, date2: Date, daysApart: number) => {
  // Get the time difference in milliseconds
  const timeDifference = Math.abs(date1.getTime() - date2.getTime());

  // Convert the time difference from milliseconds to days
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  console.log({ daysDifference });

  // Check if the difference is more than 6 days
  return daysDifference < daysApart;
};
