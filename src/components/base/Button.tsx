import { CSSProperties, ComponentPropsWithoutRef } from "react";
import { colors } from "../../styles/colors";

const buttonStyles: Record<string, CSSProperties> = {
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
};

type CustomButtonProps = ComponentPropsWithoutRef<"button"> & {
  text: string;
  theme?: keyof typeof buttonStyles;
};

export default function Button(props: CustomButtonProps) {
  const { text, theme = "primary", ...attr } = props;
  return (
    <button {...attr} style={buttonStyles[theme]}>
      {props.text}
    </button>
  );
}
