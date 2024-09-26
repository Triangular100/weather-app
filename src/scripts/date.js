const cache = {
  currentDate: null,
  currentTime: null,
};

/**
 * This function retrieves and formats the current date in a user-friendly format.
 *
 * @returns {string} The current date in the format: 'weekday, month day'.
 *
 * @example
 * // Example usage:
 * const currentDate = getDate();
 * console.log(currentDate); // Outputs: 'Friday, Jan 1'
 */
function getDate() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return today.toLowerCase();
}

/**
 * This function retrieves the current time in a specific format.
 *
 * @function getTime
 * @returns {string} The current time in the format 'hh:mm' with lowercase AM/PM.
 *
 * @example
 * getTime(); // Returns '3:45am' or '11:30pm' depending on the current time.
 */
function getTime() {
  let time = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  // Remove space and lowercase AM/PM
  time = time.replace(/\s/g, '');
  time = time.toLowerCase();

  return time;
}

function updateDate() {
  const date = getDate();
  if (date === cache.currentDate) {
    return; // No need to update if the date hasn't changed.
  }

  const dateEle = document.getElementById('date');
  cache.currentDate = date;
  dateEle.innerHTML = date;
}

function updateTime() {
  const time = getTime();
  if (time === cache.currentTime) {
    return; // No need to update if the time hasn't changed.
  }

  const timeEle = document.getElementById('time');
  cache.currentTime = time;
  timeEle.innerHTML = time;
}

function updateDateAndTime() {
  updateDate();
  updateTime();
}

function setUpdateInterval() {
  setInterval(updateDateAndTime, 1000); // Update every second.
}

/**
 * This function updates the innerHTML of
 *   element with id 'date' to be the current date
 *   element with id 'time' to be the current time
 * An interval is started to maintain date and time updated
 *
 * @function loadDate
 * @returns {void}
 *
 * @example
 * loadDate();
 * // The current date will be displayed in the HTML element with id 'date'.
 * // The current time will be displayed in the HTML element with id 'time'.
 */
export default function loadDate() {
  updateDateAndTime();
  setUpdateInterval();
}
