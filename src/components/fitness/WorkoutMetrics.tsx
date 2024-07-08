"use client";

import { RunnningWorkout } from "@/types/fitness";

type WorkoutMetricsProps = {
  data:  RunnningWorkout[],
  distance: number,
  distanceUnts: string
}

const WorkoutMetrics = (props: WorkoutMetricsProps) => {
  const {data, distance,distanceUnts } = props;
  return (
    <div className="workout-metrics">
      <div className="total-workouts">{`Total Workouts: ${data?.length}`}</div>
      <div className="total-distance">{`Total Distance: ${distance.toFixed(
        2
      )} ${distanceUnts}`}</div>
    </div>
  );
};
export default WorkoutMetrics;
