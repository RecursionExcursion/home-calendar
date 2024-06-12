"use client";

import { colors } from "../../styles/colors";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  theme?: inputStyle;
};

export default function Input(props: InputProps) {
  const { theme = "primary", ...attrs } = props;

  let style: React.CSSProperties = inputStyles[theme];

  if (attrs.disabled) style = { ...style, ...inputStyles.disabled };

  return <input style={style} {...attrs} />;
}

type inputStyle = "primary" | "dashboard" | "disabled" | "checkbox" | "number";

const baseStyle: React.CSSProperties = {
  backgroundColor: colors.white,
  border: `1px solid ${colors.aqua}`,
  borderRadius: "0.25rem",
  color: colors.black,
  padding: "0.25rem 0.5rem",
  width: "100%",
};

const inputStyles: Record<inputStyle, React.CSSProperties> = {
  primary: baseStyle,

  dashboard: {
    ...baseStyle,
    padding: "0.125rem 0.5rem",
    width: "auto",
  },

  disabled: {
    backgroundColor: colors.lightGray,
    border: `1px solid ${colors.slate300}`,
    color: colors.darkGray,
    cursor: "not-allowed",
  },

  checkbox: {},

  number: { ...baseStyle, width: "3rem" },
};
