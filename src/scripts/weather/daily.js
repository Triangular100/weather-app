import getIcon from '../icons';

function loadDailyElement(
  num,
  day,
  chanceRain,
  weatherIconSrc,
  tempHi,
  tempLo
) {
  const ele = document.getElementById(`daily-${num}`);
  ele.querySelector('.day').innerHTML = day;
  if (chanceRain === 0) {
    ele.querySelector('.chance-rain').innerHTML = '';
  } else {
    ele.querySelector('.chance-rain').innerHTML = `${chanceRain}%`;
  }
  ele.querySelector('.icon').src = weatherIconSrc;
  ele.querySelector('.temp .high').innerHTML = `${tempHi}&deg;`;
  ele.querySelector('.temp .low').innerHTML = `${tempLo}&deg;`;
}

function loadFirstDailyElement(weatherData) {
  const daily0Data = weatherData.daily[0];
  const { weather, chanceRain, sunrise, sunset, tempHi, tempLow } = daily0Data;
  loadDailyElement(
    0,
    'Today',
    chanceRain,
    getIcon(weather, sunrise, sunset, '12:00:00'),
    tempHi,
    tempLow
  );
}

function loadRestDailyElements(weatherData) {
  const dailyData = weatherData.daily;
  for (let i = 1; i < 10; i += 1) {
    const { day, weather, chanceRain, sunrise, sunset, tempHi, tempLow } =
      dailyData[i];
    loadDailyElement(
      i,
      day,
      chanceRain,
      getIcon(weather, sunrise, sunset, '12:00:00'),
      tempHi,
      tempLow
    );
  }
}

export function updateDailyTemperature(weatherData, unit) {
  const dailyData = weatherData.daily;

  let tempHi;
  let tempLow;
  for (let i = 0; i < 10; i += 1) {
    if (unit === 'F') {
      tempHi = dailyData[i].tempHi;
      tempLow = dailyData[i].tempLow;
    } else {
      tempHi = dailyData[i].tempHiC;
      tempLow = dailyData[i].tempLowC;
    }

    const ele = document.getElementById(`daily-${i}`);
    ele.querySelector('.temp .high').innerHTML = `${tempHi}&deg;`;
    ele.querySelector('.temp .low').innerHTML = `${tempLow}&deg;`;
  }
}

/**
 * This function updates the daily weather with current weather properties.
 * Particularly, the innerHTML of elements:
 *   '.day' to the abbreviated day. (day-0 is today, day-1 is tomorrow, ...)
 *   '.chance-rain' to the precipitation probability
 *   '.icon' to a weather icon src
 *   '.temp .high' to the max temperature with no unit
 *   '.temp .low' to the min temperature with no unit
 * Information is retrieved from the properties of weatherData.
 *
 * @export
 * @param {object} weatherData
 */
export default function loadDaily(weatherData) {
  loadFirstDailyElement(weatherData);
  loadRestDailyElements(weatherData);
}
