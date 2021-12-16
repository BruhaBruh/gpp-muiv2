import dayDeclination from "./dayDeclination";
import differenceBetweenDates from "./differenceBetweenDates";
import hourDeclination from "./hourDeclination";
import minuteDeclination from "./minuteDeclination";
import monthDeclination from "./monthDeclination";
import yearDeclination from "./yearDeclination";

// month -
// days -
// minutes

const isoTimeToPhrase = (time: string): string => {
  const { years, months, hours, days, minutes, seconds } =
    differenceBetweenDates(new Date(time), new Date());

  if (years !== 0) {
    return `${
      years > 0
        ? yearDeclination(years) === "год"
          ? "остался "
          : "осталось "
        : ""
    }${Math.abs(years)} ${yearDeclination(years)}${years < 0 ? " назад" : ""}`;
  }

  if (months !== 0) {
    return `${
      months > 0
        ? monthDeclination(months) === "месяц"
          ? "остался "
          : "осталось "
        : ""
    }${Math.abs(months)} ${monthDeclination(months)}${
      months < 0 ? " назад" : ""
    }`;
  }

  if (days !== 0) {
    return `${
      days > 0
        ? dayDeclination(days) === "день"
          ? "остался "
          : "осталось "
        : ""
    }${Math.abs(days)} ${dayDeclination(days)}${days < 0 ? " назад" : ""}`;
  }

  if (hours !== 0) {
    return `${
      hours > 0
        ? hourDeclination(hours) === "час"
          ? "остался "
          : "осталось "
        : ""
    }${Math.abs(hours)} ${hourDeclination(hours)}${hours < 0 ? " назад" : ""}`;
  }

  if (minutes !== 0) {
    return `${
      minutes > 0
        ? minuteDeclination(minutes) === "минута"
          ? "остался "
          : "осталось "
        : ""
    }${Math.abs(minutes)} ${minuteDeclination(minutes)}${
      minutes < 0 ? " назад" : ""
    }`;
  }

  return `${years} ${months} ${days} ${minutes} ${seconds}`;
};

export default isoTimeToPhrase;
