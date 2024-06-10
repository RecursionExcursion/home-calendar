"use client";

import { dashboardRoutes } from "../../constants/routes";
import { colors } from "../../styles/colors";
import StyledLink from "../base/Link";

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
        <DashboardLink href={dashboardRoutes.budget}>Budget</DashboardLink>
        <DashboardLink href={dashboardRoutes.display}>Display</DashboardLink>
        <DashboardLink href={dashboardRoutes.logout}>Log out</DashboardLink>
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
    <StyledLink
      style={{
        textWrap: "nowrap",
        color: `${colors.blueLink}`,
        textDecoration: "underline",
      }}
      href={href}
      {...rest}
    >
      {children}
    </StyledLink>
  );
};
