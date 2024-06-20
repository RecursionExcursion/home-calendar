"use client";

import { ChangeEvent, ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";

type NumberInputProps = ComponentPropsWithoutRef<"input"> & {
  setter: Dispatch<SetStateAction<any>>;
};

export default function NumberInput(props: NumberInputProps) {
  const { setter, ...attr } = props;

  const innerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let { value } = e.target;

    if (value === "") {
      setter((prev: any) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    const anyInvalid = value
      .split("")
      .find((char) => isNaN(parseInt(char)) && char !== ".");
    if (anyInvalid) return;

    const fixed2Regex = /^\d+(\.\d{0,2})?$/;
    if (!fixed2Regex.test(value)) return;

    setter((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return <input type="number" {...attr} onChange={innerOnChange} />;
}
