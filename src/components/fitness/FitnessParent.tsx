"use client";

import { useState } from "react";
import FileInput from "./FileInput";
import { RunnningWorkout } from "@/types/fitness";
import { GraphControls } from "./graphComponents/GraphControls";
import { ControlState } from "./types";
import { createGraphParams } from "./util";
import Graph from "./graphComponents/Graph";
import WorkoutMetrics from "./WorkoutMetrics";
import RadioTabs from "../dashboard/nav/RadioTabs";
import useRadioTabs from "@/hooks/useRadioTabs";

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
    const { slicedData, distanceUnits,  totalDistance } =
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
        <Graph data={slicedData} divisor={divisor}  />
      </>
    );
  };

  const tabs = [
    {
      name: "View",
      jsx: <> {data.length > 0 ? showGraph() : "Import Data"}</>,
    },
    {
      name: "Import Date",
      jsx: <FileInput setState={setData} />,
    },
  ];

  const { selectedTab, tab } = useRadioTabs({ tabs });

  return (
    <div className="fitness-parent">
      {tab}
      {selectedTab.jsx}
    </div>
  );
};

export default FitnessParent;
