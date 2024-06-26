import { ReactElement } from "react";

import { DailyForecast, PartialForecast } from "../../../types";
import { getIconGroup } from "../../../lib/icons/icons";
import { WiAlien } from "react-icons/wi";
import { FallbackIcons, ForecastIcons, IconGroupParams } from "../../../lib/icons/types";
import { ForecastIconTypes } from "../../../lib/icons/groups/forecastIcons";

type ForecastBarProps = {
  forecast: DailyForecast | undefined;
};

export default function ForecastBar(props: ForecastBarProps) {
  const { forecast } = props;

  if (!forecast) {
    return null;
  }

  return (
    <div className="fb-wrapper">
      <div className="fb-container">
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
    </div>
  );
}

const getForecastType = (forecast: PartialForecast | undefined): ReactElement => {
  const joinedShortForecast = forecast?.shortForecast;

  const iconSize = 27;

  if (!forecast) {
    const fallbackIconGroupParams: IconGroupParams = {
      iconGroup: "fallback",
      iconPackage: "wi",
    };
    const fbIcons = getIconGroup(fallbackIconGroupParams) as FallbackIcons;
    return <fbIcons.default size={iconSize} />;
  }

  const iconGroupParams: IconGroupParams = {
    iconGroup: "forecastBar",
    iconPackage: "wi",
  };
  const icons = getIconGroup(iconGroupParams) as ForecastIcons;

  const iconMap = new Map<ForecastIconTypes, ReactElement>([
    ["thunderstorm", <icons.thunderstorm key={"Thunderstorm"} size={iconSize} />],
    ["rain", <icons.rain key={"Rain"} size={iconSize} />],
    ["cloudy", <icons.cloudy key={"Cloudy"} size={iconSize} />],
    ["snow", <icons.snow key={"Snow"} size={iconSize} />],
    ["sunny", <icons.sunny key={"Sunny"} size={iconSize} />],
    ["clear", <icons.clear key={"Clear"} size={iconSize} />],
  ]);

  //Will iterate over the map in the order of insertion
  const iconArray = Array.from(iconMap);
  for (const [key, value] of iconArray) {
    if (joinedShortForecast?.toLowerCase().includes(key)) {
      return value;
    }
  }

  return <WiAlien size={iconSize} />;
};

type ForecastSectionProps = {
  icon: ReactElement;
  forecast: PartialForecast | undefined;
  theme: "day" | "night";
};

const ForecastSection = (props: ForecastSectionProps) => {
  const { icon, forecast, theme } = props;

  const style = theme === "day" ? "fb-forecast-section-day" : "fb-forecast-section-night";

  return forecast ? (
    <div className={style}>
      {forecast.temp}°{icon}
    </div>
  ) : (
    <div className={style}>{null}</div>
  );
};
