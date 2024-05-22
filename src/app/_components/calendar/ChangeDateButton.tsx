"use client";

import CustomButton from "../ui/CustomButton";

export type ChangeDirection = "Next" | "Previous";

type ChangeDateButtonProps = {
  direction: ChangeDirection;
  handleClickCallBack: () => void;
};

export default function ChangeDateButton(props: ChangeDateButtonProps) {
  const { direction, handleClickCallBack } = props;

  const handleClick = () => {
    handleClickCallBack();
  };

  return (
    <CustomButton text={direction} onClick={handleClick} />
  );
}
