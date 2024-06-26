import { WiAlien } from "react-icons/wi";

export type FallbackIconPackage = "wi";
export type FallbackIconTypes = keyof typeof fallbackIconMappings;

export const fallbackIconMappings = {
  default: {
    wi: WiAlien,
  },
};
