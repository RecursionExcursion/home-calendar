"use client";

import { CSSProperties } from "react";
import { WeekGraphProps } from "../../../service/graphService";

export type BudgetGraphProps = {
  weekGraphProps: WeekGraphProps;
};

export default function BudgetWeekGraph(props: BudgetGraphProps) {
  const { limit, total, barPercentage } = props.weekGraphProps;

  console.log({ total });

  const spanText = `${total} / ${limit} (${barPercentage}%)`;

  const barFillStyle =
    barPercentage > 100
      ? "bud-week-graph-bar-fill-danger"
      : barPercentage > 75
      ? "bud-week-graph-bar-fill-warning"
      : "bud-week-graph-bar-fill-good";

  return (
    <div className="bud-week-graph-container">
      <h3>Budget</h3>
      <div className="bud-week-graph-bar">
        <div
          className={barFillStyle}
          style={
            {
              "--budget-width": `${Math.min(barPercentage, 100)}%`,
            } as CSSProperties
          }
        />
        <span>{spanText}</span>
      </div>
    </div>
  );
}
