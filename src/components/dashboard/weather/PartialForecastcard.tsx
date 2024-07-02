"use client";

import { useEffect, useRef, useState } from "react";
import { PartialForecast } from "../../../types";
import WeatherIcon from "./WeatherIcon";

type PartialForecastCardProps = {
  partialForecast: PartialForecast | undefined;
  dayNight: "day" | "night";
};

export default function PartialForecastCard(props: PartialForecastCardProps) {
  const { partialForecast, dayNight } = props;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [scrollTop, setScrollTop] = useState(0);
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    getScrollTop();
  }, []);

  useEffect(() => {
    setShowTitle(scrollTop <= 20);
  }, [scrollTop]);

  const handleScroll = () => {
    getScrollTop();
  };

  const getScrollTop = () => {
    const scroll = textAreaRef.current?.scrollTop;
    if (scroll) {
      console.log({ scroll });

      setScrollTop(scroll);
    }
  };

  const titleText = dayNight === "day" ? "Day" : "Night";

  const prefexSpacing = `\n` + `\t`.repeat(2) + ` `.repeat(1);
  const text = showTitle
    ? prefexSpacing + partialForecast?.detailedForecast
    : partialForecast?.detailedForecast;

  return (
    partialForecast && (
      <div className="card">
        <div className="title-container">
          <h3>{titleText}</h3>
          <WeatherIcon forecast={partialForecast} iconSize={50} />
        </div>

        <textarea
          onScroll={handleScroll}
          ref={textAreaRef}
          className="text-area"
          value={partialForecast?.detailedForecast}
          readOnly
        />
      </div>
    )
  );
}
