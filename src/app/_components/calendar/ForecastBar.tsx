import { get } from "http";
import { DailyForecast } from "../../_types/display/weather";
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

  const [weatherIcon, setWeatherIcon] = useState<ReactElement>(<></>);

  useEffect(() => {
    setWeatherIcon(getForecastType(forecast));
  }, [forecast]);

  if (!forecast) {
    return null;
  }

  return (
    <>
      <div className="flex justify-evenly items-center">
        <div>{`${forecast.tempHigh}°/${forecast.tempLow}°`}</div>
        {weatherIcon}
      </div>
    </>
  );
}

const getForecastType = (forecast: DailyForecast | undefined): ReactElement => {
  const joinedShortForecast = forecast?.shortForecast[0];

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
