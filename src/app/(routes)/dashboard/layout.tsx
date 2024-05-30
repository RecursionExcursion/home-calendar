"use client";

import DashboardSideBar from "../../_components/dashboard/DashboardSideBar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;
  return (
    <div className="w-full h-full flex">
      <DashboardSideBar />
      <div className="w-full h-full flex items-center justify-center">{children}</div>
    </div>
  );
}
