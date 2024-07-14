// talks to repo, used in route
// business logic, like if user doesnt exist, fill in missing data , manipulation

import { Fitness } from "@/types/fitness";
import {
  createFitness,
  readUserFitness,
  updateFitness,
} from "./fitnessRepoApi";
import { ObjectId } from "mongodb";

export const getAllFitnessData = async (userId: string) => {
  let data = await readUserFitness(userId);

  if (!data) {
    await createFitness({
      _id: new ObjectId(),
      userId,
      runningWorkouts: [],
    });

    data = await readUserFitness(userId);
  }

  return data;
};

export const saveFitness = async (fitness: Fitness) => {
  return await updateFitness(fitness);
};
