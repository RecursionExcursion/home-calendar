"use client";

import { CSSProperties, ComponentPropsWithoutRef, ReactElement } from "react";
import { colors } from "../../styles/colors";

type buttonStyle = "primary" | "none";

const buttonStyles: Record<buttonStyle, CSSProperties> = {
  primary: {
    backgroundColor: colors.black,
    border: `1px solid ${colors.white}`,
    borderRadius: "0.25rem",
    color: colors.white,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    minWidth: "6rem",
    padding: "0.25rem .5rem",
    textWrap: "nowrap",
  },
  none: {
    cursor: "pointer",
  },
};

type CustomButtonProps = ComponentPropsWithoutRef<"button"> & {
  child: JSX.Element | string;
  theme?: buttonStyle;
};

export default function Button(props: CustomButtonProps) {
  const { child, theme = "primary", ...attr } = props;
  return (
    <button {...attr} style={buttonStyles[theme]}>
      {child}
    </button>
  );
}
