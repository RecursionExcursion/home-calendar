import {
    WiAlien,
    WiCloudy,
    WiDaySunny,
    WiRain,
    WiSnow,
    WiThunderstorm,
  } from "react-icons/wi";

export const forecastIconMappings = {
    thunderstorm: {
      wi: WiThunderstorm,
    },
    rain: {
      wi: WiRain,
    },
    cloudy: {
      wi: WiCloudy,
    },
    snow: {
      wi: WiSnow,
    },
    sunny: {
      wi: WiDaySunny,
    },
    clear: {
      wi: WiDaySunny,
    },
    default: {
      wi: WiAlien,
    },
  };