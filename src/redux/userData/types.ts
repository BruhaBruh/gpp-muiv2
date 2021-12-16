import alchemist from "../../assets/images/roles/alchemist.png";
import blacksmith from "../../assets/images/roles/blacksmith.png";
import builder from "../../assets/images/roles/builder.png";
import crafter from "../../assets/images/roles/crafter.png";
import farmer from "../../assets/images/roles/farmer.png";
import fisherman from "../../assets/images/roles/fisherman.png";
import hunter from "../../assets/images/roles/hunter.png";
import lumberjack from "../../assets/images/roles/lumberjack.png";
import miner from "../../assets/images/roles/miner.png";
import { UserRoleEnum } from "../../graphql/types";

export interface UserDataState {
  updateUser: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  nickname: string;
  userRole: UserRoleEnum;
  settings: number;
  userId: number;
  permissions: number;
  avatar: string;
  banreportEndAt: string | null;
  subscriptionEndAt: string | null;
}

export const getUserRoleString = (userRole: UserRoleEnum): string => {
  switch (userRole) {
    case UserRoleEnum.None:
      return "Игрок";
    case UserRoleEnum.JrModerator:
      return "Мл. Модератор";
    case UserRoleEnum.Moderator:
      return "Модератор";
    case UserRoleEnum.Admin:
      return "Администратор";
    case UserRoleEnum.SiteDeveloper:
      return "Разработчик сайта";
    default:
      return "";
  }
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

export const getSex = (sex: number) => {
  switch (sex) {
    case 1:
      return "Мужчина";
    case 2:
      return "Женщина";
    default:
      return "Не указан";
  }
};

export const checkPermissions = (
  allow: number,
  userPermissions: number | undefined
): boolean => {
  if (!userPermissions) return false;
  return (userPermissions & (allow % 2 === 0 ? allow + 1 : allow)) !== 0;
};

export const checkPermissionsWA = (
  allow: number,
  userPermissions: number | undefined
): boolean => {
  if (!userPermissions) return false;
  return (userPermissions & allow) !== 0;
};

export const checkSettings = (
  allow: number,
  userSettings: number | undefined
): boolean => {
  if (!userSettings) return false;
  return (userSettings & allow) !== 0;
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

export const getImageByRole = (role: any) => {
  switch (role) {
    case "Ремесленник":
      return crafter;
    case "Шахтёр":
      return miner;
    case "Охотник":
      return hunter;
    case "Строитель":
      return builder;
    case "Кузнец":
      return blacksmith;
    case "Плотник":
      return lumberjack;
    case "Повар":
      return alchemist;
    case "Рыбак":
      return fisherman;
    case "Фермер":
      return farmer;
    default:
      return null;
  }
};

export enum Permissions {
  All = 1,
  GlobalChatRemove = 2,
  ModifyPermissions = 4,
  SetBan = 8,
  RemoveBan = 16,
  ShowReports = 32,
  ModifyRoles = 64,
  Lite = 128,
  Premium = 256,
  ModifyForum = 512,
  ModifyThread = 1024,
  ModifySocialPoints = 2048,
}

export enum Settings {
  ShowPhone = 1,
  NotifyOnReport = 2,
  NotifyOnReportMessage = 4,
  NotifyOnNewSubscriber = 8,
  NotifyOnNewFriend = 16,
}
