"use client";

import { AddChargeInterface } from "./AddChargeInterface";
import { useState } from "react";
import RadioTabs from "../nav/RadioTabs";
import ManageChargesInterface from "./ManageChargesInterface";

export default function DashboardBudgetUI() {
  const tabs = [
    {
      name: "Add Charges",
      jsx: <AddChargeInterface />,
    },

    // {/* TODO: This needs to be rehashed out and maybe moved to settings */}
    // {/* <EditBudgetInteface budgetState={{ budget, setBudget }} /> */},
    { name: "Manage Charges", jsx: <ManageChargesInterface /> },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className="full flex-col relative">
      <RadioTabs tabs={tabs} selectedTab={selectedTab} tabSetter={setSelectedTab} />
      <div className="bui-container">{selectedTab.jsx}</div>
    </div>
  );
}
