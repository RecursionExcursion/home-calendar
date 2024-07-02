import { ReactElement } from "react";
import { PartialForecast } from "../../../types";
import { FallbackIcons, ForecastIcons, IconGroupParams } from "../../../lib/icons/types";
import { getIconGroup } from "../../../lib/icons/icons";
import {
  ForecastIconPackage,
  ForecastIconTypes,
} from "../../../lib/icons/groups/forecastIcons";

type WeatherIconProps = {
  forecast: PartialForecast | undefined;
  iconPackage?: ForecastIconPackage;
  iconSize?: number;
};

export default function WeatherIcon(props: WeatherIconProps): ReactElement {
  const { forecast, iconPackage = "wi", iconSize = 27 } = props;

  const fallbackIconGroupParams: IconGroupParams = {
    iconGroup: "fallback",
    iconPackage,
  };
  if (!forecast) {
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
    if (forecast?.shortForecast?.toLowerCase().includes(key)) {
      return value;
    }
  }

  const fbIcons = getIconGroup(fallbackIconGroupParams) as FallbackIcons;
  return <fbIcons.default size={iconSize} />;
}
