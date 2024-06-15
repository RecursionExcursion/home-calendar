"use client";

import { dashboardRoutes } from "../../constants/routes";
import { getIconGroup } from "../../lib/icons/icons";
import { DashboardIcons, IconGroupParams } from "../../lib/icons/types";
import { colors } from "../../styles/colors";
import StyledLink from "../base/Link";

const iconSize = 30;

export default function DashboardSideBar() {
  const iconGroupParams: IconGroupParams = {
    iconGroup: "dashboardSidebar",
    iconPackage: "io",
  };
  const icons = getIconGroup(iconGroupParams) as DashboardIcons;
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
          <icons.home size={iconSize} />
        </DashboardLink>
        <DashboardLink href={dashboardRoutes.tasks}>
          <icons.tasks size={iconSize} />
        </DashboardLink>
        <DashboardLink href={dashboardRoutes.budget}>
          <icons.budget size={iconSize} />
        </DashboardLink>
        <DashboardLink href={dashboardRoutes.display}>
          <icons.display size={iconSize} />
        </DashboardLink>
        <DashboardLink href={dashboardRoutes.settings}>
          <icons.settings size={iconSize} />
        </DashboardLink>
        <DashboardLink href={dashboardRoutes.logout}>
          <icons.logout size={iconSize} />
        </DashboardLink>{" "}
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
