import {
  DashboardIconPackage,
  DashboardIconTypes,
  ForecastIconPackage,
  ForecastIconTypes,
  IconGroupParams,
} from "./types";
import { WiAlien } from "react-icons/wi";
import { dashboardIconMappings } from "./dashboardIcons";
import { forecastIconMappings } from "./forecastIcons";

export const getIconGroup = (params: IconGroupParams) => {
  const { iconGroup, iconPackage } = params;
  switch (iconGroup) {
    case "forecastBar":
      return getForecastIcons(iconPackage as ForecastIconPackage);
    case "dashboardSidebar":
      return getDashboardIcons(iconPackage as DashboardIconPackage);
    default:
      return WiAlien;
  }
};

const getDashboardIcons = (iconPackage: DashboardIconPackage) => {
  const icons: Record<DashboardIconTypes, React.ElementType> = {} as Record<
    DashboardIconTypes,
    React.ElementType
  >;
  (Object.keys(dashboardIconMappings) as DashboardIconTypes[]).forEach((key) => {
    icons[key] = dashboardIconMappings[key][iconPackage];
  });
  return icons;
};

const getForecastIcons = (iconPackage: ForecastIconPackage) => {
  const icons: Record<ForecastIconTypes, React.ElementType> = {} as Record<
    ForecastIconTypes,
    React.ElementType
  >;
  (Object.keys(forecastIconMappings) as ForecastIconTypes[]).forEach((key) => {
    icons[key] = forecastIconMappings[key][iconPackage];
  });
  return icons;
};
