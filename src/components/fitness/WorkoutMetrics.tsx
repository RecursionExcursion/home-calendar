"use client";

import { RunnningWorkout } from "@/types/fitness";
import { createWorkoutMetrics } from "./util";
import { heartRateUnits } from "./constants";

type WorkoutMetricsProps = {
  data: RunnningWorkout[];
};

const WorkoutMetrics = (props: WorkoutMetricsProps) => {
  const { data } = props;

  const { distanceUnits, totalDistance, totalSteps, averageHeartRate } =
    createWorkoutMetrics(data);

  return (
    <div className="workout-metrics">
      <div className="total-workouts">
        <span className="label">Total Workouts: </span>
        <span className="value">{data?.length}</span>
      </div>
      <div className="total-distance">
        <span className="label">Total Distance: </span>
        <span className="value">
          {totalDistance.toFixed(2)} {distanceUnits}
        </span>
      </div>

      <div className="total-steps">
        <span className="label">Total Steps: </span>
        <span className="value">
          {totalSteps}
        </span>
      </div>

      <div className="total-average-heart-rate">
        <span className="label">Average Heart Rate: </span>
        <span className="value">
          {averageHeartRate.toFixed(0)} {heartRateUnits}
        </span>
      </div>
    </div>
  );
};
export default WorkoutMetrics;
