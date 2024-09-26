let cachedData;

function getCity(data) {
  const address = data.resolvedAddress;
  const city = address.split(',')[0];
  return city;
}

function getState(data) {
  const address = data.resolvedAddress;
  // Remove space
  const state = address.split(',')[1].replace(/\s/g, '');
  return state;
}

function getSunrise(data) {
  return data.days[0].sunrise;
}

function getSunset(data) {
  return data.days[0].sunset;
}

function getIconSuggestion(data, hour) {
  const hourData = data.days[0].hours.slice(hour, hour + 1)[0];
  return hourData.icon;
}

function translateIconSuggestion(suggestion) {
  // https://www.visualcrossing.com/resources/documentation/weather-api/defining-icon-set-in-the-weather-api/
  if (suggestion === 'clear-day' || suggestion === 'clear-night') {
    return 'clear';
  }
  if (
    suggestion === 'cloudy' ||
    suggestion === 'partly-cloudy-day' ||
    suggestion === 'partly-cloudy-night'
  ) {
    return 'cloudy';
  }
  if (
    suggestion === 'snow' ||
    suggestion === 'snow-showers-day' ||
    suggestion === 'snow-showers-night'
  ) {
    return 'snowy';
  }
  if (
    suggestion === 'rain' ||
    suggestion === 'thunder-rain' ||
    suggestion === 'thunder-showers-day' ||
    suggestion === 'thunder-showers-night' ||
    suggestion === 'showers-day' ||
    suggestion === 'showers-night'
  ) {
    return 'rainy';
  }
  if (suggestion === 'fog') {
    return 'foggy';
  }
  if (suggestion === 'wind') {
    return 'windy';
  }

  return suggestion;
}

function fahrenheitToCelsius(temp) {
  return ((temp - 32) * 5) / 9;
}

function getTemp(data, hour) {
  const hourData = data.days[0].hours.slice(hour, hour + 1)[0];
  return Math.round(hourData.temp);
}

function getTempC(data, hour) {
  const hourData = data.days[0].hours.slice(hour, hour + 1)[0];
  const tempCelsius = fahrenheitToCelsius(hourData.temp);
  return Math.round(tempCelsius);
}

function getFeelsLike(data, hour) {
  const hourData = data.days[0].hours.slice(hour, hour + 1)[0];
  return Math.round(hourData.feelslike);
}

function getFeelsLikeC(data, hour) {
  const hourData = data.days[0].hours.slice(hour, hour + 1)[0];
  const tempCelsius = fahrenheitToCelsius(hourData.feelslike);
  return Math.round(tempCelsius);
}

function getDescription(data) {
  return data.description;
}

function getHourly(data, currentHour) {
  // hourlyData contains the next 24 hours of weather
  const todayData = data.days[0].hours.slice(currentHour);
  const tomorrowData = data.days[1].hours.slice(0, currentHour);
  const hourlyData = todayData.concat(tomorrowData);

  const hourly = {};
  for (let i = 0; i < 24; i += 1) {
    hourly[i] = {
      weather: translateIconSuggestion(hourlyData[i].icon),
      chanceRain: Math.round(hourlyData[i].precipprob),
      temperature: Math.round(hourlyData[i].temp),
      temperatureC: Math.round(fahrenheitToCelsius(hourlyData[i].temp)),
    };
  }

  return hourly;
}

function getDayFromDate(date) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days[new Date(date).getDay()];
}

function getDaily(data) {
  const dailyData = data.days;
  const daily = {};

  for (let i = 0; i < 10; i += 1) {
    daily[i] = {
      day: getDayFromDate(dailyData[i].datetime),
      weather: translateIconSuggestion(dailyData[i].icon),
      chanceRain: Math.round(dailyData[i].precipprob),
      temperature: Math.round(dailyData[i].temp),
      tempHi: Math.round(dailyData[i].tempmax),
      tempLow: Math.round(dailyData[i].tempmin),
      temperatureC: Math.round(fahrenheitToCelsius(dailyData[i].temp)),
      tempHiC: Math.round(fahrenheitToCelsius(dailyData[i].tempmax)),
      tempLowC: Math.round(fahrenheitToCelsius(dailyData[i].tempmin)),
      sunrise: dailyData[i].sunrise,
      sunset: dailyData[i].sunset,
    };
  }

  return daily;
}

export function getCachedData() {
  return cachedData;
}

export function swapUnit() {
  const newUnit = cachedData.currentUnit === 'F' ? 'C' : 'F';
  cachedData.currentUnit = newUnit;
}

function getWeatherData(data) {
  const currentHour = new Date().getHours();
  const currentUnit = 'F';
  const iconSuggestion = getIconSuggestion(data, currentHour);

  cachedData = {
    currentHour,
    currentUnit,
    iconSuggestion,
    city: getCity(data),
    state: getState(data),
    sunrise: getSunrise(data),
    sunset: getSunset(data),
    weather: translateIconSuggestion(iconSuggestion),
    temperature: getTemp(data, currentHour),
    temperatureC: getTempC(data, currentHour),
    feelsLike: getFeelsLike(data, currentHour),
    feelsLikeC: getFeelsLikeC(data, currentHour),
    description: getDescription(data),
    hourly: getHourly(data, currentHour),
    daily: getDaily(data),
  };

  return cachedData;
}

export default async function fetchWeatherData(location) {
  // Verify location is populated
  if (!location) {
    throw new Error('Please provide a location.');
  }

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=QMNA2T2AAADSPE35JWCGKEDBV`;
  try {
    // Request response
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return getWeatherData(data);
  } catch (err) {
    throw new Error(`Please verify location provided: ${location}`);
  }
}
