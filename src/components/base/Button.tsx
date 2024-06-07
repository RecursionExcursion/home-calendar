import { ComponentPropsWithoutRef } from "react";
import { colors } from "../../styles/colors";

type CustomButtonProps = ComponentPropsWithoutRef<"button"> & {
  text: string;
  theme?: keyof typeof buttonStyles;
};

const buttonStyles: Record<string, React.CSSProperties> = {
  primary: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: colors.black,
    color: colors.white,
    minWidth: "6rem",
    border: `1px solid ${colors.white}`,
    borderRadius: "0.25rem",
    padding: "0.25rem .5rem",
    textWrap: "nowrap",
    cursor: "pointer",
  },
};

export default function Button(props: CustomButtonProps) {
  const { text, theme = "primary", ...attr } = props;
  return (
    <button {...attr} style={buttonStyles[theme]}>
      {props.text}
    </button>
  );
}
