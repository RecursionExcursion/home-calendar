import { RunnningWorkout } from "@/types/fitness";
import { FitnessGraphParams } from "./types";

export const createGraphParams = (params: FitnessGraphParams) => {
  const { data, divisor, slice } = params;

  const sortedData = data?.sort((a, b) => {
    if (!a.date || !b.date) {
      return 0;
    }
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return aDate.getTime() - bDate.getTime();
  });

  const startIndex = sortedData.length - slice;

  const slicedData = sortedData?.slice(startIndex);

  const maxDistance = calcMaxDist(slicedData);
  const y_ceiling = roundToNextDivisor(maxDistance, divisor);

  const totalDistance = slicedData
    .map((data) => parseFloat(data.distance?.sum ?? "0"))
    .reduce((a, b) => a + b, 0);

  const distanceUnits = slicedData[0].distance?.unit ?? "Unknown";
  return {
    slicedData,
    distanceUnits,
    y_ceiling,
    totalDistance
  };
};

//TODO: make this into a closure ;)
const roundToNextDivisor = (num: number, divisor: number) => {
  const remaining = divisor - (num % divisor);
  return num + remaining;
};

const calcMaxDist = (workouts: RunnningWorkout[]) => {
  if (!workouts || workouts.length === 0) return 0;

  return workouts
    ?.map((run) => {
      const runSum = parseFloat(run.distance?.sum ?? "0");
      return runSum;
    })
    .reduce((max, curr) => {
      return Math.max(max, curr);
    });
};
