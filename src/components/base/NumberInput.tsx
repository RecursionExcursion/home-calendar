"use client";

import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  Dispatch,
  SetStateAction,
} from "react";

type NumberInputProps = ComponentPropsWithoutRef<"input"> & {
  setter: Dispatch<SetStateAction<any>>;
  fixedLength?: number;
  //TODO: Update regex to handle negatives
  maximum?: number;
  mininum?: number;
};

export default function NumberInput(props: NumberInputProps) {
  const { setter, fixedLength = 2, mininum, maximum, ...attr } = props;

  const innerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let { value } = e.target;

    const setters = {
      name: (val: any) =>
        setter((prev: any) => ({
          ...prev,
          [name]: val,
        })),
      noName: (val: any) => setter(val),
    };
    const set = (name: string, val: any) => {
      name ? setters.name(val) : setters.noName(val);
    };

    if (value === "") {
      set(name, value);
      return;
    }

    const anyInvalid = value
      .split("")
      .find((char) => isNaN(parseInt(char)) && char !== ".");
    if (anyInvalid) return;

    if (maximum) {
      const numVal = parseFloat(value);

      if (numVal > maximum) {
        return;
      }
    }

    function createFixedRegex(decimalPlaces: number) {
      let regexPattern;
      if (decimalPlaces > 0) {
        const decimalPattern = `\\d{0,${decimalPlaces}}`;
        regexPattern = new RegExp(`^\\d+(\\.(${decimalPattern}))?$`);
      } else {
        regexPattern = new RegExp(`^\\d+$`);
      }
      return regexPattern;
    }

    // const fixed2Regex = /^\d+(\.\d{0,2})?$/;
    const fixedRegex = createFixedRegex(fixedLength);
    if (!fixedRegex.test(value)) return;

    set(name, value);
  };

  return <input {...attr} onChange={innerOnChange} />;
}
