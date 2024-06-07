"use client";

import DashboardSideBar from "../../components/dashboard/DashboardSideBar";
import { UserProvider } from "../../contexts/UserContext";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;
  return (
    <UserProvider>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <DashboardSideBar />
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>
    </UserProvider>
  );
}
