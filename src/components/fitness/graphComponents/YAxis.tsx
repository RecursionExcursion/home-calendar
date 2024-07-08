"use client";

import { getMonthDayAndDOW } from "@/lib/dateTimeUtil";
import { RunnningWorkout } from "@/types/fitness";

type YAxisProps = {
  data: RunnningWorkout[];
};

const YAxis = (props: YAxisProps) => {
  const { data } = props;

  return (
    <div className="y-axis">
      {data?.map((e) => {
        if (!e.date) {
          return;
        }

        const dateString = getMonthDayAndDOW(new Date(e.date));

        return (
          <div>
            <div className="date">{dateString}</div>
          </div>
        );
      })}
    </div>
  );
};
export default YAxis;
