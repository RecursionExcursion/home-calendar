import { CSSProperties, ComponentPropsWithoutRef } from "react";

type CustomButtonProps = ComponentPropsWithoutRef<"button"> & {
  text: string;
  theme?: keyof typeof buttonStyles;
};

const buttonStyles: Record<string, React.CSSProperties> = {
  primary: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    minWidth: "6rem",
    border: "1px solid #FFFFFF",
    borderRadius: "0.25rem",
    padding: "0.25rem .5rem",
    textWrap: "nowrap",
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
