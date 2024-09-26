import fetchWeatherData from './api';
// Cycle of depth 2 needed to fetch weather data not available in summary
// eslint-disable-next-line import/no-cycle
import { loadWeatherData } from './weather';
import { saveUserLocation } from './save';

function changeLocationSuccess(weatherData, location) {
  saveUserLocation(location);
  document.getElementById('change-city-error').innerHTML = '';
  document.getElementById('location-form-container').classList.remove('active');
  loadWeatherData(weatherData);
}

function changeLocationError(err) {
  document.getElementById('change-city-error').innerHTML = err.message;
}

export default function changeLocation(location) {
  fetchWeatherData(location)
    .then((weatherData) => changeLocationSuccess(weatherData, location))
    .catch((err) => changeLocationError(err));
}
