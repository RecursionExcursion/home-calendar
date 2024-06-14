"use client";

import { roundToNextMultipleOf100 } from "../../../lib/util";
import { colors } from "../../../styles/colors";
import { PastBudget } from "../../../types";

type BudgetGraphProps = {
  allBudgets: PastBudget[];
};

const graphHeight = "200px";

export default function BudgetMonthGraph(props: BudgetGraphProps) {
  const { allBudgets } = props;

  const last4Budgets = allBudgets.slice(-4);

  const budgetMax = roundToNextMultipleOf100(
    allBudgets.reduce((acc, budget) => {
      return Math.max(acc, budget.actual);
    }, 0)
  );

  return (
    <div
      className="rowContainer"
      style={{ alignItems: "start", width: "80%", gap: "0.5rem" }}
    >
      <div className="colContainer" style={{ height: `${graphHeight}`, gap: "25px" }}>
        <div>{budgetMax}</div>
        <div>{budgetMax * 0.75}</div>
        <div>{budgetMax * 0.5}</div>
        <div>{budgetMax * 0.25}</div>
        <div>{0}</div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-around",
        }}
      >
        {last4Budgets.map((budget) => {
          const formattedDate = new Date(budget.date).toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
          });

          return (
            <div key={budget.date} className="colContainer" style={{ width: "20%" }}>
              <div
                className="relative"
                style={{
                  height: `${graphHeight}`,
                  alignItems: "flex-end",
                  display: "flex",
                  backgroundColor: colors.darkGray,
                }}
              >
                <div
                  className="colContainer"
                  style={{
                    backgroundColor: colors.prioirtyColors.good,
                    width: "25px",
                    height: `${(budget.actual / budgetMax) * 200}px`,
                  }}
                ></div>
                <span className="verticalText absoluteCenter" style={{}}>
                  {budget.actual}
                </span>
              </div>
              <span>{formattedDate}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
