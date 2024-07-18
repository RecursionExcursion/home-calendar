"use client";

import { RunnningWorkout } from "@/types/fitness";
import { createWorkoutMetrics } from "./util";
import { heartRateUnits } from "./constants";
import CircleDot from "../ui/CircleDot";

type WorkoutMetricsProps = {
  data: RunnningWorkout[];
};

const WorkoutMetrics = (props: WorkoutMetricsProps) => {
  const { data } = props;

  const { distanceUnits, totalDistance, totalSteps, averageHeartRate } =
    createWorkoutMetrics(data);

  return (
    <div className="workout-metrics">
      {/* <div className="total-workouts">
        <span className="label">Total Workouts: </span>
        <span className="value">{data?.length}</span>
      </div> */}

      <CircleDot
        className="total-workouts"
        label="Total Workouts"
        value={data?.length}
      />

      <CircleDot
        className="total-distance"
        label="Total Distance"
        value={totalDistance.toFixed(2)}
        units={distanceUnits}
      />

      <CircleDot
        className="total-steps"
        label="Total Steps"
        value={totalSteps}
      />

      <CircleDot
        className="total-average-heart-rate"
        label="Average Heart Rate"
        value={averageHeartRate.toFixed(0)}
        units={heartRateUnits}
      />
    </div>
  );
};
export default WorkoutMetrics;
