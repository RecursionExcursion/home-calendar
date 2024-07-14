import { ObjectId } from "mongodb";

export type Fitness = {
  _id: ObjectId;
  userId: string;
  runningWorkouts: RunnningWorkout[];
}

export type RunnningWorkout = {
  date?: string;
  
  heartRate?: StatRange;
  runningSpeed?: StatRange;

  distance?: StatSum;
  basalEnergyBurned?: StatSum;
  activeEnergyBurned?: StatSum;
  stepCount?: StatSum;
};

export type StatRange = {
  average?: string;
  maximum?: string;
  minimun?: string;
  unit?: string;
};

export type StatSum = {
  sum?: string;
  unit?: string;
};
