"use client";

import Link from "next/link";
import { dashboardRoutes } from "../../constants/routes";
import { getIconGroup } from "../../lib/icons/icons";
import { DashboardIcons, IconGroupParams } from "../../lib/icons/types";

const iconSize = 30;

export default function DashboardSideBar() {
  const iconGroupParams: IconGroupParams = {
    iconGroup: "dashboardSidebar",
    iconPackage: "io",
  };
  const icons = getIconGroup(iconGroupParams) as DashboardIcons;
  return (
    <div className="db-sidebar-container"
    >
      <div>
        <SidebarLink href="/">
          <icons.home size={iconSize} />
        </SidebarLink>
        <SidebarLink href={dashboardRoutes.tasks}>
          <icons.tasks size={iconSize} />
        </SidebarLink>
        <SidebarLink href={dashboardRoutes.budget}>
          <icons.budget size={iconSize} />
        </SidebarLink>
        <SidebarLink href={dashboardRoutes.display}>
          <icons.display size={iconSize} />
        </SidebarLink>
        <SidebarLink href={dashboardRoutes.settings}>
          <icons.settings size={iconSize} />
        </SidebarLink>
        <SidebarLink href={dashboardRoutes.logout}>
          <icons.logout size={iconSize} />
        </SidebarLink>
      </div>
    </div>
  );
}

type DashBoardLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  children: React.ReactNode;
};

const SidebarLink = (props: DashBoardLinkProps) => {
  const { children, href = "/", ...rest } = props;
  return (
    <Link className="link" href={href} {...rest}>
      {children}
    </Link>
  );
};
