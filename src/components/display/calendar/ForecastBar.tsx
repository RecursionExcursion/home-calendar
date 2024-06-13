import { CSSProperties, ReactElement } from "react";
import {
  WiAlien,
  WiCloudy,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import { DailyForecast, PartialForecast } from "../../../types";
import { colors } from "../../../styles/colors";

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
