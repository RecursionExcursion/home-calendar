"use client";

import { useState } from "react";
import Button from "../base/Button";
import Input from "../base/Input";
import { useRouter } from "next/navigation";
import { login } from "../../service/loginService";
import { useAppContext } from "../../contexts/AppContext";

export default function LoginUI() {
  const router = useRouter();
  const { showToast } = useAppContext();

  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    const resp = await login(
      loginCredentials.username,
      loginCredentials.password
    );

    if (!resp.success) {
      showToast({
        title: "Login Failed",
        message: resp.message,
        type: "error",
      });
    } else {
      router.push("/dashboard");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex h-full items-center">
      <div className="flex flex-col gap-2 items-center text-black">
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
      </div>
    </div>
  );
}
