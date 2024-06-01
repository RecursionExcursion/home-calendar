"use client";

const inputStyles = {
  primary: "px-2 rounded-md border-blue-400 border-2 text-black",
};

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  theme?: keyof typeof inputStyles;
};

const Input = (props: InputProps) => {
  const { theme = "primary", ...attrs } = props;
  return <input className={inputStyles[theme]} {...attrs} />;
};

export default Input;
