const minuteDeclination = (minute: number): "минута" | "минуты" | "минут" => {
  minute = Math.abs(minute);
  if (minute >= 5 && minute <= 20) return "минут";
  else if (minute % 10 === 1) return "минута";
  else if (minute % 10 >= 2 && minute % 10 <= 4) return "минуты";
  else return "минут";
};

export default minuteDeclination;
