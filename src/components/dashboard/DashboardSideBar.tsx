"use client";

import { dashboardRoutes } from "../../constants/routes";
import { colors } from "../../styles/colors";
import StyledLink from "../base/Link";
import {
  FaHouse,
  FaListCheck,
  FaDollarSign,
  FaTv,
  FaGear,
  FaRightFromBracket,
} from "react-icons/fa6";

const iconSize = 30;
export default function DashboardSideBar() {
  return (
    <div
      style={{
        width: "3rem",
        height: "100%",
        backgroundColor: colors.blueGray,
        padding: "0 1rem",
      }}
    >
      <div className="colContainer" style={{ gap: "5rem", height: "100%" }}>
        <DashboardLink href="/">
          <FaHouse size={iconSize} />
        </DashboardLink>
        <DashboardLink href={dashboardRoutes.tasks}>
          <FaListCheck size={iconSize} />
        </DashboardLink>
        <DashboardLink href={dashboardRoutes.budget}>
          <FaDollarSign size={iconSize} />
        </DashboardLink>
        <DashboardLink href={dashboardRoutes.display}>
          <FaTv size={iconSize} />
        </DashboardLink>
        <DashboardLink href={dashboardRoutes.settings}>
          <FaGear size={iconSize} />
        </DashboardLink>
        <DashboardLink href={dashboardRoutes.logout}>
          <FaRightFromBracket size={iconSize} />
        </DashboardLink>
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
