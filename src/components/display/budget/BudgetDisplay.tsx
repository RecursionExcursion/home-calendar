"use client";

import { useEffect, useState } from "react";
import BudgetWeekGraph from "./BudgetWeekGraph";
import {
  WeekGraphProps,
  getChargeSumsByWeek,
  getGraphParams,
} from "../../../service/graphService";
import { useUserContext } from "../../../contexts";

export default function BudgetDiplay() {
  const [renderedView, setRenderedView] = useState<JSX.Element | null>(null);
  const { user } = useUserContext();

  useEffect(() => {
    getChargeSumsByWeek(user._id.toString()).then((chargeMap) => {
      getGraphParams({
        charges: chargeMap,
        view: "week",
        userId: user._id.toString(),
      }).then((params) => {
        if (params === null) return;
        setRenderedView(<BudgetWeekGraph weekGraphProps={params as WeekGraphProps} />);
      });
    });
  }, []);

  return renderedView;
}
