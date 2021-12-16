export interface Difference {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;
const _month = _day * 30;
const _year = _month * 12;

const removeDigitsAfterPoint = (n: number): number => {
  return n - (n % 1);
};

const differenceBetweenDates = (d1: Date, d2: Date): Difference => {
  d1 = new Date(Math.floor(d1.getTime() / 1000) * 1000);
  d2 = new Date(Math.floor(d2.getTime() / 1000) * 1000);

  return {
    years: d1.getUTCFullYear() - d2.getUTCFullYear(),
    months: removeDigitsAfterPoint(
      ((d1.getTime() - d2.getTime()) % _year) / _month
    ),
    days: removeDigitsAfterPoint(
      ((d1.getTime() - d2.getTime()) % _month) / _day
    ),
    hours: removeDigitsAfterPoint(
      ((d1.getTime() - d2.getTime()) % _day) / _hour
    ),
    minutes: removeDigitsAfterPoint(
      ((d1.getTime() - d2.getTime()) % _hour) / _minute
    ),
    seconds: removeDigitsAfterPoint(
      ((d1.getTime() - d2.getTime()) % _minute) / _second
    ),
  };
};

export default differenceBetweenDates;
