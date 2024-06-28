import { getIconGroup } from "../../lib/icons/icons";
import { FallbackIcons } from "../../lib/icons/types";

export const FallbackIcon = () => {
  const icons = getIconGroup({
    iconGroup: "fallback",
    iconPackage: "wi",
  }) as FallbackIcons;
  return <icons.default size={200} />;
};
