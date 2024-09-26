function localStorageSupport() {
  return typeof localStorage !== 'undefined';
}

export function saveUserLocation(location) {
  if (!localStorageSupport()) {
    return;
  }

  localStorage.setItem('userLocation', JSON.stringify(location));
}

export function loadUserLocation() {
  if (!localStorageSupport()) {
    return '';
  }

  return JSON.parse(localStorage.getItem('userLocation'));
}
