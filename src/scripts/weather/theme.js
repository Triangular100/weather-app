import { isDay } from '../icons';

function getThemeFromIconSuggestion(suggestion, sunrise, sunset) {
  const isDayTime = isDay(sunrise, sunset);

  // Icon suggestion is based on hour.
  // Translate orange theme based on time as well
  // Ex: It's 7:45pm, sunset is at 7:30, and it's a clear day.
  //     Suggestion will be clear-day because it's based on time 7:00
  //     If it's currently 7:45 though, set blue theme (not orange theme as suggestion says).

  if (suggestion === 'clear-day' && isDayTime) {
    return 'theme-orange';
  }
  if (suggestion === 'clear-day' && !isDayTime) {
    return 'theme-blue';
  }
  if (
    suggestion === 'clear-night' ||
    suggestion === 'partly-cloudy-day' ||
    suggestion === 'cloudy'
  ) {
    return 'theme-blue';
  }
  if (
    suggestion === 'partly-cloudy-night' ||
    suggestion === 'showers-day' ||
    suggestion === 'rain'
  ) {
    return 'theme-dark-blue';
  }
  if (
    suggestion === 'showers-night' ||
    suggestion === 'thunder-rain' ||
    suggestion === 'thunder-showers-day' ||
    suggestion === 'thunder-showers-night'
  ) {
    return 'theme-dark-blue-gray';
  }
  if (
    suggestion === 'snow' ||
    suggestion === 'snow-showers-day' ||
    suggestion === 'snow-showers-night' ||
    suggestion === 'fog' ||
    suggestion === 'wind'
  ) {
    return 'theme-gray';
  }

  // Default if none found
  return 'theme-orange';
}

function loadPageWithTheme(theme) {
  document.getElementById('page').className = theme;
}

export default function loadTheme(weatherData) {
  const theme = getThemeFromIconSuggestion(
    weatherData.iconSuggestion,
    weatherData.sunrise,
    weatherData.sunset
  );
  loadPageWithTheme(theme);
}
