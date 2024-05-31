import { get } from "http";
import { DailyForecast, PartialForecast } from "../../_types/display/weather";
import { ReactElement, useEffect, useState } from "react";
import {
  WiAlien,
  WiCloudy,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

type ForecastBarProps = {
  forecast: DailyForecast | undefined;
};

export default function ForecastBar(props: ForecastBarProps) {
  const { forecast } = props;

  if (!forecast) {
    return null;
  }

  return (
    <>
      <div className="flex">
        <ForecastSection
          icon={getForecastType(forecast?.day)}
          forecast={forecast?.day}
          theme="day"
        />
        <ForecastSection
          icon={getForecastType(forecast?.night)}
          forecast={forecast?.night}
          theme="night"
        />
      </div>
    </>
  );
}

const getForecastType = (
  forecast: PartialForecast | undefined
): ReactElement => {
  const joinedShortForecast = forecast?.shortForecast;

  const iconSize = 28;

  if (!forecast) return <WiAlien size={iconSize} />;

  const iconMap = new Map([
    ["Thunderstorm", <WiThunderstorm key={"Thunderstorm"} size={iconSize} />],
    ["Rain", <WiRain key={"Rain"} size={iconSize} />],
    ["Cloudy", <WiCloudy key={"Cloudy"} size={iconSize} />],
    ["Snow", <WiSnow key={"Snow"} size={iconSize} />],
    ["Sunny", <WiDaySunny key={"Sunny"} size={iconSize} />],
    ["Clear", <WiDaySunny key={"Clear"} size={iconSize} />],
  ]);

  //Will iterate over the map in the order of insertion
  const iconArray = Array.from(iconMap);
  for (const [key, value] of iconArray) {
    if (joinedShortForecast?.includes(key)) {
      return value;
    }
  }

  return <WiAlien size={iconSize} />;
};

const sectionContainerStyle = {
  day: "bg-white text-black",
  night: "bg-gray-800 text-white",
};

type ForecastSectionProps = {
  icon: ReactElement;
  forecast: PartialForecast | undefined;
  theme: keyof typeof sectionContainerStyle;
};

const ForecastSection = (props: ForecastSectionProps) => {
  const { icon, forecast, theme } = props;
  return (
    <div
      className={`flex flex-1 justify-center ${sectionContainerStyle[theme]}`}
    >
      {forecast?.temp}°{icon}
    </div>
  );
};
