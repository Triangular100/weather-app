import loadDate from './date';
import loadWeather from './weather/weather';

export default function loadPage() {
  loadDate();
  loadWeather();
}
