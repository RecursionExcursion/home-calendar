"use client";

import DashboardSideBar from "../../components/dashboard/DashboardSideBar";
import { DashboardProvider } from "../../contexts/DashboardContext";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;
  return (
    <div className="w-full h-full flex">
      <DashboardSideBar />
      <div className="w-full h-full flex items-center justify-center relative">
        <DashboardProvider>{children}</DashboardProvider>
      </div>
    </div>
  );
}
