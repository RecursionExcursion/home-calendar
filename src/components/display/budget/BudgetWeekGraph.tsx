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
      className="colContainer"
      style={{ width: "80%", padding: "0.5rem", gap: "1.25rem" }}
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
        className="basicBorder relative"
        style={{
          width: "100%",
          height: "5rem",
        }}
      >
        <div
          className="rowContainer"
          style={{
            height: "100%",
            width: `${Math.min(barPercentage, 100)}%`,
            backgroundColor: colors.prioirtyColors[barColor],
          }}
        ></div>
        <span className="absoluteCenter" style={{ color: colors.white, fontWeight: 700 }}>
          {spanText}
        </span>
      </div>
    </div>
  );
}
