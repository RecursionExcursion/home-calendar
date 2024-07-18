"use client";

import { useEffect, useState } from "react";

type Tab = {
  name: string;
  jsx: JSX.Element;
};

type RadioTabsProps = {
  tabs: Tab[];
  className?: string;
  initialTabIndex?: number;
};

const useRadioTabs = (props: RadioTabsProps) => {
  const { tabs, initialTabIndex = 0, className } = props;
  const [selectedTabIndex, setSelectedTabIndex] = useState(initialTabIndex);
  const selectedTab = tabs[selectedTabIndex];

  const tabsJSX = () => {
    const handleTabClick = (index: number) => {
      setSelectedTabIndex(index);
    };

    const styleProps = className ?? "";

    return (
      <div className={`rt-container ${styleProps}`}>
        {tabs.map((tab, index) => {
          const className =
            tab.name === selectedTab.name ? "rt-tab-selected" : "rt-tab";

          return (
            <div
              key={tab.name + index}
              className={className}
              onClick={() => handleTabClick(index)}
            >
              {tab.name}
            </div>
          );
        })}
      </div>
    );
  };

  return {
    tab: tabsJSX(),
    selectedTab: selectedTab,
  };
};

export default useRadioTabs;
