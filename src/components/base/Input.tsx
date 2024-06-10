"use client";

import { colors } from "../../styles/colors";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  theme?: keyof typeof inputStyles;
};

const inputStyles: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: colors.white,
    border: `1px solid ${colors.aqua}`,
    borderRadius: "0.25rem",
    color: colors.black,
    padding: "0.25rem 0.5rem",
    width: "100%",
  },

  dashboard: {
    backgroundColor: colors.white,
    borderRadius: " 0.375rem",
    border: `1px solid ${colors.aqua}`,
    color: colors.black,
    padding: "0.125rem 0.5rem",
  },

  disabled: {
    backgroundColor: colors.lightGray,
    border: `1px solid ${colors.slate300}`,
    color: colors.darkGray,
    cursor: "not-allowed",
  },

  checkbox:{
    
  }
};

const Input = (props: InputProps) => {
  const { theme = "primary", ...attrs } = props;

  let style: React.CSSProperties = inputStyles[theme];

  if (attrs.disabled) style = { ...style, ...inputStyles.disabled };

  return <input style={style} {...attrs} />;
};

export default Input;
