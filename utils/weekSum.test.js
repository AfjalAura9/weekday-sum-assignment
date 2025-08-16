const { solution } = require("./weekSum");

test("Basic sum by weekday", () => {
  const input = {
    '2020-01-01': 4, '2020-01-02': 4, '2020-01-03': 6,
    '2020-01-04': 8, '2020-01-05': 2, '2020-01-06': -6,
    '2020-01-07': 2, '2020-01-08': -2,
  };
  const expected = {
    Mon: -6, Tue: 2, Wed: 2, Thu: 4, Fri: 6, Sat: 8, Sun: 2
  };
  expect(solution(input)).toEqual(expected);
});

test("Fill missing days by averaging neighbors", () => {
  const input = {
    '2020-01-01': 6, // Wed
    '2020-01-04': 12, // Sat
    '2020-01-05': 14, // Sun
    '2020-01-06': 2, // Mon
    '2020-01-07': 4, // Tue
  };
  // Mon(2), Tue(4), Wed(6), Thu=(6+12)/2=9, Fri=(9+12)/2=10, Sat=12, Sun=14
  const expected = {
    Mon: 2, Tue: 4, Wed: 6, Thu: 9, Fri: 10, Sat: 12, Sun: 14
  };
  expect(solution(input)).toEqual(expected);
});
