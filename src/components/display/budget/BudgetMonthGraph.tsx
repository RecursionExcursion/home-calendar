"use client";

import { roundToNextMultipleOf100 } from "../../../lib/util";
import { ChargeSum } from "../../../service/graphService";
import { colors } from "../../../styles/colors";

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
    <div className="row-container gap-0_5" style={{ alignItems: "start", width: "80%" }}>
      <div className="col-container" style={{ height: `${graphHeight}`, gap: "25px" }}>
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
        {charges.map((budget) => {
          const formattedDate = new Date(budget.utcDate).toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
          });

          return (
            <div key={budget.utcDate} className="col-container" style={{ width: "20%" }}>
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
                  className="col-container"
                  style={{
                    backgroundColor: colors.prioirtyColors.good,
                    width: "25px",
                    height: `${(budget.chargeSum / budgetMax) * 200}px`,
                  }}
                ></div>
                <span className="verticalText absolute-center" style={{}}>
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
