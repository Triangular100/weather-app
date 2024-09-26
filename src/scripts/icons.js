import clearDay from '../img/clear-day.svg';
import clearNight from '../img/clear-night.svg';
import cloudyDay from '../img/clouds-day.svg';
import cloudyNight from '../img/clouds-night.svg';
import rainyDay from '../img/rain-day.svg';
import rainyNight from '../img/rain-night.svg';
import rainy from '../img/rain.svg';
import snowy from '../img/snow.svg';
import foggy from '../img/foggy.svg';
import windy from '../img/windy.svg';
import temperature from '../img/temperature.svg';

const icons = {
  clearDay,
  clearNight,
  cloudyDay,
  cloudyNight,
  rainyDay,
  rainyNight,
  rainy,
  snowy,
  foggy,
  windy,
  snowyDay: snowy,
  snowyNight: snowy,
  foggyDay: foggy,
  foggyNight: foggy,
  windyDay: windy,
  windyNight: windy,
  default: temperature,
};

/**
 * Returns the current time in 24h format hh:mm:ss
 *
 * @export
 * @return {string} The current time in 24 hr format hh:mm:ss
 *
 */
export function getTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });
}

export function isDay(sunrise, sunset, currentTime = '') {
  if (!currentTime) {
    // eslint-disable-next-line no-param-reassign
    currentTime = getTime();
  }

  // Before sunrise
  if (currentTime < sunrise) {
    return false;
  }

  // After sunset
  if (sunset < currentTime) {
    return false;
  }

  return true;
}

function getIconName(weather, sunrise, sunset, currentTime = '') {
  if (isDay(sunrise, sunset, currentTime)) {
    return `${weather.toLowerCase()}Day`;
  }

  return `${weather.toLowerCase()}Night`;
}

/**
 * This function retrieves an icon src relating to weather and time
 *
 * @export
 * @function getIcon
 * @param {string} weather related. Clear, cloudy, rainy, snowy, foggy, windy
 * @param {string} sunrise in 24h format hh:mm:ss
 * @param {string} sunset in 24h format hh:mm:ss
 * @param {string} [currentTime=''] defaults to current time. 24hr format hh:mm:ss
 * @return {*} image src corresponding to weather and time
 */
export default function getIcon(weather, sunrise, sunset, currentTime = '') {
  const iconName = getIconName(weather, sunrise, sunset, currentTime);

  let src = icons[iconName];

  if (!src) {
    src = icons.default;
  }

  return src;
}
