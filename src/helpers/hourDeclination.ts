const hourDeclination = (hour: number): "час" | "часа" | "часов" => {
  hour = Math.abs(hour);
  if (hour >= 5 && hour <= 20) return "часов";
  else if (hour % 10 === 1) return "час";
  else if (hour % 10 >= 2 && hour % 10 <= 4) return "часа";
  else return "часов";
};

export default hourDeclination;
