"use client";

import { Dispatch, SetStateAction } from "react";

type Tab = {
  name: string;
  jsx: JSX.Element;
  classNames?: string[];
};

type RadioTabsProps = {
  tabs: Tab[];
  selectedTab: Tab;
  tabSetter: Dispatch<SetStateAction<Tab>>;
  classNames?: string;
};

export default function RadioTabs(props: RadioTabsProps) {
  const { tabs, tabSetter, selectedTab } = props;

  const handleTabClick = (tab: Tab) => {
    tabSetter(tab);
  };

  return (
    <div className="rt-container">
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
}
