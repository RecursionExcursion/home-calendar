import { ComponentType } from "react";
import { DashboardIconPackage, DashboardIconTypes } from "./groups/dashboardIcons";
import { ForecastIconPackage, ForecastIconTypes } from "./groups/forecastIcons";
import { FallbackIconPackage, FallbackIconTypes } from "./groups/fallbackIcons";
import { SurfIconPackage, SurfIconTypes } from "./groups/surficons";

/*
 * This file should only be touched when adding a new library of icons.
 */

/* Icon Groups */
export type IconGroup = "forecastBar" | "dashboardSidebar" | "fallback" | "surf";

/* Icons */
export type DashboardIcons = Record<DashboardIconTypes, IconComponentType>;
export type ForecastIcons = Record<ForecastIconTypes, IconComponentType>;
export type FallbackIcons = Record<FallbackIconTypes, IconComponentType>;
export type SurfIcons = Record<SurfIconTypes, IconComponentType>;

/* Icon Package names */
export type IconPackage =
  | DashboardIconPackage
  | ForecastIconPackage
  | FallbackIconPackage
  | SurfIconPackage;

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
