"use client";

import Button from "../base/Button";

type RenewSessionModalProps = {
  sessionExp: number;
  currentTime: number;
};

export default function RenewSessionModal(props: RenewSessionModalProps) {
  const { sessionExp, currentTime } = props;

  const timeDifference = getTimeDifference(sessionExp, currentTime);

  const handleYesClick = () => {};
  const handleNoClick = () => {};

  return (
    <div className="flex flex-col justify-center text-center">
      <span>{`Your session is about to expire in ${timeDifference}!`}</span>
      <span>{`Would you like to renew your session on all devices?`}</span>
      <div className="flex gap-2 justify-center mt-2">
        <Button text="Yes" />
        <Button text="No" />
      </div>
    </div>
  );
}

const getTimeDifference = (epoch1: number, epoch2: number) => {
  // Calculate the absolute difference in milliseconds
  const timeDifference = Math.abs(epoch1 - epoch2);

  // Calculate the number of days
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Calculate the number of hours remaining after extracting days
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  // Calculate the number of minutes remaining after extracting hours
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  // Return the formatted string
  return `${days}D ${hours}H ${minutes}M`;
};
