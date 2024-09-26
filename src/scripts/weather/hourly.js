import getIcon, { getTime } from '../icons';

function loadHourlyElement(num, hour, weatherIconSrc, chanceRain, temp) {
  const ele = document.getElementById(`hourly-${num}`);
  ele.querySelector('.hour').innerHTML = hour;
  ele.querySelector('.icon').src = weatherIconSrc;
  if (chanceRain === 0) {
    ele.querySelector('.chance-rain').innerHTML = '';
  } else {
    ele.querySelector('.chance-rain').innerHTML = `${chanceRain}%`;
  }
  ele.querySelector('.temp').innerHTML = `${temp}&deg;`;
}

function getCurrentHour() {
  const currentDate = new Date();
  return currentDate.getHours();
}

function addHoursToHours(hours, hoursToAdd) {
  const calcHour = (hours + hoursToAdd) % 12;
  if (calcHour === 0) {
    return 12;
  }
  return calcHour;
}

function calcAmPm(hour) {
  return hour >= 12 ? 'pm' : 'am';
}

function calcTimeHour(hour, hoursToAdd) {
  const timeHour = addHoursToHours(hour, hoursToAdd);
  const ampm = calcAmPm((hour + hoursToAdd) % 24);
  return `${timeHour}${ampm}`;
}

function addHoursToTime(time, hoursToAdd) {
  const timeArr = time.split(':');
  let hour = Number(timeArr[0]);
  const minute = timeArr[1];
  const second = timeArr[2];

  hour = (hour + hoursToAdd) % 24;
  let hourFormatted = hour;
  if (hour < 10) {
    hourFormatted = `0${hour}`;
  }

  return `${hourFormatted}:${minute}:${second}`;
}

function loadFirstHourlyElement(weatherData) {
  const hour0Data = weatherData.hourly[0];
  const { weather } = hour0Data;
  const { sunrise, sunset } = weatherData;

  loadHourlyElement(
    0,
    'Now',
    getIcon(weather, sunrise, sunset),
    hour0Data.chanceRain,
    hour0Data.temperature
  );
}

function loadRestHourlyElements(weatherData) {
  const hourlyData = weatherData.hourly;
  const currentTime = getTime();
  const currentHour = getCurrentHour();
  const { sunrise, sunset } = weatherData;

  for (let i = 1; i < 24; i += 1) {
    const timeHour = calcTimeHour(currentHour, i);
    const time = addHoursToTime(currentTime, i);
    const { weather, chanceRain, temperature } = hourlyData[i];
    const weatherIcon = getIcon(weather, sunrise, sunset, time);
    loadHourlyElement(i, timeHour, weatherIcon, chanceRain, temperature);
  }
}

export function updateHourlyTemperature(weatherData, unit) {
  const hourlyData = weatherData.hourly;

  let temp;
  for (let i = 0; i < 24; i += 1) {
    if (unit === 'F') {
      temp = hourlyData[i].temperature;
    } else {
      temp = hourlyData[i].temperatureC;
    }
    const ele = document.getElementById(`hourly-${i}`);
    ele.querySelector('.temp').innerHTML = `${temp}&deg;`;
  }
}

/**
 * This function updates the hourly weather with current weather properties.
 * Particularly, the innerHTML of elements:
 *   '.hour' to the next hour (hour-0 is current hour, hour-1 is next hour, ...)
 *   '.icon img' to a weather icon src
 *   '.chance-rain' to the precipitation probability
 *   '.tmep' to the temperature with unit
 * Information is retrieved from the properties of weatherData.
 *
 * @export
 * @param {object} weatherData
 */
export default function loadHourly(weatherData) {
  loadFirstHourlyElement(weatherData);
  loadRestHourlyElements(weatherData);
}
