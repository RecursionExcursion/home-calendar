import { ComponentPropsWithoutRef } from "react";

type CustomButtonProps = ComponentPropsWithoutRef<"button"> & {
  text: string;
};

export default function CustomButton(props: CustomButtonProps) {
  const { text, ...rest } = props;
  return (
    <button
      className="border border-white px-2 py-1 rounded-md w-24 flex justify-center"
      {...rest}
    >
      {props.text}
    </button>
  );
}
