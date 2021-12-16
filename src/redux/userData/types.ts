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
import isoTimeToPhrase from "../../helpers/isoTimeToPhrase";

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
  return isoTimeToPhrase(lo);
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
