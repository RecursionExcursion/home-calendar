import { FiSunrise, FiSunset } from "react-icons/fi";

export type SurfIconPackage = "fi";
export type SurfIconTypes = keyof typeof surfIconMappings;

export const surfIconMappings = {
  sunrise: {
    fi: FiSunrise,
  },
  sunset: {
    fi: FiSunset,
  },
};
