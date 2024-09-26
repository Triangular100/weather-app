import { getCachedData, swapUnit } from './api';
import { updateHourlyTemperature } from './hourly';
import { updateDailyTemperature } from './daily';
// Cycle of depth 1 needed to retrieve cached data not available in summary
// eslint-disable-next-line import/no-cycle
import { updateSummaryTemperature, updateSummaryDescription } from './summary';

function changeSummaryUnit(weatherData) {
  if (weatherData.currentUnit === 'F') {
    updateSummaryTemperature(weatherData.temperature, 'f');
  } else {
    updateSummaryTemperature(weatherData.temperatureC, 'c');
  }
}

function changeDescriptionUnit(weatherData) {
  if (weatherData.currentUnit === 'F') {
    updateSummaryDescription(
      weatherData.description,
      weatherData.temperature,
      weatherData.feelsLike,
      'F'
    );
  } else {
    updateSummaryDescription(
      weatherData.description,
      weatherData.temperatureC,
      weatherData.feelsLikeC,
      'C'
    );
  }
}

function changeHourlyUnit(weatherData) {
  if (weatherData.currentUnit === 'F') {
    updateHourlyTemperature(weatherData, 'F');
  } else {
    updateHourlyTemperature(weatherData, 'C');
  }
}

function changeDailyUnit(weatherData) {
  if (weatherData.currentUnit === 'F') {
    updateDailyTemperature(weatherData, 'F');
  } else {
    updateDailyTemperature(weatherData, 'C');
  }
}

export default function changeUnit() {
  // Currently Fahrenheit then change to Celsius, if Celsius change to Fahrenheit
  swapUnit();
  const weatherData = getCachedData();

  changeSummaryUnit(weatherData);
  changeDescriptionUnit(weatherData);
  changeHourlyUnit(weatherData);
  changeDailyUnit(weatherData);
}
