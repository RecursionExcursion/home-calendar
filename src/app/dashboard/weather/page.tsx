import WeatherDisplay from "../../../components/dashboard/weather/WeatherDisplay";
import { getUserByCookie } from "../../../service/userService";
import { fetchSunTimes, getProjectedForecastJson } from "../../../service/weatherService";
import { Coords, DailyForecast, User } from "../../../types";

export default async function WeatherPage() {
  const userJson = await getUserByCookie();

  const user = JSON.parse(userJson) as User;

  if (!user.settings?.userCoords) {
    return (
      <div>
        <>WeatherPage</>
      </div>
    );
  }

  const userCoords: Coords = {
    lat: user.settings.userCoords.lat,
    lng: user.settings.userCoords.lon,
  };

  const forecastJson = await getProjectedForecastJson(userCoords);
  const forecast = JSON.parse(forecastJson) as DailyForecast[];

  const suntimes = await fetchSunTimes(userCoords);

  return <WeatherDisplay weeklyForcast={forecast} suntimes={suntimes} />;
}
