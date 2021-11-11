import { Permissions, Rating, Role, Sex } from "../../graphql/graphql";

export const checkPermissions = (
  allow: Permissions,
  userPermissions: Permissions[] | undefined
): boolean => {
  if (!userPermissions) return false;
  return (
    userPermissions.includes(allow) || userPermissions.includes(Permissions.All)
  );
};

export const getSex = (sex: Sex) => {
  switch (sex) {
    case "MALE":
      return "Мужчина";
    case "FEMALE":
      return "Женщина";
    default:
      return "Не указан";
  }
};

export const countRating = (ratings: Rating[]) => {
  const positiveRatings = ratings.filter((rating) => rating.positive).length;
  const negativeRatings = ratings.filter((rating) => !rating.positive).length;
  return positiveRatings - negativeRatings;
};

export const ageToStr = (age: number): string => {
  let txt;
  let count = age % 100;
  if (count >= 5 && count <= 20) {
    txt = "лет";
  } else {
    count = count % 10;
    if (count === 1) {
      txt = "год";
    } else if (count >= 2 && count <= 4) {
      txt = "года";
    } else {
      txt = "лет";
    }
  }
  return txt;
};

export const minuteToNum = (n: number): string => {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) {
    return "минут";
  }
  if (n1 > 1 && n1 < 5) {
    return "минуты";
  }
  if (n1 === 1) {
    return "минута";
  }
  return "минут";
};

export const getLastOnline = (lo: string): string => {
  const now = new Date();
  const lastOnline = new Date(lo);
  const differense = {
    inMinutes: Math.floor((now.getTime() - lastOnline.getTime()) / (60 * 1000)),
    inHours: Math.floor((now.getTime() - lastOnline.getTime()) / (3600 * 1000)),
    inDays: Math.floor(
      (now.getTime() - lastOnline.getTime()) / (24 * 3600 * 1000)
    ),
    inWeeks: Math.floor(
      (now.getTime() - lastOnline.getTime()) / (24 * 3600 * 1000) / 7
    ),
    inMonth: Math.floor(
      (now.getTime() - lastOnline.getTime()) / (24 * 3600 * 1000 * 30)
    ),
    inYears: Math.floor(
      (now.getTime() - lastOnline.getTime()) / (24 * 3600 * 1000 * 365)
    ),
  };
  if (differense.inYears > 0) {
    if (differense.inYears === 1) {
      return "год назад";
    } else {
      return differense.inYears + " " + ageToStr(differense.inYears) + " назад";
    }
  } else if (differense.inMonth > 0) {
    if (differense.inMonth === 1) {
      return "месяц назад";
    } else if (differense.inMonth < 5) {
      return differense.inMonth + " месяца назад";
    } else {
      return differense.inMonth + " месяцев назад";
    }
  } else if (differense.inWeeks > 0) {
    if (differense.inWeeks === 1) {
      return "неделю назад";
    } else if (differense.inWeeks > 1 && differense.inWeeks < 5) {
      return differense.inWeeks + " недели назад";
    } else {
      return differense.inWeeks + " недель назад";
    }
  } else if (differense.inDays > 0) {
    if (differense.inDays === 1) {
      return "вчера";
    } else if (differense.inDays > 1 && differense.inDays < 5) {
      return differense.inDays + " дня назад";
    } else {
      return differense.inDays + " дней назад";
    }
  } else if (differense.inHours > 0) {
    if (differense.inHours === 1) {
      return "час назад";
    }
    if (differense.inHours % 10 === 1) {
      return differense.inHours + " час назад";
    } else if (differense.inHours % 10 > 1 && differense.inHours % 10 < 5) {
      return differense.inHours + " часа назад";
    } else {
      return differense.inHours + " часов назад";
    }
  } else {
    if (differense.inMinutes < 5) {
      return "Онлайн";
    }
    return differense.inMinutes + " " + minuteToNum(differense.inMinutes);
  }
};

export interface UserDataState {
  isLoggedIn: boolean;
  isValidated: boolean;
  onServer: boolean;
  nickname: string;
  profileId: number;
  permissions: Permissions[];
  roles: Role[];
  serverId: number;
  userId: number;
  isLoading: boolean;
  blacklist: number[];
}
