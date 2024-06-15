"use client";

import { colors } from "../../../styles/colors";

export type BudgetGraphProps = {
  limit: number;
  total: number;
  barPercentage: number;
};

export default function BudgetWeekGraph(props: BudgetGraphProps) {
  const { limit, total, barPercentage } = props;

  let barColor: keyof typeof colors.prioirtyColors =
    barPercentage > 100 ? "danger" : barPercentage > 75 ? "warning" : "good";

  const spanText = `${total} / ${limit} (${barPercentage}%)`;

  return (
    <div
      className="col-container gap-1_5"
      style={{ width: "80%", padding: "0.5rem"}}
    >
      <div
        style={{
          fontSize: "1.5rem",
          lineHeight: "2rem",
          fontWeight: 600,
          color: colors.white,
        }}
      >
        Budget
      </div>
      <div
        className="basic-border relative"
        style={{
          width: "100%",
          height: "5rem",
        }}
      >
        <div
          className="row-container"
          style={{
            height: "100%",
            width: `${Math.min(barPercentage, 100)}%`,
            backgroundColor: colors.prioirtyColors[barColor],
          }}
        ></div>
        <span className="absolute-center" style={{ color: colors.white, fontWeight: 700 }}>
          {spanText}
        </span>
      </div>
    </div>
  );
}
