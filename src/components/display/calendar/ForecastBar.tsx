import { CSSProperties, ReactElement } from "react";

import { DailyForecast, PartialForecast } from "../../../types";
import { colors } from "../../../styles/colors";
import { getIconGroup } from "../../../lib/icons/icons";
import { WiAlien } from "react-icons/wi";
import {
  ForecastIcons,
  ForecastMappings,
  IconGroupParams,
} from "../../../lib/icons/types";

type ForecastBarProps = {
  forecast: DailyForecast | undefined;
};

export default function ForecastBar(props: ForecastBarProps) {
  const { forecast } = props;

  if (!forecast) {
    return null;
  }

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
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

  //TODO Replace with a default icon from icons.ts
  if (!forecast) return <WiAlien size={iconSize} />;

  const iconGroupParams: IconGroupParams = {
    iconGroup: "forecastBar",
    iconPackage: "wi",
  };
  const icons = getIconGroup(iconGroupParams) as ForecastIcons;

  const iconMap = new Map<ForecastMappings, ReactElement>([
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

const styles: Record<string, CSSProperties> = {
  base: { gap: "0.25rem", height: "100%", width: "50%" },
  day: { backgroundColor: colors.white, color: colors.black },
  night: { backgroundColor: colors.darkGray, color: colors.white },
};

type ForecastSectionProps = {
  icon: ReactElement;
  forecast: PartialForecast | undefined;
  theme: keyof typeof styles;
};

const ForecastSection = (props: ForecastSectionProps) => {
  const { icon, forecast, theme } = props;
  return forecast ? (
    <div className="rowContainer" style={{ ...styles.base, ...styles[theme] }}>
      {forecast.temp}°{icon}
    </div>
  ) : (
    <div className="rowContainer" style={{ ...styles.base, ...styles[theme] }}>
      {null}
    </div>
  );
};
