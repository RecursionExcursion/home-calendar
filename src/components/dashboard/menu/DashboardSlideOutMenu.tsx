"use client";

import { useState } from "react";
import { getIconGroup } from "../../../lib/icons/icons";
import { DashboardIcons, IconGroupParams } from "../../../lib/icons/types";
import DashboardSideBar from "./DashboardSideBar";

export default function DashboardSlideOutMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const [buttonDark, setButtonDark] = useState(false);

  const [sidebarClassname, setSidebarClassname] = useState(
    "db-slide-out-container-enter"
  );

  const handleClick = () => {
    if (showMenu) {
      setButtonDark(false);
      setSidebarClassname("db-slide-out-container-exit");
      setTimeout(() => {
        setShowMenu(false);
      }, 700);
    } else {
      setButtonDark(true);
      setSidebarClassname("db-slide-out-container-enter");
      setShowMenu(true);
    }
  };

  const iconGroupParams: IconGroupParams = {
    iconGroup: "dashboardSidebar",
    iconPackage: "fa",
  };

  const icons = getIconGroup(iconGroupParams) as DashboardIcons;

  const iconSize = 50;

  return (
    <>
      <div
        className={buttonDark ? "db-slide-out-toggle-clicked" : "db-slide-out-toggle"}
        onMouseDown={handleClick}
      >
        <icons.menu size={iconSize} />
      </div>
      {showMenu && (
        <div className={sidebarClassname}>
          <DashboardSideBar hideMenu={() => setShowMenu(false)} />
        </div>
      )}
    </>
  );
}
