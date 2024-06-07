"use client";

import Link from "next/link";
import { calendarRoutes, dashboardRoutes } from "../../constants/routes";
import { colors } from "../../styles/colors";

export default function DashboardSideBar() {
  return (
    <div
      style={{
        width: "4rem",
        height: "100%",
        backgroundColor: "#1a202c",
        padding: "0 1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5rem",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <DashboardLink href="/">Home</DashboardLink>
        <DashboardLink href={dashboardRoutes.tasks}>Add Task</DashboardLink>
        <DashboardLink href={calendarRoutes.month}>Display</DashboardLink>
        <DashboardLink href={dashboardRoutes.budget}>Budget</DashboardLink>
      </div>
    </div>
  );
}

type DashBoardLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  children: React.ReactNode;
};

const DashboardLink = (props: DashBoardLinkProps) => {
  const { children, href = "/", ...rest } = props;
  return (
    <Link
      style={{
        textWrap: "nowrap",
        // transform: "rotate(-90deg)",
        color: `${colors.blueLink}`,
        textDecoration: "underline",
      }}
      href={href}
      {...rest}
    >
      {children}
    </Link>
  );
};
