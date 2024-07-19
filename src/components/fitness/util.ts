import { v4 as uuidV4 } from "uuid";
import { RunnningWorkout } from "@/types/fitness";
import { FitnessGraphParams } from "./types";
import { changeDate } from "@/lib/dateTimeUtil";

export const createGraphParams = (params: FitnessGraphParams) => {
  const { divisor, data, startDate, endDate } = params;

  const slicedData = sortAndSliceData(data, startDate, endDate);

  const foo = (parser: (run: RunnningWorkout) => number) => {
    const maxDistance = slicedData
      .map((run) => {
        const runSum = parser(run);
        // const runSum = parseFloat(run.stepCount?.sum ?? "0");
        return runSum;
      })
      .reduce((max, curr) => {
        return Math.max(max, curr);
      });
    return roundToNextDivisor(maxDistance, divisor);
  };

  const y_ceiling = {
    heartRate: foo((run) => parseFloat(run.heartRate?.average ?? "0")),
    runningSpeed: foo((run) => parseFloat(run.runningSpeed?.average ?? "0")),
    distance: foo((run) => parseFloat(run.distance?.sum ?? "0")),
    basalEnergyBurned: foo((run) =>
      parseFloat(run.basalEnergyBurned?.sum ?? "0")
    ),
    activeEnergyBurned: foo((run) =>
      parseFloat(run.activeEnergyBurned?.sum ?? "0")
    ),
    stepCount: foo((run) => parseFloat(run.stepCount?.sum ?? "0")),
  };

  const totalDistance = slicedData
    .map((data) => parseFloat(data.distance?.sum ?? "0"))
    .reduce((a, b) => a + b, 0);

  const totalSteps = slicedData
    .map((data) => parseInt(data.stepCount?.sum ?? "0"))
    .reduce((a, b) => a + b, 0);

  const distanceUnits = slicedData[0].distance?.unit ?? "Unknown";

  return {
    slicedData,
    distanceUnits,
    y_ceiling,
    totalDistance,
    totalSteps,
  };
};

const sortAndSliceData = (
  data: RunnningWorkout[],
  startDate: Date,
  endDate: Date
) => {
  const sortedData = data?.sort((a, b) => {
    if (!a.date || !b.date) {
      return 0;
    }
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return aDate.getTime() - bDate.getTime();
  });


  const filteredData = sortedData.filter((workout) => {
    if (workout.date) {
      const workoutDate = new Date(workout.date);
      return workoutDate >= startDate && workoutDate < changeDate( endDate, 1, "day");
    }
  });

  return filteredData;
};

export const createWorkoutMetrics = (slicedData: RunnningWorkout[]) => {
  const totalDistance = slicedData
    .map((data) => parseFloat(data.distance?.sum ?? "0"))
    .reduce((a, b) => a + b, 0);

  const distanceUnits = slicedData[0].distance?.unit ?? "Unknown";

  const totalSteps = slicedData
    .map((data) => parseInt(data.stepCount?.sum ?? "0"))
    .reduce((a, b) => a + b, 0);

  const averageHeartRate =
    slicedData
      .map((data) => parseInt(data.heartRate?.average ?? "0"))
      .reduce((a, b) => a + b, 0) / slicedData.length;

  return {
    totalDistance,
    distanceUnits,
    totalSteps,
    averageHeartRate,
  };
};

//TODO: make this into a closure ;)
const roundToNextDivisor = (num: number, divisor: number) => {
  const remaining = divisor - (num % divisor);
  return num + remaining;
};

export const generateGuid = () => {
  return uuidV4();
};
