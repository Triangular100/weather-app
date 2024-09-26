import fetchWeatherData from './api';
// eslint-disable-next-line import/no-cycle
import loadSummary, { bindSummaryEvents, shakeButtons } from './summary';
import loadHourly from './hourly';
import loadDaily from './daily';
import loadTheme from './theme';
import { loadUserLocation } from './save';

function bindEvents() {
  bindSummaryEvents();
}

export function loadWeatherData(weatherData) {
  loadSummary(weatherData);
  loadHourly(weatherData);
  loadDaily(weatherData);
  loadTheme(weatherData);
}

/**
 * This function updates the page with current weather properties.
 * This includes the summary, hourly, and daily page weather components.
 *
 * @export
 * @param {object} weatherData
 */
export default function loadWeather() {
  let location = loadUserLocation();
  if (!location) {
    location = 'madison';
  }

  fetchWeatherData(location)
    .then((weatherData) => {
      loadWeatherData(weatherData);
      bindEvents();
      shakeButtons();
    })
    // Log error for now
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));
}
