"use client";

import { useAppLoadingContext } from "@/contexts/AppLoadingContext";
import parseAppleHealthData from "../../lib/appleHealthParser/appleHealthParser";
import { Dispatch, SetStateAction, useRef } from "react";
import { Fitness, RunnningWorkout } from "@/types/fitness";
import { saveFitnessData } from "@/service/fitnessService";

type FileInputProps = {
  setState: Dispatch<SetStateAction<RunnningWorkout[]>>;
  fitnessData: Fitness;
};

const FileInput = (props: FileInputProps) => {
  const { setState, fitnessData } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const { setAppLoading } = useAppLoadingContext();

  const handleFileUpload = async () => {
    const appleFitnessExport = inputRef.current?.files?.item(0);

    if (!appleFitnessExport) {
      //TODO: toast error
      return;
    }
    setAppLoading(true);

    const results = await parseAppleHealthData(appleFitnessExport);

    if (results) {
      const fitnessCopy = structuredClone(fitnessData);
      fitnessCopy.runningWorkouts = results;

      saveFitnessData(JSON.stringify(fitnessCopy));
      setState(results);
    }

    setAppLoading(false);
  };

  return (
    <div className="upload-container">
      <input type="file" ref={inputRef} />
      <button className="fitness-button" onClick={handleFileUpload}>
        UPLOAD
      </button>
    </div>
  );
};
export default FileInput;
