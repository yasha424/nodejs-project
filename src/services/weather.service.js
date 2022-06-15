import axios from 'axios';

const getWeather = async (lat, lon) => {
  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat,
      lon,
      appid: process.env.WEATHER_TOKEN,
      units: 'metric'
    }
  });
  return data;
};

export { getWeather };
