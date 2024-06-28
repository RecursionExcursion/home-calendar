"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import BudgetWeekGraph from "../../display/budget/BudgetWeekGraph";
import BudgetYearGraph from "../../display/budget/BudgetYearGraph";
import {
  ChargeSum,
  WeekGraphProps,
  getChargeSumsByWeek,
  getGraphParams,
} from "../../../service/graphService";
import BudgetMonthGraph from "../../display/budget/BudgetMonthGraph";
import { noDataText } from "../../../constants/misc";
import { useUserContext } from "../../../contexts";

export default function BudgetOverview() {
  const [renderedView, setRenderedView] = useState<JSX.Element | null>(null); //TODO Add no data view
  const [selectedView, setSelectedView] = useState<Views>("week");

  const { user } = useUserContext();

  //TODO move fetch calls to parent
  useEffect(() => {
    switch (selectedView) {
      case "week":
        getChargeSumsByWeek(user._id.toString()).then((chargeMap) => {
          getGraphParams({
            charges: chargeMap,
            view: "week",
            userId: user._id.toString(),
          }).then((params) => {
            params === null
              ? setRenderedView(<div className="flex">{noDataText}</div>)
              : setRenderedView(
                  <BudgetWeekGraph weekGraphProps={params as WeekGraphProps} />
                );
          });
        });

        break;
      case "last4":
        //TODO refactor, passing userid twice
        getChargeSumsByWeek(user._id.toString()).then((chargeMap) => {
          getGraphParams({
            charges: chargeMap,
            view: "last4",
            userId: user._id.toString(),
          }).then((params) => {
            params === null
              ? setRenderedView(<div className="full flex">{noDataText}</div>)
              : setRenderedView(<BudgetMonthGraph charges={params as ChargeSum[]} />);
          });
        });
        break;
      case "YTD":
        setRenderedView(<BudgetYearGraph />);
        break;
    }
  }, [selectedView]);

  return (
    <div className="db-budget-overview">
      <div className="db-budget-overview-radio-container">
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
      <div className="flex">{renderedView}</div>
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

  const className =
    selectedView === value
      ? "db-budget-overview-radio-button-wrapper-selected"
      : "db-budget-overview-radio-button-wrapper";

  return (
    <div className={className} onClick={handleLabelClick}>
      <input ref={inputRef} type="radio" placeholder="Search" name="type" hidden />
      <label>{getLabel()}</label>
    </div>
  );
};
