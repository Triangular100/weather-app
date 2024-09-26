import getIcon from '../icons';
// Cycle is required to retrieve weatherData from api.
// eslint-disable-next-line import/no-cycle
import changeUnit from './change-unit';
// eslint-disable-next-line import/no-cycle
import changeLocation from './change-location';

function updateLocation(city, state) {
  const loc = `${city}, ${state}`.toLowerCase();
  document.getElementById('city').innerHTML = loc;
}

function updateIcon(weather, sunrise, sunset) {
  const src = getIcon(weather, sunrise, sunset);
  document.querySelector('#weather-icon img').src = src;
}

export function updateSummaryTemperature(temp, unit = 'f') {
  document.getElementById('temperature').innerHTML = temp;
  document.getElementById('temperature-unit').innerHTML = `&deg;${unit}`;
}

export function updateSummaryDescription(desc, temp, feelsLike, unit = 'F') {
  const description = `${desc} The temperature is ${temp}&deg;${unit} and feels like ${feelsLike}&deg;${unit}.`;
  document.getElementById('weather-description').innerHTML = description;
}

function bindLocationEvents() {
  const locationButton = document.getElementById('location');
  const locationFormContainer = document.getElementById(
    'location-form-container'
  );
  const locationFormClose = document.getElementById('location-form-close');
  const locationForm = document.getElementById('location-form');

  // Show location form when clicking on location button
  locationButton.addEventListener('click', () => {
    locationFormContainer.classList.add('active');
  });

  // Close location form when clicking outside container
  locationFormContainer.addEventListener('click', (ev) => {
    if (ev.target === locationFormContainer) {
      locationFormContainer.classList.remove('active');
    }
  });

  // Close location form when clicking on close button
  locationFormClose.addEventListener('click', () => {
    locationFormContainer.classList.remove('active');
  });

  // Update location on user submission
  locationForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const city = locationForm.elements['change-city'].value;
    changeLocation(city);
  });
}

function bindTemperatureEvents() {
  document
    .getElementById('temperature-container')
    .addEventListener('click', () => {
      changeUnit();
    });
}

export function bindSummaryEvents() {
  bindLocationEvents();
  bindTemperatureEvents();
}

export function shakeButtons() {
  const locationButton = document.getElementById('location');
  const tempButton = document.getElementById('temperature-container');

  locationButton.classList.add('hover');
  locationButton.classList.add('shake');
  tempButton.classList.add('hover');
  tempButton.classList.add('shake');

  setTimeout(() => {
    // Stay hovered 1s after animation (shake finishes in 3s)
    locationButton.classList.remove('hover');
    locationButton.classList.remove('shake');
    tempButton.classList.remove('hover');
    tempButton.classList.remove('shake');
  }, 4000);
}

/**
 * This function updates the summary with current weather properties.
 * Particularly, the innerHTML of elements:
 *   '#city' to the 'city, state'
 *   '#weather-icon img' to a weather icon src
 *   '#temperature' to the temperature
 *   '#temperature-unit' to the temperature unit
 *   '#weather-description' to the weather description
 * Information is retrieved from the properties of weatherData.
 *
 * @export
 * @param {object} weatherData
 */
export default function loadSummary(weatherData) {
  updateLocation(weatherData.city, weatherData.state);
  updateIcon(weatherData.weather, weatherData.sunrise, weatherData.sunset);
  updateSummaryTemperature(weatherData.temperature);
  updateSummaryDescription(
    weatherData.description,
    weatherData.temperature,
    weatherData.feelsLike
  );
}
