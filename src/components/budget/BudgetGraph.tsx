"use client";

import { colors } from "../../styles/colors";

type BudgetGraphProps = {
  limit: number;
  total: number;
  barPercentage: number;
};

export default function BudgetGraph(props: BudgetGraphProps) {
  const { limit, total, barPercentage } = props;

  let barColor: keyof typeof colors.prioirtyColors =
    barPercentage > 100 ? "danger" : barPercentage > 75 ? "warning" : "good";

  const spanText = `${total} / ${limit} (${barPercentage}%)`;

  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
        padding: "0.5rem",
        gap: "1.25rem",
      }}
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
        style={{
          width: "100%",
          height: "5rem",
          border: "1px solid white",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: `${barPercentage}%`,
            backgroundColor: colors.prioirtyColors[barColor],
          }}
        ></div>
        <span
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            left: `50%`,
            top: `50%`,
            color: colors.white,
            fontWeight: 700,
          }}
        >
          {spanText}
        </span>
      </div>
    </div>
  );
}
