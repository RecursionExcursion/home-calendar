import { RunnningWorkout } from "@/types/fitness";
import { Dispatch, SetStateAction } from "react";

export type ControlState = {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
  divisor:number;
};

export type FitnessGraphParams = {
  data: RunnningWorkout[];
  divisor: number;
  // slice: number;
  startDate: Date;
  endDate: Date;
};

export type BarMetrics = {
  data: RunnningWorkout;
  divisor: number;
  metric: string;
};
