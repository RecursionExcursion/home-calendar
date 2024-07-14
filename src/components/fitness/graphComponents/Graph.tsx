"use client";

import { RunnningWorkout } from "@/types/fitness";
import Bar from "./Bar";
import XAxis from "./XAxis";
import YAxis from "./YAxis";
import { generateGuid } from "../util";

type GraphProps = {
  data: RunnningWorkout[];
  ceilings: Record<string, number>;
  divisor: number;
};

const Graph = (props: GraphProps) => {
  const { data, ceilings, divisor } = props;
  return (
    <div className="graph-container">
      <div className="graph">
        {/* <XAxis ceiling={ceiling} divisor={divisor} /> */}
        <div className="graph-data">
          {data.map((e, i) => {
            return (
              <div className="bar-container" key={generateGuid()}>
                <Bar
                  dataType="distance"
                  className="distance"
                  ceiling={ceilings.distance}
                  data={e}
                />
                <Bar
                  dataType="heartRate"
                  className="heartRate"
                  ceiling={ceilings.heartRate}
                  data={e}
                />
                <Bar
                  dataType="stepCount"
                  className="stepCount"
                  ceiling={ceilings.stepCount}
                  data={e}
                />
              </div>
            );
          })}
        </div>
        <YAxis data={data} />
      </div>
    </div>
  );
};
export default Graph;
