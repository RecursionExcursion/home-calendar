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
