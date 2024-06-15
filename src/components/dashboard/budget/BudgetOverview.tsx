"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import BudgetWeekGraph from "../../display/budget/BudgetWeekGraph";
import BudgetMonthGraph from "../../display/budget/BudgetMonthGraph";
import BudgetYearGraph from "../../display/budget/BudgetYearGraph";
import { Budget } from "../../../types";
import {
  getBudgetEntriesAsPastBudgets,
  getBudgetWeekGraphParams,
} from "../../../service/budgetService";
import { colors } from "../../../styles/colors";

type BudgetOverviewProps = {
  budgetJson: string;
};

export default function BudgetOverview(props: BudgetOverviewProps) {
  const { budgetJson } = props;
  const parsedBudget = JSON.parse(budgetJson) as Budget;

  const [renderedView, setRenderedView] = useState<JSX.Element | null>(null);
  const [selectedView, setSelectedView] = useState<Views>("week");

  useEffect(() => {
    switch (selectedView) {
      case "week":
        getBudgetWeekGraphParams(parsedBudget).then((params) => {
          setRenderedView(<BudgetWeekGraph {...params} />);
        });
        break;
      case "last4":
        getBudgetEntriesAsPastBudgets(parsedBudget).then((pastBudgets) => {
          setRenderedView(<BudgetMonthGraph allBudgets={pastBudgets} />);
        });
        break;
      case "YTD":
        setRenderedView(<BudgetYearGraph />);
        break;
    }
  }, [selectedView]);

  return (
    <div
      className="greedy-container"
      style={{
        padding: "0 1rem",
      }}
    >
      <div
        className="row-container"
        style={{
          height: "25%",
        }}
      >
        <BudgetOverviewRadioButton
          selectedView={selectedView}
          setView={setSelectedView}
          value="week"
        />
        <BudgetOverviewRadioButton
          selectedView={selectedView}
          setView={setSelectedView}
          value="last4"
        />
        {/* <BudgetOverviewRadioButton setView={setSelectedView} value="YTD" /> */}
      </div>
      <div className="row-container">{renderedView}</div>
    </div>
  );
}

type Views = "week" | "month" | "YTD" | "last4";

type BudgetOverviewRadioButtonProps = {
  value: Views;
  selectedView: Views;
  setView: Dispatch<SetStateAction<Views>>;
};

const BudgetOverviewRadioButton = (props: BudgetOverviewRadioButtonProps) => {
  const { value, selectedView, setView } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleLabelClick = () => {
    inputRef.current?.click();
    setView(value);
  };

  const getLabel = () => {
    switch (value) {
      case "week":
        return "Week";
      case "month":
        return "Month";
      case "YTD":
        return "Year";
      case "last4":
        return "Last 4";
    }
  };

  return (
    <div
      className="basic-border flex-grow"
      style={{
        padding: "0.5rem",
        backgroundColor: `${selectedView === value ? colors.darkGray : "transparent"}`,
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={handleLabelClick}
    >
      <input ref={inputRef} type="radio" placeholder="Search" name="type" hidden />
      <label>{getLabel()}</label>
    </div>
  );
};
