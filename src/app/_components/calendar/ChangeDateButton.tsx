"use client";

import Button from "../ui/Button";

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
    <Button text={direction} onClick={handleClick} />
  );
}
