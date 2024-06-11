"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "../../base";
import { useUserContext } from "../../../contexts";
import { saveUser } from "../../../api/service/userService";
import { User } from "../../../types";

type WeatherOptionsMenuProps = {
  setLoadingState: Dispatch<SetStateAction<boolean>>;
};

export default function WeatherOptionsMenu(props: WeatherOptionsMenuProps) {
  const { setLoadingState } = props;

  const { user } = useUserContext();

  const [enableWeather, setEnableWeather] = useState(userHasCoords(user));

  const handleEnableWeatherClick = async () => {
    setLoadingState(true);
    if (!enableWeather) {
      await enableWeatherService();
    } else {
      await disableWeatherService();
    }
  };

  const enableWeatherService = async () => {
    const geolocator = navigator.geolocation;
    if (geolocator) {
      const success = async (position: GeolocationPosition) => {
        user.settings.userCoords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        await saveUser(JSON.stringify(user)).then((res) => {
          const resUser = JSON.parse(res) as User;
          setEnableWeather(userHasCoords(resUser as User));
        });

        //Prevent the loading state from flashing
        setTimeout(() => {
          setLoadingState(false);
        }, 250);
      };

      const error = (error: GeolocationPositionError) => {
        //TODO remove in favor of toast
        console.log(error);
      };
      geolocator.getCurrentPosition(success, error);
    }
  };

  const disableWeatherService = async () => {
    user.settings.userCoords = null;

    await saveUser(JSON.stringify(user)).then((res) => {
      const resUser = JSON.parse(res) as User;
      setEnableWeather(userHasCoords(resUser as User));
    });

    //Prevent the loading state from flashing
    setTimeout(() => {
      setLoadingState(false);
    }, 500);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
      }}
    >
      <label>Enable forecast</label>
      <Input
        theme="checkbox"
        type="checkbox"
        checked={enableWeather}
        onChange={handleEnableWeatherClick}
      />
    </div>
  );
}

const userHasCoords = (user: User) => {
  return user.settings.userCoords !== null;
};
