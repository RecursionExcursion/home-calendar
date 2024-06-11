"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createNewUser } from "../../api/service/userService";
import { useAppContext } from "../../contexts";
import { H2, Input, Button } from "../base";

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
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <H2 theme="dashboard">Create an account!</H2>
        <Input
          theme="primary"
          placeholder="Username"
          value={newAccountCredentials.username}
          onChange={handleInputChange}
          name="username"
        />
        <Input
          theme="primary"
          placeholder="Password"
          value={newAccountCredentials.password}
          onChange={handleInputChange}
          name="password"
          type="password"
        />
        <Input
          theme="primary"
          placeholder="Confirm Password"
          value={newAccountCredentials.confirmPassword}
          onChange={handleInputChange}
          name="confirmPassword"
          type="password"
        />
        <Button child="Create Account" onClick={handleCreateAccount} />
      </div>
    </div>
  );
}
