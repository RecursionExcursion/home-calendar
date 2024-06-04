"use client";

import { transform } from "next/dist/build/swc";

type BudgetGraphProps = {
  limit: number;
  total: number;
  barPercentage: number;
};

export default function BudgetGraph(props: BudgetGraphProps) {
  const { limit, total, barPercentage } = props;

  const nearstMultipleOfFive = Math.min(Math.round(barPercentage / 5) * 5, 100);

  let barColor = "good";

  if (barPercentage > 75) {
    barColor = "warning";
  }
  if (barPercentage > 100) {
    barColor = "danger";
  }

  const spanText = `${total} / ${limit} (${barPercentage}%)`;

  return (
    <div className="w-full flex flex-col items-center p-2 gap-5">
      <div className="text-2xl font-semibold">Budget</div>
      <div className="w-full h-20 border border-white relative">
        <div
          className={`${barWidthMap.get(
            nearstMultipleOfFive
          )} ${barBackgroundMap.get(
            barColor
          )} h-full flex justify-center items-center`}
        ></div>
        <span
          className="text-white font-bold"
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            left: `50%`,
            top: `50%`,
          }}
        >
          {spanText}
        </span>
      </div>
    </div>
  );
}

const barWidthMap = new Map<number, string>([
  [0, "w-[0%]"],
  [5, "w-[5%]"],
  [10, "w-[10%]"],
  [15, "w-[15%]"],
  [20, "w-[20%]"],
  [25, "w-[25%]"],
  [30, "w-[30%]"],
  [35, "w-[35%]"],
  [40, "w-[40%]"],
  [45, "w-[45%]"],
  [50, "w-[50%]"],
  [55, "w-[55%]"],
  [60, "w-[60%]"],
  [65, "w-[65%]"],
  [70, "w-[70%]"],
  [75, "w-[75%]"],
  [80, "w-[80%]"],
  [85, "w-[85%]"],
  [90, "w-[90%]"],
  [95, "w-[95%]"],
  [100, "w-[100%]"],
]);

const barBackgroundMap = new Map<string, string>([
  ["good", "bg-green-300"],
  ["warning", "bg-yellow-300"],
  ["danger", "bg-red-300"],
]);
