import { ComponentPropsWithoutRef } from "react";

type CustomButtonProps = ComponentPropsWithoutRef<"button"> & {
  text: string;
  theme?: keyof typeof buttonStyles;
};

const buttonStyles = {
  primary:
    "border border-white px-2 py-1 rounded-md min-w-24 flex justify-center text-white bg-black text-nowrap",
};

export default function Button(props: CustomButtonProps) {
  const { text, theme = "primary", ...attr } = props;
  return (
    <button className={buttonStyles[theme]} {...attr}>
      {props.text}
    </button>
  );
}
