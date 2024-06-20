import { ComponentType } from "react";
import { dashboardIconMappings } from "./dashboardIcons";
import { forecastIconMappings } from "./forecastIcons";

/*
 * This file should only be touched when adding a new library of icons.
 */

/* Mappings */
export type ForecastMappings = keyof typeof forecastIconMappings;
export type DashboardMappings = keyof typeof dashboardIconMappings;

/* Icon Groups */
export type IconGroup = "forecastBar" | "dashboardSidebar";

/* Icons */
export type DashboardIcons = Record<DashboardMappings, IconComponentType>;
export type ForecastIcons = Record<ForecastMappings, IconComponentType>;

export type DashboardIconTypes = keyof typeof dashboardIconMappings;
export type ForecastIconTypes = keyof typeof forecastIconMappings;

/* Icon Package names */
export type DashboardIconPackage = "fa" | "io";
export type ForecastIconPackage = "wi";
export type IconPackage = DashboardIconPackage | ForecastIconPackage;

/* Params for main fn */
export type IconGroupParams = {
  iconGroup: IconGroup;
  iconPackage: IconPackage;
};

/* Icon Component */
export interface IconProps {
  size: number;
}

export type IconComponentType = ComponentType<IconProps>;
