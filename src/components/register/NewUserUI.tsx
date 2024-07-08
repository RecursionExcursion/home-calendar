"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createNewUser } from "../../app/api/user/userServiceApi";
import { useAppContext, useDashboardContext } from "../../contexts";

export default function NewUserUI() {
  const { showToast } = useAppContext();
  const router = useRouter();

  const [newAccountCredentials, setNewAccountCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleCreateAccount = () => {
    if (
      !newAccountCredentials.username ||
      !newAccountCredentials.password ||
      !newAccountCredentials.confirmPassword
    ) {
      showToast({
        title: "Error",
        message: "Please fill all the fields",
        type: "error",
      });
      return;
    }

    if (newAccountCredentials.password !== newAccountCredentials.confirmPassword) {
      showToast({
        title: "Error",
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }

    createNewUser(newAccountCredentials.username, newAccountCredentials.password).then(
      (res) => {
        if (res) {
          showToast({
            title: "Success",
            message: "Account created successfully",
            type: "success",
          });
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          showToast({
            title: "Error",
            message: "Account creation failed",
            type: "error",
          });
        }
      }
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccountCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ height: "100%", display: "flex", justifyContent: "center" }}>
      <div className="flex-col gap-1">
        <h2>Create an account!</h2>
        <input
          className="login-input"
          placeholder="Username"
          value={newAccountCredentials.username}
          onChange={handleInputChange}
          name="username"
        />
        <input
          className="login-input"
          placeholder="Password"
          value={newAccountCredentials.password}
          onChange={handleInputChange}
          name="password"
          type="password"
        />
        <input
          className="login-input"
          placeholder="Confirm Password"
          value={newAccountCredentials.confirmPassword}
          onChange={handleInputChange}
          name="confirmPassword"
          type="password"
        />
        <button className="login-button" onClick={handleCreateAccount}>
          Create Account
        </button>
      </div>
    </div>
  );
}
