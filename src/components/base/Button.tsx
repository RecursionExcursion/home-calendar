"use client";

import { CSSProperties, ComponentPropsWithoutRef, ReactElement } from "react";
import { colors } from "../../styles/colors";

type CustomButtonProps = ComponentPropsWithoutRef<"button"> & {
  child: JSX.Element | string;
  theme?: buttonStyle;
};

export default function Button(props: CustomButtonProps) {
  const { child, theme = "primary", ...attr } = props;

  let style = buttonStyles[theme];

  if (attr.disabled) style = { ...style, ...buttonStyles.disabled };

  return (
    <button {...attr} style={style}>
      {child}
    </button>
  );
}

type buttonStyle = "primary" | "none" | "disabled";

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
  disabled: {
    backgroundColor: colors.lightGray,
    border: `1px solid ${colors.slate300}`,
    color: colors.darkGray,
    cursor: "not-allowed",
  },
  none: {
    cursor: "pointer",
  },
};
