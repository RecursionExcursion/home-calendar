"use client";

import { useEffect, useState } from "react";
import BudgetWeekGraph from "./BudgetWeekGraph";
import {
  WeekGraphProps,
  getChargeSumsByWeek,
  getGraphParams,
} from "../../../service/graphService";

export default function BudgetDiplay() {
  const [renderedView, setRenderedView] = useState<JSX.Element | null>(null);

  useEffect(() => {
    getChargeSumsByWeek().then((chargeMap) => {
      getGraphParams({
        charges: chargeMap,
        view: "week",
      }).then((params) => {
        if (params === null) return;
        setRenderedView(<BudgetWeekGraph weekGraphProps={params as WeekGraphProps} />);
      });
    });
  }, []);

  return renderedView;
}
