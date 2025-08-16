const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/**
 * Given a dictionary D where key is YYYY-MM-DD and value is integer,
 * returns a new dictionary with keys as weekdays and values as sum of values on that day.
 * If a weekday is missing, its value is the floor of the mean of the nearest previous and next available days.
 * @param {Object} D
 * @returns {Object}
 */
function solution(D) {
  // Step 1: Aggregate sums and mark which days are present
  const sums = Object.fromEntries(WEEKDAYS.map((day) => [day, 0]));
  const present = Object.fromEntries(WEEKDAYS.map((day) => [day, false]));

  // Helper: get weekday index (0=Mon, ..., 6=Sun)
  function getWeekdayIdx(dateStr) {
    const jsDay = new Date(dateStr).getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    return (jsDay + 6) % 7; // 0=Mon, ..., 6=Sun
  }

  for (const [dateStr, val] of Object.entries(D)) {
    const idx = getWeekdayIdx(dateStr);
    const day = WEEKDAYS[idx];
    sums[day] += val;
    present[day] = true;
  }

  // Step 2: For missing days, fill iteratively
  for (let i = 0; i < 7; i++) {
    const day = WEEKDAYS[i];
    if (!present[day]) {
      // Find previous available day
      let prev = i - 1;
      while (prev >= 0 && !present[WEEKDAYS[prev]]) prev--;
      // Find next available day
      let next = i + 1;
      while (next < 7 && !present[WEEKDAYS[next]]) next++;
      // If out of bounds, wrap around
      const prevVal = prev >= 0 ? sums[WEEKDAYS[prev]] : sums[WEEKDAYS[6]];
      const nextVal = next < 7 ? sums[WEEKDAYS[next]] : sums[WEEKDAYS[0]];
      sums[day] = Math.floor((prevVal + nextVal) / 2);
      present[day] = true; // Use newly filled value for further missing weekdays
    }
  }

  return sums;
}

module.exports = { solution };
