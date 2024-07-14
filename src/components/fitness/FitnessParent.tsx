"use client";

import { useState } from "react";
import FileInput from "./FileInput";
import { Fitness, RunnningWorkout } from "@/types/fitness";
import { GraphControls } from "./graphComponents/GraphControls";
import { ControlState } from "./types";
import { createGraphParams } from "./util";
import Graph from "./graphComponents/Graph";
import WorkoutMetrics from "./WorkoutMetrics";
import useRadioTabs from "@/hooks/useRadioTabs";
import { getFitnessData } from "@/service/fitnessService";
import { useUserContext } from "@/contexts";

type FitnessParentProps = {
  fitnessData: string;
};
const FitnessParent = ({ fitnessData }: FitnessParentProps) => {
  const userFitness = JSON.parse(fitnessData) as Fitness;

  const { user } = useUserContext();
  const [data, setData] = useState<RunnningWorkout[]>(
    userFitness.runningWorkouts
  );
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
        <WorkoutMetrics data={slicedData} />
        <Graph data={slicedData} divisor={divisor} ceilings={y_ceiling} />
      </>
    );
  };

  const tabs = [
    {
      name: "View",
      jsx: (
        <>
          {" "}
          {data.length > 0 ? (
            showGraph()
          ) : (
            <button
              onClick={async () => {
                console.log(await getFitnessData(user._id.toString()));
              }}
            >
              "Import Data"
            </button>
          )}
        </>
      ),
    },
    {
      name: "Import Data",
      jsx: <FileInput setState={setData} fitnessData={userFitness} />,
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
