import { RunnningWorkout } from "@/types/fitness";
import { Dispatch, SetStateAction } from "react";

export type ControlState = {
  slice: number;
  setSlice: Dispatch<SetStateAction<number>>;
  divisor: number;
  setDivisor: Dispatch<SetStateAction<number>>;
};


export type FitnessGraphParams = {
    data: RunnningWorkout[];
    divisor: number;
    slice: number;
  };

  export type BarMetrics = {
    data: RunnningWorkout;
    divisor:number;
    metric: string;
  };