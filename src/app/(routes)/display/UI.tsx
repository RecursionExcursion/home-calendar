"use client";

import { useEffect, useState } from "react";
import Calendar, { Mode } from "../../_components/calendar/Calendar";
import { Coords } from "../../_types/display/weather";
import { DisplayProvider } from "../../_contexts/DisplayContext";

type DisplayUIProps = {
  weatherJson: string | undefined;
};

export default function DisplayUI(props: DisplayUIProps) {
  const { weatherJson } = props;

  const [mode, setMode] = useState<Mode>(Mode.Month);
  const [modeIndex, setModeIndex] = useState<number>(0);

  //TODO Remove location and use the context
  const [location, setLocation] = useState<Coords>({ lat: null, lng: null });

  const modes: Mode[] = [Mode.Month, Mode.Week, Mode.Day];

  const fiveMinutes = 300000;

  const changeCalendarMode = (): void => {
    const newIndex = (modeIndex + 1) % modes.length;
    setMode(modes[newIndex]);
    setModeIndex(newIndex);
  };

  useEffect(() => {
    if (location.lat && location.lng) {
      console.log(location.lat, location.lng);
    }
  }, [location]);

  useEffect(() => {
    setTimeout(() => changeCalendarMode(), fiveMinutes);
  }, [modeIndex]);

  return (
    <>
      <DisplayProvider weatherJson={weatherJson}>
        <Calendar mode={mode} />
      </DisplayProvider>
    </>
  );
}
