import { IconGroupParams } from "./types";
import { WiAlien } from "react-icons/wi";
import {
  DashboardIconPackage,
  DashboardIconTypes,
  dashboardIconMappings,
} from "./groups/dashboardIcons";
import {
  ForecastIconPackage,
  ForecastIconTypes,
  forecastIconMappings,
} from "./groups/forecastIcons";
import {
  FallbackIconPackage,
  FallbackIconTypes,
  fallbackIconMappings,
} from "./groups/fallbackIcons";
import { SurfIconPackage, SurfIconTypes, surfIconMappings } from "./groups/surficons";

export const getIconGroup = (params: IconGroupParams) => {
  const { iconGroup, iconPackage } = params;
  switch (iconGroup) {
    case "forecastBar":
      return getForecastIcons(iconPackage as ForecastIconPackage);
    case "dashboardSidebar":
      return getDashboardIcons(iconPackage as DashboardIconPackage);
    case "fallback":
      return getFallbackIcons(iconPackage as FallbackIconPackage);
    case "surf":
      return getSurfIcons(iconPackage as SurfIconPackage);
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

const getFallbackIcons = (iconPackage: FallbackIconPackage) => {
  const icons: Record<FallbackIconTypes, React.ElementType> = {} as Record<
    FallbackIconTypes,
    React.ElementType
  >;
  (Object.keys(fallbackIconMappings) as FallbackIconTypes[]).forEach((key) => {
    icons[key] = fallbackIconMappings[key][iconPackage];
  });
  return icons;
};

const getSurfIcons = (iconPackage: SurfIconPackage) => {
  const icons: Record<SurfIconTypes, React.ElementType> = {} as Record<
    SurfIconTypes,
    React.ElementType
  >;
  (Object.keys(surfIconMappings) as SurfIconTypes[]).forEach((key) => {
    icons[key] = surfIconMappings[key][iconPackage];
  });
  return icons;
};
