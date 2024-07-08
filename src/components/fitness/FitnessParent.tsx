"use client";

import { useState } from "react";
import FileInput from "./FileInput";
import { RunnningWorkout } from "@/types/fitness";
import { GraphControls } from "./graphComponents/GraphControls";
import { ControlState } from "./types";
import { createGraphParams } from "./util";
import Graph from "./graphComponents/Graph";
import WorkoutMetrics from "./WorkoutMetrics";

const FitnessParent = () => {
  const [data, setData] = useState<RunnningWorkout[]>([]);
  const [slice, setSlice] = useState(7);
  const [divisor, setDivisor] = useState(5);

  const controlState: ControlState = {
    slice,
    setSlice,
    divisor,
    setDivisor,
  };

  const showGraph = () => {
    const { slicedData, distanceUnits, y_ceiling, totalDistance } =
      createGraphParams({
        slice,
        divisor,
        data,
      });

    return (
      <>
      <GraphControls {...controlState} />
        <WorkoutMetrics
          data={slicedData}
          distance={totalDistance}
          distanceUnts={distanceUnits}
        />
        <Graph data={slicedData} divisor={divisor} ceiling={y_ceiling} />
      </>
    );
  };

  return (
    <div className="fitness-parent">
      <FileInput setState={setData} />
      {data.length > 0 && showGraph()}
    </div>
  );
};

export default FitnessParent;
