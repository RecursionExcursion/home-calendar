"use client";

import { RunnningWorkout } from "@/types/fitness";
import Bar from "./Bar";
import XAxis from "./XAxis";
import YAxis from "./YAxis";

type GraphProps = {
  data: RunnningWorkout[];
  ceiling: number;
  divisor: number;
};

const Graph = (props: GraphProps) => {
  const { data, ceiling, divisor } = props;
  return (
    <div className="graph-container">
      <div className="graph">
        <XAxis ceiling={ceiling} divisor={divisor} />
        <div className="graph-data">
          {data.map((e, i) => {
            return <Bar key={i} ceiling={ceiling} data={e} />;
          })}
        </div>
        <YAxis data={data} />
      </div>
    </div>
  );
};
export default Graph;
