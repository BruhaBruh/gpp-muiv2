const monthDeclination = (month: number): "месяцев" | "месяц" | "месяца" => {
  month = Math.abs(month);
  if (month >= 5 && month <= 20) return "месяцев";
  else if (month % 10 === 1) return "месяц";
  else if (month % 10 >= 2 && month % 10 <= 4) return "месяца";
  else return "месяцев";
};

export default monthDeclination;
