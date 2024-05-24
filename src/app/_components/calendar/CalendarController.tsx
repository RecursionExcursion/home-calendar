"use client";

import { useEffect, useState } from "react";
import Calendar, { Mode } from "./Calendar";

export default function CalenderController() {
  const [mode, setMode] = useState<Mode>(Mode.Month);
  const [modeIndex, setModeIndex] = useState<number>(0);

  const modes: Mode[] = [Mode.Month, Mode.Week, Mode.Day];

  const fiveMinutes = 300000;

  const changeCalendarMode = (): void => {
    const newIndex = (modeIndex + 1) % modes.length;
    setMode(modes[newIndex]);
    setModeIndex(newIndex);
  };

  useEffect(() => {
    setTimeout(() => changeCalendarMode(), fiveMinutes);
  }, [modeIndex]);
  return <Calendar mode={mode} />;
}
