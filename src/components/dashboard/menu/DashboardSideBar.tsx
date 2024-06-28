"use client";

import Link from "next/link";
import { dashboardRoutes } from "../../../constants/routes";
import { getIconGroup } from "../../../lib/icons/icons";
import { DashboardIcons, IconGroupParams } from "../../../lib/icons/types";
import { useAppLoadingContext } from "../../../contexts/LoadingContext";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const iconSize = 30;

type DashboardSideBarProps = {
  hideMenu: () => void;
  setButtonDark: Dispatch<SetStateAction<boolean>>;
};

export default function DashboardSideBar(props: DashboardSideBarProps) {
  const { hideMenu, setButtonDark } = props;
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

    const isCurrentPath = pathname.localeCompare(href) === 0;

    console.log({ pathname });

    const handleLinkClick = () => {
      if (!isCurrentPath) setAppLoading(true);
      setButtonDark(false);
      hideMenu();
    };

    const wrapperClass = isCurrentPath
      ? "db-sidebar-link-wrapper-selected"
      : "db-sidebar-link-wrapper";

    const linkClass = isCurrentPath ? "db-sidebar-link-selected" : "db-sidebar-link";

    return (
      <div className={wrapperClass}>
        <Link onClick={handleLinkClick} className={linkClass} href={href} {...rest}>
          {children}
        </Link>
      </div>
    );
  };

  return (
    <div className="db-sidebar-container">
      <div className="db-sidebar-link-container">
        <SidebarLink href={dashboardRoutes.base}>
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
