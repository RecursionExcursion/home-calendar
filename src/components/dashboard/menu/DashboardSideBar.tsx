"use client";

import Link from "next/link";
import { dashboardRoutes } from "../../../constants/routes";
import { getIconGroup } from "../../../lib/icons/icons";
import { DashboardIcons, IconGroupParams } from "../../../lib/icons/types";
import { useAppLoadingContext } from "../../../contexts/LoadingContext";
import { usePathname } from "next/navigation";

const iconSize = 30;

type DashboardSideBarProps = {
  hideMenu: () => void;
};

export default function DashboardSideBar(props: DashboardSideBarProps) {
  const { hideMenu } = props;
  const { setAppLoading } = useAppLoadingContext();

  const pathname = usePathname();

  const iconGroupParams: IconGroupParams = {
    iconGroup: "dashboardSidebar",
    iconPackage: "io",
  };
  const icons = getIconGroup(iconGroupParams) as DashboardIcons;

  type DashBoardLinkProps = React.ComponentPropsWithoutRef<"a"> & {
    children: React.ReactNode;
  };

  const SidebarLink = (props: DashBoardLinkProps) => {
    const { children, href = "/", ...rest } = props;

    const handleLinkClick = () => {
      if (pathname.localeCompare(href) != 0) setAppLoading(true);
      hideMenu();
    };

    return (
      <Link onClick={handleLinkClick} className="link" href={href} {...rest}>
        {children}
      </Link>
    );
  };

  return (
    <div className="db-sidebar-container">
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
        <SidebarLink href={dashboardRoutes.surf}>
          <icons.surf size={iconSize} />
        </SidebarLink>
        <SidebarLink href={dashboardRoutes.settings}>
          <icons.settings size={iconSize} />
        </SidebarLink>
        <SidebarLink href={dashboardRoutes.database}>
          <icons.database size={iconSize} />
        </SidebarLink>
        <SidebarLink href={dashboardRoutes.logout}>
          <icons.logout size={iconSize} />
        </SidebarLink>
      </div>
    </div>
  );
}
