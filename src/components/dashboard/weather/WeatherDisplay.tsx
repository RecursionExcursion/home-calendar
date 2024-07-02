import Link from "next/link";
import { Suntime } from "../../../service/weatherService";
import { DailyForecast } from "../../../types";
import WeatherIcon from "./WeatherIcon";
import ScrollingTextArea from "../../base/ScrollingTextArea";
import PartialForecastCard from "./PartialForecastcard";

type WeatherDisplayProps = {
  weeklyForcast: DailyForecast[];
  suntimes: Suntime;
};

export default function WeatherDisplay(props: WeatherDisplayProps) {
  const { weeklyForcast, suntimes } = props;

  return (
    <div className="weather-container">
      <div className="forecast-grid">
        {weeklyForcast.map((forecast, i) => (
          <ForecastCard key={forecast.date} forecast={forecast} index={i} />
        ))}
      </div>
    </div>
  );
}

type ForecastCardProps = {
  forecast: DailyForecast;
  index: number;
};

const ForecastCard = (props: ForecastCardProps) => {
  const { forecast, index } = props;

  const ref = "fc-";

  const nextRef = `#${ref}${index + 1}`;
  const lastRef = `#${ref}${index - 1}`;
  const id = ref + index;

  return (
    <div id={id} className="forecast-card">
      <div className="date">
        <h2>
          <Link href={lastRef}>{"<"}</Link>
          {new Date(forecast.date).toLocaleDateString()}
          <Link href={nextRef}>{">"}</Link>
        </h2>
      </div>
      <div className="weather">
        <WeatherIcon forecast={forecast.day ?? forecast.night} iconSize={100} />
        <div className="temp">{forecast.day?.temp}°F</div>
      </div>
      <div className="forecast">
        <div className="card-container">
          <PartialForecastCard partialForecast={forecast.day} dayNight="day" />
          <PartialForecastCard partialForecast={forecast.night} dayNight="night" />
        </div>
      </div>
    </div>
  );
};
