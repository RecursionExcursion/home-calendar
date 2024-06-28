"use client";

import { useState } from "react";
import { User } from "../../../types";
import { useUserContext } from "../../../contexts";
import { saveUser } from "../../../service/userService";
import { useAppLoadingContext } from "../../../contexts/AppLoadingContext";

export default function WeatherOptionsMenu() {
  const { setAppLoading } = useAppLoadingContext();

  const { user } = useUserContext();

  const [enableWeather, setEnableWeather] = useState(userHasCoords(user));

  const handleEnableWeatherClick = async () => {
    setAppLoading(true);
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
          const resObj = JSON.parse(res);
          const resUser = resObj.updatedUser as User;
          setEnableWeather(userHasCoords(resUser as User));
        });

        setAppLoading(false);
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
      const resObj = JSON.parse(res);
      const resUser = resObj.updatedUser as User;
      setEnableWeather(userHasCoords(resUser as User));
    });

    setAppLoading(false);
  };

  return (
    <div
      className="flex gap-1"
      style={{
        width: "100%",
        padding: "1rem",
      }}
    >
      <label className="text-nowrap" htmlFor="enableWeatherCheckbox">
        Enable forecast
      </label>
      <input
        name="enableWeatherCheckbox"
        className="db-checkbox"
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
