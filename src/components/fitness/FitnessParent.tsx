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
import Counter from "./graphComponents/Counter";

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

  const tabs = [
    {
      name: "View",
      jsx:
        data.length > 0 ? (
          <ShowGraph controlState={controlState} data={data} />
        ) : (
          <button
            onClick={async () => {
              console.log(await getFitnessData(user._id.toString()));
            }}
          >
            "Import Data"
          </button>
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

type ShowGraphProps = {
  controlState: ControlState;
  data: RunnningWorkout[];
};

const ShowGraph = (props: ShowGraphProps) => {
  const { controlState, data } = props;
  const { divisor, slice } = controlState;

  const { slicedData, y_ceiling } = createGraphParams({
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

export default FitnessParent;
