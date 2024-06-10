"use client";

import { colors } from "../../styles/colors";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  theme?: keyof typeof inputStyles;
};

const inputStyles: Record<string, React.CSSProperties> = {
  primary: {
    padding: "0.25rem 0.5rem",
    border: `1px solid ${colors.aqua}`,
    borderRadius: "0.25rem",
    color: colors.black,
    backgroundColor: colors.white,
    width: "100%",
  },

  dashboard: {
    border: `1px solid ${colors.aqua}`,
    padding: "0.125rem 0.5rem",
    borderRadius: " 0.375rem",
    color: colors.black,
    backgroundColor: colors.white,
  },

  disabled: {
    backgroundColor: colors.lightGray,
    color: colors.darkGray,
    cursor: "not-allowed",
    border: `1px solid ${colors.slate300}`,
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
