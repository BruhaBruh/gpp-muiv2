const dayDeclination = (day: number): "день" | "дня" | "дней" => {
  day = Math.abs(day);
  if (day >= 5 && day <= 20) return "дней";
  else if (day % 10 === 1) return "день";
  else if (day % 10 >= 2 && day % 10 <= 4) return "дня";
  else return "дней";
};

export default dayDeclination;
