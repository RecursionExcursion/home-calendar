"use client";

import { useState } from "react";

type Tab = {
  name: string;
  jsx: JSX.Element;
};

type RadioTabsProps = {
  tabs: Tab[];
  className?: string;
  initialTabIndex?:number;
};

const useRadioTabs = (props: RadioTabsProps) => {
  const { tabs, initialTabIndex = 0, className } = props;
  const [selectedTab, setSelectedTab] = useState(tabs[initialTabIndex]);

  const tabsJSX = () => {
    const handleTabClick = (tab: Tab) => {
      setSelectedTab(tab);
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
              onClick={() => handleTabClick(tab)}
            >
              {tab.name}
            </div>
          );
        })}
      </div>
    );
  };

  return {
    tab:tabsJSX(), selectedTab
  };
};

export default useRadioTabs;
