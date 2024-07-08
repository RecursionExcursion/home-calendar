"use client";

import { useAppLoadingContext } from "@/contexts/AppLoadingContext";
import parseAppleHealthData from "../../lib/appleHealthParser/appleHealthParser";
import { Dispatch, SetStateAction, useRef } from "react";
import { RunnningWorkout } from "@/types/fitness";

type FileInputProps = {
  setState: Dispatch<SetStateAction<RunnningWorkout[]>>;
};

const FileInput = (props: FileInputProps) => {
  const { setState } = props;

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
