"use client";

import { useState } from "react";
import FileInput from "./FileInput";
import { Fitness, RunnningWorkout } from "@/types/fitness";
// import { GraphControls } from "./graphComponents/GraphControls";
import { ControlState } from "./types";
import { createGraphParams } from "./util";
import Graph from "./graphComponents/Graph";
import WorkoutMetrics from "./WorkoutMetrics";
import useRadioTabs from "@/hooks/useRadioTabs";
import { getFitnessData } from "@/service/fitnessService";
import { useUserContext } from "@/contexts";
import Counter from "./graphComponents/Counter";
import DateRangePicker from "../base/DateRangePicker";

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

  const todaysDate = new Date();
  const oneMonthAgo = new Date(todaysDate);
  oneMonthAgo.setMonth(todaysDate.getMonth() - 1);

  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(todaysDate);

  const controlState: ControlState = {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    divisor
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
  const { startDate, setStartDate, endDate, setEndDate, divisor } = controlState;

  const { slicedData, y_ceiling } = createGraphParams({
    data,
    divisor,
    startDate,
    endDate
  });

  return (
    <>
      {/* <GraphControls {...controlState} /> */}
      <DateRangePicker
        startDate={{ date: startDate, setDate: setStartDate }}
        endDate={{ date: endDate, setDate: setEndDate }}
      />
      <WorkoutMetrics data={slicedData} />
      <Graph data={slicedData} divisor={divisor} ceilings={y_ceiling} />
    </>
  );
};

export default FitnessParent;
