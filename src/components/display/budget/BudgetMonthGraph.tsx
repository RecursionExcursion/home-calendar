"use client";

import { CSSProperties } from "react";
import { roundToNextMultipleOf100 } from "../../../lib/util";
import { ChargeSum } from "../../../service/graphService";

type BudgetGraphProps = {
  charges: ChargeSum[];
};

const graphHeight = "200px";

export default function BudgetMonthGraph(props: BudgetGraphProps) {
  const { charges } = props;

  const budgetMax = roundToNextMultipleOf100(
    charges.reduce((acc, charge) => {
      return Math.max(acc, charge.chargeSum);
    }, 0)
  );

  return (
    <div className="bud-month-graph-container">
      <div className="bud-month-graph-y-axis">
        <div>{budgetMax}</div>
        <div>{budgetMax * 0.75}</div>
        <div>{budgetMax * 0.5}</div>
        <div>{budgetMax * 0.25}</div>
        <div>{0}</div>
      </div>
      <div className="bud-month-graph-graph-container">
        {charges.map((budget) => {
          const formattedDate = new Date(budget.utcDate).toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
          });

          return (
            <div key={budget.utcDate} className="bud-month-graph-bar-container">
              <div className="bud-month-graph-bar">
                <div
                  className="bud-month-graph-bar-budget"
                  style={
                    {
                      "--budget-amount": `${(budget.chargeSum / budgetMax) * 200}px`,
                    } as CSSProperties
                  }
                ></div>
                <span className="verticalText absolute-center">
                  {budget.chargeSum.toFixed(0)}
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
