import { RunnningWorkout, StatRange, StatSum } from "@/types/fitness";
import {
  getStatsFromElement,
  mapToStatRange,
  mapToStatSum,
} from "./statMapper";
import { attributes } from "./statMapper";

const parseAppleHealthData = async (file: File) => {
  const data = await file?.text();

  const parser = new DOMParser();
  if (!data) {
    //TODO: toast error
    return;
  }
  const xmlDoc = parser.parseFromString(data, "text/xml");
  const records = xmlDoc.getElementsByTagName("Workout");

  const filteredRecords = [];
  const comparisonType = "HKWorkoutActivityTypeRunning";
  const comparisonDate = new Date("01-01-2024");

  for (let i = 0; i < records.length; i++) {
    const workoutActivityType = records[i].getAttribute("workoutActivityType");
    const startDate = records[i].getAttribute("startDate");

    if (!startDate) {
      return;
    }

    if (
      workoutActivityType == comparisonType &&
      comparisonDate < new Date(startDate)
    ) {
      filteredRecords.push(records[i]);
    }
  }

  const runningWorkouts: RunnningWorkout[] = [];

  filteredRecords.map((rec) => {
    const workoutStats = rec.getElementsByTagName("WorkoutStatistics");

    const workoutStatsArray = Array.from(workoutStats);

    const runningWorkout: RunnningWorkout = {
      date: rec.getAttribute("startDate") ?? undefined,
      heartRate: getStatsFromElement(
        attributes.heartRateAttributeName,
        workoutStatsArray,
        mapToStatRange
      ) as StatRange,

      runningSpeed: getStatsFromElement(
        attributes.runningSpeedAttributeName,
        workoutStatsArray,
        mapToStatRange
      ) as StatRange,

      distance: getStatsFromElement(
        attributes.distanceAttributeName,
        workoutStatsArray,
        mapToStatSum
      ) as StatSum,
      basalEnergyBurned: getStatsFromElement(
        attributes.basalEnergyAttributeName,
        workoutStatsArray,
        mapToStatSum
      ) as StatSum,
      activeEnergyBurned: getStatsFromElement(
        attributes.activeEnergyAttributeName,
        workoutStatsArray,
        mapToStatSum
      ) as StatSum,
      stepCount: getStatsFromElement(
        attributes.stepCountAttributeName,
        workoutStatsArray,
        mapToStatSum
      ) as StatSum,
    };

    runningWorkouts.push(runningWorkout);
  });
  return runningWorkouts;
};

export default parseAppleHealthData;
