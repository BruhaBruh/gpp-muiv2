const yearDeclination = (year: number): "лет" | "год" | "года" => {
  year = Math.abs(year);
  if (year >= 5 && year <= 20) return "лет";
  else if (year % 10 === 1) return "год";
  else if (year % 10 >= 2 && year % 10 <= 4) return "года";
  else return "лет";
};

export default yearDeclination;
